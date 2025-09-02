#!/bin/bash

# DEAR Platform Production Deployment Script

set -e

echo "🚀 Starting DEAR Platform Production Deployment"

# Pre-deployment checks
echo "📋 Running pre-deployment checks..."

# Check if all required environment variables are set
required_vars=(
  "DATABASE_URL"
  "JWT_SECRET"
  "OPENAI_API_KEY"
  "STRIPE_SECRET_KEY"
  "EMAIL_API_KEY"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Error: $var is not set"
    exit 1
  fi
done

echo "✅ Environment variables verified"

# Run tests
echo "🧪 Running test suite..."
npm run test:all

if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Deployment aborted."
  exit 1
fi

echo "✅ All tests passed"

# Build application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Deployment aborted."
  exit 1
fi

echo "✅ Build successful"

# Database migration
echo "🗄️ Running database migrations..."
npm run db:migrate

if [ $? -ne 0 ]; then
  echo "❌ Database migration failed. Deployment aborted."
  exit 1
fi

echo "✅ Database migrations completed"

# Deploy to Vercel
echo "🌐 Deploying to production..."
vercel --prod --yes

if [ $? -ne 0 ]; then
  echo "❌ Deployment failed."
  exit 1
fi

echo "✅ Deployment successful"

# Post-deployment verification
echo "🔍 Running post-deployment verification..."

# Wait for deployment to be ready
sleep 30

# Health check
health_response=$(curl -s -o /dev/null -w "%{http_code}" https://dear-platform.com/api/health)

if [ "$health_response" != "200" ]; then
  echo "❌ Health check failed. Response code: $health_response"
  exit 1
fi

echo "✅ Health check passed"

# Test critical endpoints
echo "🧪 Testing critical endpoints..."

# Test authentication
auth_response=$(curl -s -o /dev/null -w "%{http_code}" https://dear-platform.com/api/auth/me)
if [ "$auth_response" != "401" ]; then
  echo "❌ Auth endpoint test failed. Expected 401, got: $auth_response"
  exit 1
fi

echo "✅ Critical endpoints verified"

echo "🎉 DEAR Platform successfully deployed to production!"
echo "🌐 URL: https://dear-platform.com"
echo "📊 Monitor: https://dear-platform.com/api/health"

# Send deployment notification (optional)
# curl -X POST "https://hooks.slack.com/..." -d '{"text":"DEAR Platform deployed successfully!"}'

echo "📝 Don't forget to:"
echo "  - Monitor error rates and performance"
echo "  - Check user registration flow"
echo "  - Verify payment processing"
echo "  - Monitor AI service usage"
