# DEAR Platform - Digital Empowerment and Recovery

A comprehensive health and wellness transformation platform powered by AI.

## Features

- 🤖 AI-powered visual transformation analysis
- 🧠 Mental health support and therapy chatbot
- 💪 Personalized fitness and nutrition planning
- 🏥 Healthcare provider marketplace
- 👥 Community support and challenges
- 📱 Mobile-responsive design
- 💳 Subscription management with Stripe
- 🔒 Secure authentication and data protection

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Neon PostgreSQL
- **AI**: OpenAI GPT-4, Claude 3.5 Sonnet
- **Payments**: Stripe
- **Authentication**: JWT with secure cookies
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- Stripe account
- OpenAI API key
- Anthropic API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/dear-platform.git
cd dear-platform
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in your environment variables in `.env.local`.

4. Run database migrations:
\`\`\`bash
npm run db:migrate
\`\`\`

5. Seed the database:
\`\`\`bash
npm run db:seed
\`\`\`

6. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker

1. Build the Docker image:
\`\`\`bash
docker build -t dear-platform .
\`\`\`

2. Run with Docker Compose:
\`\`\`bash
docker-compose up -d
\`\`\`

## Environment Variables

See `.env.example` for all required environment variables.

## Database Schema

The platform uses PostgreSQL with the following main tables:
- `users` - User accounts and profiles
- `user_profiles` - Detailed user health and preference data
- `transformation_photos` - AI-analyzed progress photos
- `health_metrics` - Health tracking data
- `mood_entries` - Mental health and mood tracking
- `therapy_sessions` - AI therapy chat sessions
- `meals` - Nutrition tracking
- `workouts` - Fitness tracking
- `providers` - Healthcare provider directory
- `subscriptions` - Stripe subscription management

## API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Health Tracking
- `GET/POST /api/health-metrics` - Health metrics CRUD
- `GET/POST /api/transformation-photos` - Photo analysis
- `GET/POST /api/mood` - Mood tracking
- `GET/POST /api/meals` - Nutrition tracking
- `GET/POST /api/workouts` - Fitness tracking

### AI Services
- `POST /api/ai/therapy-chat` - AI therapy conversations
- `POST /api/ai/visual-analysis` - Photo analysis
- `GET /api/ai/health-insights` - Personalized insights
- `GET /api/ai/daily-plan` - AI-generated daily plans

### Payments
- `POST /api/payments/create-subscription` - Create subscription
- `GET /api/payments/subscription-status` - Get subscription info
- `POST /api/payments/customer-portal` - Stripe customer portal

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary and confidential.

## Support

For support, email support@dearplatform.com or join our community forums.
