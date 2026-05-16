# ServiceLink: Full-Stack AI-Enhanced Marketplace

Developed for the **House of Edtech** Fullstack Developer Assignment (Jan 2026).

ServiceLink is a sophisticated, multi-role platform connecting independent professionals (Service Providers) with ambitious clients worldwide. Built with a focus on performance, security, and innovative AI integration.

## 🚀 Live Links
- **Frontend (Vercel):** [https://edu-ten-mu.vercel.app](https://edu-ten-mu.vercel.app)
- **Backend (Render):** [https://edutechbackend-nmz9.onrender.com](https://edutechbackend-nmz9.onrender.com)

## 🛠️ Technical Stack & Architecture

### Frontend / Edge API (Node.js)
- **Next.js 16 (React 19):** Leveraging Server Components, Suspense, and App Router.
- **TypeScript:** Ensuring strict type safety across the application.
- **Tailwind CSS & Shadcn UI:** For a modern, responsive, and accessible UI.
- **Node.js API Routes:** Handling AI integration and edge-side logic.
- **Playwright:** Comprehensive E2E testing suite.

### Core Backend (Python/FastAPI)
- **FastAPI:** High-performance asynchronous API framework.
- **PostgreSQL:** Robust relational database for reliable data management.
- **SQLAlchemy:** Modern ORM for database abstraction.
- **OAuth2 & JWT:** Secure authentication with Google integration.

### Deployment & DevOps
- **Docker & Docker Compose:** Containerized development and production parity.
- **CI/CD:** Automated deployments via Vercel and Render.
- **PostgreSQL (Managed):** Hosted on Render.

## ✨ Key Features (Beyond CRUD)

1.  **AI-Powered Teacher Bios:** Uses **Google Gemini 1.5 Flash** to optimize service provider biographies, making them more engaging for students.

2.  **Multi-Role Ecosystem:** Distinct flows and dashboards for
 **Clients**,
 **Service Providers**,
 **SuperAdmins**.

3.  **Secure OAuth2 Flow:** Implementation of frontend-initiated Google OAuth with secure server-side session management.

4.  **Admin Monitoring:** Real-time statistics and management portal for platform oversight.
5.  **Sophisticated Architecture:** A polyglot approach combining the best of Node.js (Edge/Frontend) and FastAPI (Core Services).

## 🧪 Testing
The project includes E2E tests using Playwright.
```bash
cd edtechui
npx playwright test
```

## 👨‍💻 Developer Information
- **Name:** Vishal Madupu
- **GitHub:** [https://github.com/vishalmadupu](https://github.com/vishalmadupu)
- **LinkedIn:** [https://www.linkedin.com/in/vishalreddy4500/]
(https://www.linkedin.com/in/vishalreddy4500/)

---
© 2026 ServiceLink Inc. All rights reserved.
