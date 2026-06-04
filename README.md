# Companero Realty
### A Modern Real Estate Platform with Admin Dashboard

---

## Overview

Companero Realty is a full-stack real estate web application rebuilt from scratch with a modern, minimal UI/UX. Users can browse property listings, view detailed property information through interactive modals, and get in touch with the team. Admins have a dedicated dashboard to manage all listings and monitor platform activity.

This project was a complete rewrite of an existing codebase — redesigned from the ground up with a focus on clean architecture, improved user experience, and a fully functional admin system.

---

## Features

### User-Facing
- Browse property listings with a clean, modern interface
- Property modals — click any listing to view full details, images, and information
- User authentication — sign up and log in securely
- Contact and inquiry system via email (Resend)

### Admin Dashboard
- View and monitor active users
- Full **CRUD** for property listings — create, read, update, delete
- Image uploads per property via Cloudinary
- Manage property details and information directly from the dashboard
- Analytics via Recharts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Prisma ORM |
| Auth | NextAuth v4 + Prisma Adapter |
| Password Hashing | bcryptjs |
| Image Uploads | Cloudinary |
| Email | Resend |
| Charts | Recharts |
| Icons | React Icons |
| Token Auth | JSON Web Token |
| File Parsing | Formidable |

---

## Architecture

```
companero/
├── app/                  # Next.js App Router
│   ├── (user)/           # Public-facing pages
│   ├── (admin)/          # Admin dashboard
│   └── api/              # API routes
├── components/           # Reusable UI components
├── prisma/               # Database schema
└── lib/                  # Utilities and helpers
```

---

## Authentication

- Users can register and log in via NextAuth
- Passwords are hashed with bcryptjs
- Admin routes are protected and separate from user-facing pages
- JWT used for session token handling

---

## Admin Panel

The admin dashboard provides full control over the platform:

- **Properties** — add new listings with images, descriptions, pricing, and details
- **Image Management** — upload and manage property images via Cloudinary
- **User Monitoring** — view currently active users on the platform
- **CRUD Operations** — create, edit, and delete any property listing

---

## Status

> 🔧 Database currently paused. Source code available in this repository.
