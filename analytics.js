export function avgCalories(calories){

 if(calories.length === 0) return 0

 const slice = calories.slice(-7)

 return slice.reduce((a,b)=>a + b.calories,0) / slice.length
}

export function weightTrend(weights){

 if(weights.length < 7) return null

 const slice = weights.slice(-7)

 return slice.reduce((a,b)=>a + b.weight,0) / slice.length
}

export function maintenanceEstimate(avgCalories, weights){

 if(weights.length < 14) return null

 const first = weights[weights.length - 14].weight
 const last = weights[weights.length - 1].weight

 const change = last - first

 const energy = (change * 7700) / 14

 return avgCalories - energy
}

export function energyBalance(todayCalories, maintenance){

 if(!maintenance) return null

 return todayCalories - maintenance
}