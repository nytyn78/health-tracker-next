
export function totalCalories(meals){
 return meals.reduce((s,m)=>s+m.calories,0)
}

export function movingAverage(arr, window=7){
 if(arr.length < window) return null
 const slice = arr.slice(-window)
 return slice.reduce((a,b)=>a+b,0)/window
}

export function weightTrend(weights){
 return movingAverage(weights,7)
}

export function maintenanceEstimate(avgCalories, weeklyChange){
 const deficit = (weeklyChange * 7700)/7
 return avgCalories - deficit
}
