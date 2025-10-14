# Study Sync AI 🧠✨

A modern, AI-powered study planning and assessment platform built with React, Node.js, and Gemini AI. This application allows users to generate personalized study schedules, take AI-generated tests, and track their performance over time.

## 🚀 Features

  - **User Authentication**: Secure sign-up and login with Supabase.
  - **AI-Powered Study Plans**: Generate personalized, detailed study plans on any topic using Google's Gemini AI.
  - **AI-Generated Assessments**: Create multiple-choice quizzes based on study plans to test knowledge.
  - **Performance Tracking**: A visual dashboard to track average scores, plans created, and assessment history.
  - **Interactive Daily Scheduler**: Users can create, manage, and complete their own daily tasks.
  - **Full CRUD Functionality**: Users can create, view, and delete their study plans and tasks.

## 🛠️ Tech Stack

### Frontend

  - React (Vite)
  - Tailwind CSS
  - Recharts (for charts)
  - Axios
  - Supabase Client

### Backend

  - Node.js & Express
  - Prisma ORM
  - PostgreSQL (via Supabase)
  - **Google Gemini AI** (for generative features)
  - Zod (for validation)

## 📦 Project Structure

```
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── AllPlans.jsx
│ │ │ ├── Assessment.jsx
│ │ │ ├── CreatePlan.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Performance.jsx
│ │ │ ├── PlanDetails.jsx
│ │ │ ├── Register.jsx
│ │ │ └── Schedule.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── ...config files
├── backend/
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── migrations/
│ ├── index.js
│ └── ...config files
```

## 🚀 Getting Started

### Prerequisites

  - Node.js v18+
  - npm or yarn
  - A Supabase account for the database and authentication.
  - A Google AI Studio API key for Gemini.

### Installation & Setup

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/Study-Sync-AI.git
    cd Study-Sync-AI
    ```

2.  **Install Backend Dependencies**

    ```bash
    cd backend
    npm install
    ```

3.  **Set Up Backend Environment (`backend/.env`)**
    Create a `.env` file in the `backend` directory and add the following variables:

    ```ini
    DATABASE_URL="YOUR_SUPABASE_POSTGRESQL_CONNECTION_STRING"
    SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

4.  **Run Database Migrations**
    From the `backend` directory, run:

    ```bash
    npx prisma migrate dev
    ```

5.  **Install Frontend Dependencies**

    ```bash
    cd ../frontend
    npm install
    ```

6.  **Set Up Frontend Environment (`frontend/.env.local`)**
    Create a `.env.local` file in the `frontend` directory and add:

    ```ini
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

### Running the Application

You'll need two separate terminals to run both the backend and frontend servers.

  - **Start the Backend Server** (from the `/backend` directory):
    ```bash
    npm run dev
    # Server will be running on http://localhost:3001
    ```
  - **Start the Frontend Server** (from the `/frontend` directory):
    ```bash
    npm run dev
    # Application will be accessible at http://localhost:5173
    ```

-----

## 📝 API Endpoints

All requests are made to `http://localhost:3001`.

### Authentication

  - **POST `/register`**: Register a new user.
    ```json
    {
        "email": "test@example.com",
        "password": "password123",
        "username": "testuser"
    }
    ```
  - **POST `/login`**: Authenticate a user and get a session.
    ```json
    {
        "email": "test@example.com",
        "password": "password123"
    }
    ```
  - **GET `/profile/:id`**: Get a user's public profile.

### Study Plans

  - **POST `/create-plan`**: Generate and save a new AI study plan.
    ```json
    {
        "topics": ["React Hooks", "State Management"],
        "duration": "2 weeks",
        "userId": "d2a5f1e9-4b7c-4a1e-8f2a-1b9c8d7e6f5a"
    }
    ```
  - **GET `/study-plans/:userId`**: Get all study plans for a specific user.
  - **GET `/study-plan/:planId`**: Get a single study plan by its ID.
  - **DELETE `/study-plan/:planId`**: Delete a study plan and its related assessments.

### Assessments

  - **POST `/generate-assessment`**: Generate a new AI quiz for a study plan.
    ```json
    {
        "planId": "c1b2a3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6"
    }
    ```
  - **POST `/submit-assessment`**: Save a user's test score.
    ```json
    {
        "score": 80,
        "userId": "d2a5f1e9-4b7c-4a1e-8f2a-1b9c8d7e6f5a",
        "planId": "c1b2a3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6"
    }
    ```

### Schedule & Tasks

  - **POST `/schedule`**: Get or create the schedule for a specific date.
    ```json
    {
        "userId": "d2a5f1e9-4b7c-4a1e-8f2a-1b9c8d7e6f5a",
        "date": "2025-10-15T00:00:00.000Z"
    }
    ```
  - **POST `/tasks`**: Add a new task to a schedule.
    ```json
    {
        "scheduleId": "b9e8f7a6-d5c4-b3a2-19e8-f7a6d5c4b3a2",
        "title": "Review Chapter 3"
    }
    ```
  - **PATCH `/tasks/:taskId`**: Update a task (e.g., mark as complete).
    ```json
    {
        "isCompleted": true
    }
    ```
  - **DELETE `/tasks/:taskId`**: Delete a task.

### Performance

  - **GET `/performance/:userId`**: Get a consolidated report of a user's profile, plans, and assessments.

-----

## 🤝 Contributing

Contributions are welcome\! Please follow these steps:

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
