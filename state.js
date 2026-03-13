const saved = localStorage.getItem("healthTracker")

let parsed = saved ? JSON.parse(saved) : null

// Schema migration: convert old meal structure to calorie structure
if(parsed && parsed.meals){
 const today = new Date().toISOString().slice(0,10)
 const total = parsed.meals.reduce((a,b)=>a + (b.calories || 0),0)
 parsed = {
   weights: parsed.weights || [],
   calories: [{calories: total, date: today}]
 }
}

export const state = parsed || {
 weights: [],
 calories: []
}