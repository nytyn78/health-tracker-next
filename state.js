const saved = localStorage.getItem("healthTracker")

export const state = saved
 ? JSON.parse(saved)
 : {
     meals: [],
     weights: [],
     calorieTarget: 2000
   }
