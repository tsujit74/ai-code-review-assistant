# System Architecture

## Overview
AI-Powered Code Review Assistant with separate frontend and backend.

## Architecture Diagram
┌─────────────┐ HTTP/API ┌─────────────┐
│ Frontend │ ─────────────────> │ Backend │
│ (Next.js) │ │ (NestJS) │
└─────────────┘ └──────┬──────┘
│
│
▼
┌─────────────┐
│ PostgreSQL │
│ (Prisma) │
└─────────────┘

text

## Components
- Frontend: Next.js App Router with TypeScript
- Backend: NestJS with modular architecture
- Database: PostgreSQL with Prisma ORM
- Auth: JWT tokens

## Future Sections
- Detailed component architecture
- API endpoint structure
- Database schema
- Deployment strategy
