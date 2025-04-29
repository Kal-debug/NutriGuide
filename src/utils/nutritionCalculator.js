// src/utils/nutritionCalculator.js

/**
 * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation
 * @param {Object} profile - User's profile data
 * @returns {number} BMR in calories per day
 */
export function calculateBMR(profile) {
    // Validate required data
    if (!profile || !profile.age || !profile.sex || !profile.height_cm || !profile.weight_kg) {
      throw new Error('Incomplete profile data for BMR calculation');
    }
    
    const { age, sex, height_cm, weight_kg } = profile;
    
    // Mifflin-St Jeor Equation
    let bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age;
    
    // Adjust based on sex
    if (sex === 'male') {
      bmr += 5;
    } else if (sex === 'female') {
      bmr -= 161;
    }
    
    return Math.round(bmr);
  }
  
  /**
   * Calculate Total Daily Energy Expenditure based on BMR and activity level
   * @param {number} bmr - Basal Metabolic Rate
   * @param {string} activityLevel - User's activity level
   * @returns {number} TDEE in calories per day
   */
  export function calculateTDEE(bmr, activityLevel = 'moderate') {
    const activityMultipliers = {
      sedentary: 1.2,     // Little or no exercise
      light: 1.375,       // Light exercise 1-3 days/week
      moderate: 1.55,     // Moderate exercise 3-5 days/week
      active: 1.725,      // Active exercise 6-7 days/week
      veryActive: 1.9     // Very active exercise, physical job or training 2x/day
    };
    
    const multiplier = activityMultipliers[activityLevel] || activityMultipliers.moderate;
    return Math.round(bmr * multiplier);
  }
  
  /**
   * Calculate calorie target based on TDEE and goal
   * @param {number} tdee - Total Daily Energy Expenditure
   * @param {string} goal - User's goal (loss, maintain, gain)
   * @returns {number} Calorie target in calories per day
   */
  export function calculateCalorieTarget(tdee, goal) {
    switch (goal) {
      case 'loss':
        return Math.round(tdee * 0.8); // 20% deficit
      case 'gain':
        return Math.round(tdee * 1.15); // 15% surplus
      case 'maintain':
      default:
        return tdee;
    }
  }
  
  /**
   * Calculate macronutrient targets based on calorie target and goal
   * @param {number} calorieTarget - Daily calorie target
   * @param {string} goal - User's goal (loss, maintain, gain)
   * @param {number} weight_kg - User's weight in kg
   * @returns {Object} Macronutrient targets in grams
   */
  export function calculateMacroTargets(calorieTarget, goal, weight_kg) {
    let proteinRatio, fatRatio, carbRatio;
    
    // Set macro ratios based on goal
    switch (goal) {
      case 'loss':
        // Higher protein, moderate fat, lower carbs for weight loss
        proteinRatio = 0.30;
        fatRatio = 0.35;
        carbRatio = 0.35;
        break;
      case 'gain':
        // Higher carbs, moderate protein, moderate fat for muscle gain
        proteinRatio = 0.25;
        fatRatio = 0.25;
        carbRatio = 0.50;
        break;
      case 'maintain':
      default:
        // Balanced macros for maintenance
        proteinRatio = 0.25;
        fatRatio = 0.30;
        carbRatio = 0.45;
    }
    
    // Calculate grams of each macro
    // Protein: 4 calories per gram
    // Carbs: 4 calories per gram
    // Fat: 9 calories per gram
    
    // Ensure minimum protein based on body weight (at least 1.6g per kg for all goals)
    const minProtein = Math.round(weight_kg * 1.6);
    const proteinFromRatio = Math.round((calorieTarget * proteinRatio) / 4);
    const protein = Math.max(minProtein, proteinFromRatio);
    
    // Adjust remaining calories after protein
    const remainingCalories = calorieTarget - (protein * 4);
    const fatCalories = remainingCalories * (fatRatio / (fatRatio + carbRatio));
    const carbCalories = remainingCalories * (carbRatio / (fatRatio + carbRatio));
    
    const fat = Math.round(fatCalories / 9);
    const carbs = Math.round(carbCalories / 4);
    
    return {
      protein,
      carbs,
      fat
    };
  }
  
  /**
   * Calculate complete nutrition targets based on user profile
   * @param {Object} profile - User's profile data
   * @param {string} activityLevel - User's activity level
   * @returns {Object} Complete nutrition targets
   */
  export function calculateNutritionTargets(profile, activityLevel = 'moderate') {
    // Calculate BMR
    const bmr = calculateBMR(profile);
    
    // Calculate TDEE
    const tdee = calculateTDEE(bmr, activityLevel);
    
    // Calculate calorie target based on goal
    const calorieTarget = calculateCalorieTarget(tdee, profile.goal);
    
    // Calculate macro targets
    const macroTargets = calculateMacroTargets(calorieTarget, profile.goal, profile.weight_kg);
    
    return {
      bmr,
      tdee,
      calorieTarget,
      ...macroTargets
    };
  }