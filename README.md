# NutriGuide — Your Personal Nutrition Planner

A lightweight, student-friendly app that helps you balance and control what goes into your body. Input your profile, calculate your personal targets using the Mifflin–St Jeor equation, and visualize your macros—all in one clean interface.

---

## 🎯 Core Purpose

NutriGuide empowers college students and fitness enthusiasts to:

- Accurately calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)  
- Set personalized calorie targets for weight loss, maintenance, or muscle gain  
- Automatically split calories into protein, carbs, and fat  
- Track meals and see a live macro-split chart  
- Store data securely via a JWT-protected API  

---

## ⭐ Key Features

- **Profile Management**  
  Age, sex, height (cm), weight (kg), body-fat %, resting heart rate, activity level, and goal  
- **Nutrition Calculations**  
  - **BMR (Mifflin–St Jeor):**  
    \> Males: &nbsp;10 × weightₖg + 6.25 × height₍cm₎ − 5 × age + 5  
    \> Females: … − 161  
  - **TDEE:** BMR × activity multiplier (1.2 – 1.9)  
  - **Calorie Target:**  
    • 20 % deficit for loss  
    • Maintenance  
    • 10 % surplus for gain  
  - **Macro Split:**  
    • Protein, carbs, fat grams based on goal-specific ratios and minimum protein ≥ 1.6 g/kg  
- **Macro Chart Visualization**  
  Live pie or bar chart showing % of calories from protein, carbs, and fat  
- **JWT-Secured API**  
  Register, login, and protect your profile endpoint with JSON Web Tokens  
- **Persistent Storage**  
  Server-side SQLite (via Sequelize) + client-side localStorage fallback  
- **Dark Mode**  
  System-aware toggle, with smooth transitions  

---

## 🛠️ Tech Stack

| Layer          | Technology             |
| -------------- | ---------------------- |
| Front-end      | Vue 3 · Vite · Tailwind CSS |
| State & HTTP   | Vue reactive · Axios   |
| Back-end       | Node .js · Express     |
| Auth           | jsonwebtoken · bcrypt  |
| ORM / DB       | Sequelize · SQLite     |
| Config & Env   | dotenv · CORS          |

---

## ⚙️ Setup & Installation

1. **Clone & enter project**  
   ```bash
   git clone https://github.com/<you>/NutriGuide.git
   cd NutriGuide
