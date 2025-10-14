// backend/index.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from './generated/prisma/index.js';
import { z } from 'zod';
import { GoogleGenerativeAI } from "@google/generative-ai"; // --- NEW ---

const app = express();
const PORT = 3001;

const prisma = new PrismaClient();

// --- NEW: Initialize Gemini AI Client ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Initialize Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(cors());
app.use(express.json());

// --- Zod Schemas for Validation ---
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password cannot be empty"),
});

// --- API ROUTES ---

// 1. Register a new user
app.post('/register', async (req, res) => {
  try {
    const { email, password, username } = registerSchema.parse(req.body);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(409).json({ error: authError.message });
    }
    if (!authData.user) {
      throw new Error('Registration failed, no user returned from Supabase.');
    }

    const profile = await prisma.profile.create({
      data: {
        id: authData.user.id,
        email,
        username,
      },
    });

    res.status(201).json({ 
      message: 'User registered successfully. Please check your email to confirm.', 
      user: authData.user, 
      profile 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Registration Error:', error.message);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A user with this email or username already exists.' });
    }
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

// 2. Login a user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    res.status(200).json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Login Error:', error.message);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

// 3. Get a user's profile
app.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await prisma.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found.' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Get Profile Error:', error.message);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

// --- NEW: Gemini AI and Study Plan Routes ---

// 4. Create a new study plan
app.post('/create-plan', async (req, res) => {
  const { topics, duration, userId } = req.body;

  if (!topics || !duration || !userId) {
    return res.status(400).json({ error: "Topics, duration, and userId are required." });
  }

  const prompt = `
    You are an expert study planner. Create a detailed study plan for a student who wants to learn the following topics: ${topics.join(", ")}.
    The student has ${duration} to study.
    Generate a structured study plan in a valid JSON format. Do not include any text or markdown formatting before or after the JSON object.
    The JSON object must have a "title" and a "weekly_plan".
    Each week in the "weekly_plan" array must contain a "week" number and a "daily_schedule".
    Each "daily_schedule" array must contain objects with a "day", a "topic", and an array of "tasks".

    --- NEW INSTRUCTION ---
    For each task, also include a "resources" array containing one or two relevant, high-quality URLs (like documentation, tutorials, or videos) that would help a student complete that task. Each resource object in the array should have a "title" and a "url".

    Example Task Structure:
    "tasks": [
      {
        "description": "Read Chapter 1 on useState",
        "resources": [
          {
            "title": "Official React Docs: useState",
            "url": "https://react.dev/reference/react/useState"
          }
        ]
      }
    ]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const jsonText = response.text();
    
    // Clean the response in case Gemini adds markdown backticks
    const cleanedJsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
    const planContent = JSON.parse(cleanedJsonText);

    const savedPlan = await prisma.studyPlan.create({
      data: {
        title: planContent.title,
        topics: topics,
        content: planContent,
        profileId: userId,
      },
    });

    res.status(201).json(savedPlan);

  } catch (error) {
    console.error("Error generating or saving study plan:", error);
    res.status(500).json({ error: "Failed to create study plan. The AI model may be temporarily unavailable." });
  }
});

// 5. Get all study plans for a user
app.get('/study-plans/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const plans = await prisma.studyPlan.findMany({
            where: { profileId: userId },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(plans);
    } catch (error) {
        console.error("Error fetching study plans:", error);
        res.status(500).json({ error: "Failed to fetch study plans." });
    }
});

// Add this to your backend/index.js file with the other routes

// 6. Get a single study plan by its ID
app.get('/study-plan/:planId', async (req, res) => {
    const { planId } = req.params;
    try {
        const plan = await prisma.studyPlan.findUnique({
            where: { id: planId },
        });

        if (!plan) {
            return res.status(404).json({ error: 'Study plan not found.' });
        }

        res.status(200).json(plan);
    } catch (error) {
        console.error("Error fetching single study plan:", error);
        res.status(500).json({ error: "Failed to fetch study plan." });
    }
});

// Add these new routes to your backend/index.js file

// 7. Generate an assessment for a study plan
app.post('/generate-assessment', async (req, res) => {
    const { planId } = req.body;
    if (!planId) return res.status(400).json({ error: 'planId is required.' });

    try {
        const plan = await prisma.studyPlan.findUnique({ where: { id: planId } });
        if (!plan) return res.status(404).json({ error: 'Study plan not found.' });

        const prompt = `
            You are an expert quiz creator. Based on the topics "${plan.topics.join(", ")}", generate a 10-question multiple-choice quiz.
            Return a valid JSON object only. Do not include any text or markdown formatting before or after the JSON.
            The JSON object must have a "title" and a "questions" array.
            Each object in the "questions" array must have a "question" (string), an "options" (array of 4 strings), and a "correctAnswerIndex" (number 0-3).
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const jsonText = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        const quizContent = JSON.parse(jsonText);
        
        res.status(200).json(quizContent);

    } catch (error) {
        console.error("Error generating assessment:", error);
        res.status(500).json({ error: "Failed to generate assessment." });
    }
});

