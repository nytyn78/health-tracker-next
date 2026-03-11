export function totalCalories(meals){
 return meals.reduce((s,m)=>s+m.calories,0)
}

export function weightTrend(weights){

 if(weights.length < 7) return null

 const slice = weights.slice(-7)

 const avg =
 slice.reduce((a,b)=>a + b.weight,0) / 7

 return avg
}

export function maintenanceEstimate(avgCalories, weeklyChange){

 const deficit = (weeklyChange * 7700)/7

 return avgCalories - deficit
}