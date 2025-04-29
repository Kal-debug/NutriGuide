require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const bcrypt  = require('bcrypt')
const jwt     = require('jsonwebtoken')

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const users  = []
const meals  = []
let   mealId = 1

// REGISTER
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Missing fields' })
  if (users.find(u => u.email === email))
    return res.status(400).json({ error: 'Email already in use' })
  const hash = await bcrypt.hash(password, 10)
  users.push({ name, email, password: hash })
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(400).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok)   return res.status(400).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})

// AUTH MIDDLEWARE
const auth = (req, res, next) => {
  const header = req.headers.authorization || ''
  const token  = header.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  try { 
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// CREATE
app.post('/meals', auth, (req, res) => {
  const meal = {
    id: mealId++,
    user: req.user.email,
    ...req.body,            // type, calories, protein, carbs, fat
    loggedAt: new Date()
  }
  meals.push(meal)
  res.json(meal)
})

// READ TODAY
app.get('/meals/today', auth, (req, res) => {
  const today = new Date().toISOString().slice(0,10)
  const list = meals.filter(m =>
    m.user === req.user.email &&
    m.loggedAt.toISOString().startsWith(today)
  )
  const totals = list.reduce((acc,m) => {
    acc.calories += m.calories
    acc.protein  += m.protein
    acc.carbs    += m.carbs
    acc.fat      += m.fat
    return acc
  }, { calories:0, protein:0, carbs:0, fat:0 })
  res.json({ meals: list, totals })
})

// READ ALL
app.get('/meals', auth, (req, res) => {
  const list = meals.filter(m => m.user === req.user.email)
  res.json(list)
})

// UPDATE (replace values)
app.put('/meals/:id', auth, (req, res) => {
  const meal = meals.find(m =>
    m.id === +req.params.id && m.user === req.user.email
  )
  if (!meal) return res.status(404).json({ error: 'Meal not found' })
  // overwrite exactly with body values
  meal.type     = req.body.type
  meal.calories = req.body.calories
  meal.protein  = req.body.protein
  meal.carbs    = req.body.carbs
  meal.fat      = req.body.fat
  res.json(meal)
})

// DELETE
app.delete('/meals/:id', auth, (req, res) => {
  const idx = meals.findIndex(m =>
    m.id === +req.params.id && m.user === req.user.email
  )
  if (idx === -1) return res.status(404).json({ error: 'Meal not found' })
  meals.splice(idx,1)
  res.json({ success: true })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
)

// Profile storage
const profiles = [];

// GET profile
app.get('/profile', auth, (req, res) => {
  const profile = profiles.find(p => p.email === req.user.email);
  if (!profile) return res.json({});
  res.json(profile);
});

// CREATE/UPDATE profile
app.post('/profile', auth, (req, res) => {
  // Validate required fields
  const { age, sex, height_cm, weight_kg, goal } = req.body;
  if (!age || !sex || !height_cm || !weight_kg || !goal) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  // Find existing profile or create new one
  let profile = profiles.find(p => p.email === req.user.email);
  
  if (profile) {
    // Update existing profile
    Object.assign(profile, req.body);
  } else {
    // Create new profile
    profile = {
      email: req.user.email,
      ...req.body,
      createdAt: new Date()
    };
    profiles.push(profile);
  }
  
  res.json(profile);
});

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Add to your server file (app.js)

// Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
function calculateBMR(profile) {
  const { age, sex, height_cm, weight_kg } = profile;
  
  if (sex.toLowerCase() === 'male') {
    return (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5;
  } else {
    return (10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161;
  }
}

// Calculate TDEE (Total Daily Energy Expenditure) based on activity level
function calculateTDEE(bmr, activityLevel) {
  const activityMultipliers = {
    'sedentary': 1.2,        // Little or no exercise
    'light': 1.375,          // Light exercise 1-3 days/week
    'moderate': 1.55,        // Moderate exercise 3-5 days/week
    'active': 1.725,         // Heavy exercise 6-7 days/week
    'very_active': 1.9       // Very heavy exercise, physical job or training twice a day
  };
  
  const multiplier = activityMultipliers[activityLevel] || activityMultipliers.moderate;
  return bmr * multiplier;
}

// Calculate target calories based on goal
function calculateCalorieTarget(tdee, goal) {
  switch(goal.toLowerCase()) {
    case 'lose_weight':
      return Math.round(tdee * 0.8); // 20% deficit
    case 'maintain':
      return Math.round(tdee);
    case 'gain_weight':
    case 'build_muscle':
      return Math.round(tdee * 1.1); // 10% surplus
    default:
      return Math.round(tdee);
  }
}

// Calculate macronutrient targets based on calorie target and goal
function calculateMacros(calorieTarget, goal, weight_kg) {
  let protein, carbs, fat;
  
  switch(goal.toLowerCase()) {
    case 'lose_weight':
      protein = Math.round(weight_kg * 2.2); // Higher protein for satiety and muscle preservation
      fat = Math.round(weight_kg * 0.8);
      // Remaining calories from carbs
      carbs = Math.round((calorieTarget - (protein * 4) - (fat * 9)) / 4);
      break;
    case 'maintain':
      protein = Math.round(weight_kg * 1.8);
      fat = Math.round(weight_kg * 1);
      carbs = Math.round((calorieTarget - (protein * 4) - (fat * 9)) / 4);
      break;
    case 'gain_weight':
    case 'build_muscle':
      protein = Math.round(weight_kg * 2); // Higher protein for muscle building
      fat = Math.round(weight_kg * 0.9);
      carbs = Math.round((calorieTarget - (protein * 4) - (fat * 9)) / 4);
      break;
    default:
      // Default balanced distribution
      protein = Math.round(calorieTarget * 0.3 / 4);
      fat = Math.round(calorieTarget * 0.3 / 9);
      carbs = Math.round(calorieTarget * 0.4 / 4);
  }
  
  // Make sure we don't have negative carbs
  if (carbs < 50) {
    // Readjust if carbs are too low
    carbs = 50;
    // Recalculate fat to maintain calorie target
    fat = Math.round((calorieTarget - (protein * 4) - (carbs * 4)) / 9);
  }
  
  return { protein, carbs, fat };
}

// Nutrition targets endpoint
app.get('/nutrition', auth, (req, res) => {
  const profile = profiles.find(p => p.email === req.user.email);
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  
  // Default to moderate if activity level not provided
  const activityLevel = profile.activityLevel || 'moderate';
  
  // Calculate nutrition targets
  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(bmr, activityLevel);
  const calorieTarget = calculateCalorieTarget(tdee, profile.goal);
  const macros = calculateMacros(calorieTarget, profile.goal, profile.weight_kg);
  
  // Return calculated values
  res.json({
    bmr,
    tdee,
    calorieTarget,
    protein: macros.protein,
    carbs: macros.carbs,
    fat: macros.fat,
    // Include summary for display
    summary: {
      dailyCalories: calorieTarget,
      macroSplit: {
        protein: `${macros.protein}g (${Math.round((macros.protein * 4 / calorieTarget) * 100)}%)`,
        carbs: `${macros.carbs}g (${Math.round((macros.carbs * 4 / calorieTarget) * 100)}%)`,
        fat: `${macros.fat}g (${Math.round((macros.fat * 9 / calorieTarget) * 100)}%)`
      }
    }
  });
});