// 8. Submit an assessment and save the score
app.post('/submit-assessment', async (req, res) => {
    const { score, userId, planId } = req.body;

    if (score === undefined || !userId || !planId) {
        return res.status(400).json({ error: 'score, userId, and planId are required.' });
    }

    try {
        const savedAssessment = await prisma.assessment.create({
            data: {
                score: score,
                profileId: userId,
                studyPlanId: planId,
            }
        });
        res.status(201).json(savedAssessment);
    } catch (error) {
        console.error("Error saving assessment:", error);
        res.status(500).json({ error: "Failed to save assessment." });
    }
});

// Add these new routes to your backend/index.js file

// --- NEW: Schedule & Task Management Routes ---

// 9. Get or create a schedule for a specific date
app.post('/schedule', async (req, res) => {
    const { userId, date } = req.body; // date should be in ISO format like "2025-10-15T00:00:00.000Z"
    
    try {
        let schedule = await prisma.schedule.findFirst({
            where: { profileId: userId, date: new Date(date) },
            include: { tasks: { orderBy: { createdAt: 'asc' } } }
        });

        if (!schedule) {
            schedule = await prisma.schedule.create({
                data: {
                    profileId: userId,
                    date: new Date(date)
                },
                include: { tasks: true }
            });
        }
        res.status(200).json(schedule);
    } catch (error) {
        console.error("Error fetching/creating schedule:", error);
        res.status(500).json({ error: "Failed to handle schedule." });
    }
});

// 10. Add a new task to a schedule
app.post('/tasks', async (req, res) => {
    const { scheduleId, title } = req.body;
    try {
        const task = await prisma.task.create({
            data: { scheduleId, title }
        });
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Failed to create task." });
    }
});

// 11. Update a task (e.g., mark as complete)
app.patch('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const { isCompleted } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { isCompleted }
        });
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Failed to update task." });
    }
});

// 12. Delete a task
app.delete('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    try {
        await prisma.task.delete({
            where: { id: taskId }
        });
        res.status(204).send(); // No content
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Failed to delete task." });
    }
});

// Add this new route to your backend/index.js file

// --- NEW: Performance Data Route ---

// 13. Get all performance data for a user
app.get('/performance/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Fetch profile, plans, and assessments in parallel for efficiency
        const [profile, plans, assessments] = await Promise.all([
            prisma.profile.findUnique({ where: { id: userId } }),
            prisma.studyPlan.findMany({ where: { profileId: userId } }),
            prisma.assessment.findMany({
                where: { profileId: userId },
                orderBy: { createdAt: 'asc' }, // Order by date for charting
                include: { studyPlan: { select: { title: true } } } // Include plan title
            }),
        ]);

        if (!profile) {
            return res.status(404).json({ error: 'User profile not found.' });
        }

        res.status(200).json({ profile, plans, assessments });
    } catch (error) {
        console.error("Error fetching performance data:", error);
        res.status(500).json({ error: "Failed to fetch performance data." });
    }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});