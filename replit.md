# Contabilize Assessoria Empresarial - Full Stack Web Application

## Overview

This is a modern, full-stack web application for "Contabilize Assessoria Empresarial," an accounting services company. The application provides a comprehensive institutional website with a unique CNAE (economic activity codes) search tool, contact management, and content management capabilities. It's built as a single-page application with server-side API endpoints, designed to help entrepreneurs, freelancers, and service providers find reliable accounting services and information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

- **Frontend**: React SPA with TypeScript, built with Vite
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured for Neon Database)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build System**: Vite for frontend, esbuild for backend
- **Deployment**: Single build process that serves static files from Express

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query for server state
- **UI Library**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: Drizzle ORM with PostgreSQL (Neon serverless)
- **API Design**: RESTful endpoints with proper error handling
- **Development**: Hot reload with Vite integration in development

### Database Schema
The application uses four main tables:
1. **users**: Basic user management
2. **cnae_data**: Economic activity codes with MEI eligibility and descriptions
3. **contact_submissions**: Contact form submissions
4. **blog_posts**: Content management for blog articles

### Core Features
1. **CNAE Search Tool**: Intelligent search for Brazilian economic activity codes
2. **Contact Management**: Form submissions with validation
3. **Service Pages**: Information about accounting services
4. **Blog System**: Content management for articles
5. **Responsive Design**: Mobile-first approach with modern UI

## Data Flow

### Client-Server Communication
- Frontend makes API calls using TanStack Query
- Server validates requests using Zod schemas
- Database operations handled through Drizzle ORM
- Error handling with proper HTTP status codes

### Key API Endpoints
- `GET /api/cnae/search?query=term` - Search CNAE codes
- `POST /api/contact` - Submit contact form
- `GET /api/blog` - Fetch blog posts (when implemented)

### State Management
- Server state managed by TanStack Query with caching
- Form state handled by React Hook Form
- UI state managed through React hooks
- No complex client-side state management needed

## External Dependencies

### Key Libraries
- **@neondatabase/serverless**: Neon PostgreSQL connection
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **wouter**: Client-side routing
- **zod**: Schema validation
- **react-hook-form**: Form management

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing

## Deployment Strategy

### Build Process
1. Frontend builds to `dist/public` using Vite
2. Backend bundles to `dist/index.js` using esbuild
3. Express serves static files in production
4. Environment variables control database connection

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)

### Development Workflow
- `npm run dev`: Starts development server with hot reload
- `npm run build`: Builds both frontend and backend
- `npm start`: Runs production build
- `npm run db:push`: Pushes database schema changes

### Key Architectural Decisions

**Monorepo Structure**: Chosen for easier code sharing and development workflow, with shared types and schemas accessible to both client and server.

**Drizzle ORM**: Selected for type-safe database operations and better PostgreSQL integration compared to alternatives like Prisma.

**Wouter for Routing**: Lightweight alternative to React Router, suitable for this single-page application's needs.

**shadcn/ui Component System**: Provides consistent, accessible UI components with Tailwind CSS integration.

**TanStack Query**: Handles server state, caching, and API calls efficiently without additional state management complexity.

The application is designed to be easily deployable on Replit with automatic database provisioning and serves as a complete business website with practical tools for the accounting industry.