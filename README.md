# NutriTrack – Full-Stack Nutrition Tracker 🥗

Log meals, track macros, and smash your nutrition goals—right from the browser.

![NutriTrack dashboard screenshot](docs/screenshots/dashboard.png)

---

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [NPM Scripts](#npm-scripts)
7. [API Endpoints](#api-endpoints)
8. [Deployment](#deployment)
9. [Roadmap](#roadmap)
10. [Contributing](#contributing)
11. [License](#license)

---

## Features
- **Secure Auth** – JWT-based signup / login (bcrypt-hashed passwords)
- **Meal CRUD** – Add, edit, and delete meals with calories & macros
- **Macro Donut Chart** – Live Chart.js visual of protein / carbs / fat
- **Daily & Weekly Summaries** – Automatic totals and averages
- **Profile-Driven Targets** – BMR & macro goals calculated from user data
- **Responsive SPA** – Works great on desktop and mobile
- **PWA-Ready** – Installable, offline-capable build (Vite + vite-plugin-pwa)

## Tech Stack
| Layer    | Tech                                                    |
|----------|---------------------------------------------------------|
| Frontend | Vue 3 · Vite · Pinia · Tailwind · Chart.js              |
| Backend  | Node.js · Express 18 · jsonwebtoken · bcrypt            |
| Database | PostgreSQL · Sequelize ORM                              |
| DevOps   | ESLint · Prettier · Jest/Vitest · Postman               |
| Deploy   | Vercel (frontend) · Render (API) · Supabase (Postgres)  |

## Project Structure
```
.
├── src/                 # Vue SPA
│   ├── components/
│   ├── router/
│   ├── utils/
│   └── main.js
├── server/              # Express API
│   ├── models/
│   ├── middleware/
│   └── app.js
└── README.md
```

## Getting Started
```bash
# 1. Clone the repo
git clone https://github.com/your-username/nutritrack.git
cd nutritrack

# 2. Install dependencies
npm install               # root dev tools
cd server && npm install  # backend deps
cd ../src && npm install  # frontend deps
cd ..

# 3. Configure environment
cp server/.env.example server/.env   # fill JWT_SECRET & DB_URL

# 4. Run dev servers
npm run dev:server   # Express on :3000
npm run dev:web      # Vite on :5173
```
Visit **http://localhost:5173** to start logging meals!

## Environment Variables
| Variable        | Location       | Example                                         |
|-----------------|----------------|-------------------------------------------------|
| `JWT_SECRET`    | `server/.env`  | `superSecretJwtKey123`                          |
| `DB_URL`        | `server/.env`  | `postgres://user:pass@host:5432/nutritrack_db`  |
| `VITE_API_URL`  | `src/.env`     | `http://localhost:3000`                         |

## NPM Scripts
| Command              | Description                       |
|----------------------|-----------------------------------|
| `npm run dev:web`    | Vite dev server with hot reload   |
| `npm run build`      | Production build (frontend)       |
| `npm run dev:server` | Nodemon-powered Express API       |
| `npm test`           | Jest + Vitest unit tests          |
| `npm run lint`       | ESLint + Prettier check           |

## API Endpoints
```
POST   /register          # create account
POST   /login             # obtain JWT
GET    /meals             # list meals (auth)
POST   /meals             # add meal
PUT    /meals/:id         # update meal
DELETE /meals/:id         # delete meal
GET    /meals/today       # today’s meals + totals
GET    /profile           # fetch profile
POST   /profile           # create/update profile
```
> **Auth:** add `Authorization: Bearer <JWT>` to every protected request.

## Deployment
1. **Frontend** – `npm run build` and deploy `/dist` to **Vercel**.  
2. **Backend** – push `/server` to **Render**; set `JWT_SECRET` & `DB_URL` in the dashboard.  
3. **Database** – create a **Supabase** Postgres instance and whitelist Render/Vercel IPs.

## Roadmap
- [ ] Barcode scanner (OpenFoodFacts API)  
- [ ] Micronutrient tracking  
- [ ] Social leaderboard & streak badges  
- [ ] Native mobile wrapper (Capacitor)

## Contributing
1. Fork the repo & create your branch: `git checkout -b feature/AmazingFeature`
2. Commit changes: `git commit -m 'Add some AmazingFeature'`
3. Push to the branch: `git push origin feature/AmazingFeature`
4. Open a Pull Request and describe your changes

## License
Distributed under the **MIT License**. See `LICENSE` for more information.

---

### Project Team
**Naol Seyum** · **Kaleab Abebe**  
Submitted to **Professor Mingxi Yan**
