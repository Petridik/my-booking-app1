# FixIt.gr – Location-Based Services Platform (MVP)

FixIt is a modern web platform designed to bridge the gap between local customers and technical professionals (plumbers, electricians, etc.). By leveraging location data, the application allows users to discover, evaluate, and contact service providers in their area.

## 🏛️ Architecture & Tech Stack

The project is built using a modern, unified full-stack approach:

*   **Frontend & Routing:** [Next.js](https://nextjs.org/) (React) utilizing the App Router for optimized performance and server-side rendering (SSR).
*   **Styling:** Tailwind CSS for a fully responsive, mobile-first User Interface.
*   **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL) handling:
    *   Relational data storage (Users, Profiles, Services, Reviews).
    *   Row-Level Security (RLS) policies for secure data access.
*   **Authentication:** Supabase Auth (GoTrue) implementing secure session management for clients and providers.

## 🌟 Key Functionalities

### 1. User & Professional Roles
*   **Client Dashboard:** Browse services, filter by proximity/ratings, and manage service requests.
*   **Professional Dashboard:** Create and update business profiles, list services, manage availability, and showcase portfolio work.

### 2. Location-Based Discovery
*   Integration of geographic queries to match users with nearby service providers efficiently.

### 3. Data Integrity & Security
*   Secure authentication flows.
*   Protected database endpoints using Supabase middleware and Next.js Server Actions.
