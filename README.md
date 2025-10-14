# Study-Sync-AI

A modern, AI-powered study planning and assessment platform built with React and Node.js.

## 🚀 Features

- User Authentication with Supabase
- Personalized Study Plans
- Assessment Management
- Performance Tracking
- Interactive Schedule
- Real-time Progress Updates

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Supabase Client
- ESLint
- PostCSS

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL (via Supabase)
- Zod (Validation)
- CORS

## 📦 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AllPlans.jsx
│   │   │   ├── Assessment.jsx
│   │   │   ├── CreatePlan.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Performance.jsx
│   │   │   ├── PlanDetails.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Schedule.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...config files
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── server.js
│   └── ...config files
```

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm or yarn
- PostgreSQL database (Supabase)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Nithinbharathi93/Study-Sync-AI.git
cd Study-Sync-AI
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd backend
npm install
```

4. Set up Environment Variables
   - Create `.env` files in both frontend and backend directories
   - Add necessary environment variables (see .env.example)

5. Run Database Migrations
```bash
cd backend
npx prisma migrate dev
```

6. Start the Development Servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## 📝 API Endpoints

### Authentication
- POST `/register` - Register a new user
- POST `/login` - Login user
- GET `/profile/:id` - Get user profile

## 🔐 Environment Variables

### Backend (.env)
```
DATABASE_URL="your_postgresql_url"
SUPABASE_URL="your_supabase_url"
SUPABASE_ANON_KEY="your_supabase_anon_key"
```

### Frontend (.env)
```
VITE_SUPABASE_URL="your_supabase_url"
VITE_SUPABASE_ANON_KEY="your_supabase_anon_key"
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details