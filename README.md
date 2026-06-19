# AI-Powered Code Review Assistant

AI-Powered Code Review Assistant is a full-stack web application that lets authenticated users create projects, upload ZIP archives of source code, browse extracted files, run AI-powered reviews, manage their own AI provider configurations, and chat with the uploaded codebase.

## Project Overview

This application is built for code analysis workflows. A user signs up, logs in, creates a project, uploads a ZIP file, and the backend extracts the archive into individual files stored in PostgreSQL through Prisma.

After code is uploaded, the user can:
- Browse the extracted file tree.
- Preview file contents.
- Run AI reviews on the uploaded code.
- View review history and review details.
- Create chat sessions and ask questions about the codebase.

The application is provider-agnostic. Each authenticated user manages their own AI provider configurations, and the backend uses the selected provider and model when generating reviews or chat responses.

## Features

### Implemented features
- User registration and login with JWT authentication.
- Protected backend routes for authenticated users.
- Project creation, listing, viewing, and deletion.
- ZIP file upload for project codebases.
- ZIP extraction and file storage in the database.
- File tree browsing for uploaded project files.
- File content preview.
- AI provider management per user.
- Marking a provider as active.
- Listing the active AI provider.
- AI-powered review generation.
- Review history per project.
- Review details retrieval.
- Chat sessions per project.
- Chat message history retrieval.
- Code-aware chat responses using uploaded files as context.

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Lucide React
- TanStack React Query
- shadcn-style UI setup

### Backend
- NestJS 11
- TypeScript
- Prisma
- JWT authentication
- Passport JWT
- Multer for file upload
- AdmZip for ZIP extraction
- Axios for AI provider requests
- Bcrypt for password hashing

### Database
- PostgreSQL

### Authentication
- JWT access token authentication

### AI Integration
- OpenAI-compatible provider abstraction
- User-owned provider configurations
- Provider-specific model selection

### Libraries
- `@prisma/client`
- `prisma`
- `@nestjs/jwt`
- `@nestjs/passport`
- `passport`
- `passport-jwt`
- `bcrypt`
- `class-validator`
- `class-transformer`
- `multer`
- `adm-zip`
- `axios`
- `@tanstack/react-query`
- `lucide-react`

## Folder Structure

### Frontend
```text
frontend/
├── app/
│   ├── auth/
│   ├── projects/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ai-providers/
│   ├── auth/
│   ├── chat/
│   ├── files/
│   ├── landing/
│   ├── projects/
│   └── reviews/
├── hooks/
├── lib/
├── public/
├── .env
└── .gitignore
```

### Backend
```text
backend/
├── prisma/
├── src/
│   ├── ai-providers/
│   ├── auth/
│   ├── chat/
│   ├── common/
│   ├── database/
│   ├── files/
│   ├── projects/
│   ├── reviews/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── uploads/
├── .env
└── package.json
```

## Installation

### Prerequisites
- Node.js
- PostgreSQL
- npm

### Backend setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### Frontend setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend environment variables
The backend reads configuration from `.env`.

#### Database
```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```
Used by Prisma to connect to PostgreSQL.

#### JWT authentication
```env
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h
```
Used to sign and validate JWT tokens.

#### Server
```env
BACKEND_PORT=5000
CLIENT_URL=http://localhost:3000
```
Used for backend startup and client origin configuration.

#### File upload
```env
MAX_FILE_SIZE=52428800
MAX_ZIP_SIZE=104857600
UPLOAD_DIR=./uploads
```
Used to control upload limits and local file storage.

#### AI provider defaults
```env
AI_PROVIDER_BASE_URL=...
AI_PROVIDER_API_KEY=...
AI_PROVIDER_MODEL_NAME=...
```
Used as default provider configuration when applicable in the backend environment.

### Frontend environment variables
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```
Used by the frontend to call the backend API.

## Database Setup

### Migration
Run Prisma migrations after setting `DATABASE_URL`:
```bash
cd backend
npx prisma migrate dev
```

### Prisma
Generate Prisma Client when schema changes:
```bash
npx prisma generate
```

### Seed
No seed script is visible in the provided implementation.

## Running the Application

### Backend
```bash
cd backend
npm run start:dev
```

### Frontend
```bash
cd frontend
npm run dev
```

### Database
Start PostgreSQL before starting the backend. The application expects the database to be reachable through `DATABASE_URL`.

## AI Provider Configuration

Each authenticated user can manage their own AI provider records through the `ai-providers` module.

Each provider stores:
- Provider Name
- Base URL
- API Key
- Model Name
- Active Status

### Base URL
The backend uses the provider’s base URL to send OpenAI-compatible requests.

### API Key
The API key is stored per user and per provider in the database.

### Model
The model name is stored with the provider configuration and is used when sending AI requests.

### Provider Selection
The application exposes provider APIs so a user can:
- create a provider,
- list all their providers,
- fetch the active provider,
- update a provider,
- delete a provider.

### Review Provider Selection
The review flow accepts the selected provider and model from the user’s configured provider records.

### Chat Provider Selection
Chat sessions can carry a `providerId`, and chat requests may use that provider configuration when sending messages.

## Usage Guide

### Register
Create a new account through the authentication flow.

### Login
Log in with the registered email and password to receive a JWT session.

### Create Project
After login, create a project from the dashboard.

### Upload ZIP
Upload a ZIP archive into the selected project.

### Browse Files
Open the file tree and preview extracted file contents.

### Run Review
Trigger an AI review for the selected project and review type.

### View History
Open the review history list and inspect stored review details.

### Chat with Code
Create a chat session and ask questions about the uploaded codebase.

## Architecture Overview

The application is split into a Next.js frontend, a NestJS backend, and a PostgreSQL database managed through Prisma.

The frontend handles the UI, routing, and API calls. The backend handles authentication, project ownership, file extraction, AI provider management, review generation, and chat session persistence. PostgreSQL stores users, projects, files, AI provider records, reviews, chat sessions, and messages.

## Future Improvements

- Add pagination for large project and review lists.
- Add stronger file type validation for uploaded archives.
- Add connection testing feedback for AI providers in the UI.
- Add richer diff-aware review output.
- Add streaming chat responses.
- Add role-based administration for future multi-tenant support.
- Add full test coverage for backend services and frontend flows.