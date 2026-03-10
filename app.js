import {state} from './state.js'
import {totalCalories, weightTrend, maintenanceEstimate} from './analytics.js'
import {renderCalories, renderMetabolic} from './ui.js'

function refresh(){

 const calories = totalCalories(state.meals)
 renderCalories(calories)

 let text = ""

 if(state.weights.length >= 7){

   const trend = weightTrend(state.weights)

   text += "7-day trend weight: " + trend.toFixed(2) + " kg"
 }

 if(state.weights.length >= 14){

   const first = state.weights[state.weights.length - 14]
   const last = state.weights[state.weights.length - 1]

   const weeklyChange = (last - first) / 2

   const maintenance = maintenanceEstimate(calories, weeklyChange)

   text += "\n\nEstimated maintenance: " + Math.round(maintenance) + " kcal/day"
 }

 renderMetabolic(text)

}



document.getElementById("addMeal").onclick = () => {
 const name = document.getElementById("mealName").value
 const cal = Number(document.getElementById("mealCalories").value)

 state.meals.push({name, calories:cal})

 refresh()
}

document.getElementById("addWeight").onclick = () => {
 const w = Number(document.getElementById("weightInput").value)

 state.weights.push(w)

 refresh()
}
