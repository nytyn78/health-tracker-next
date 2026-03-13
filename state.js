const saved = localStorage.getItem("healthTracker")

export const state = saved
 ? JSON.parse(saved)
 : {
     weights: [],
     calories: []
   }