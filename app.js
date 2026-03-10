
import {state} from './state.js'
import {totalCalories, weightTrend} from './analytics.js'
import {renderCalories, renderMetabolic} from './ui.js'

function refresh(){

 const calories = totalCalories(state.meals)
 renderCalories(calories)

 if(state.weights.length >= 7){

 const trend = weightTrend(state.weights)

 renderMetabolic(
   "7-day trend weight: " + trend.toFixed(2) + " kg"
 )

}

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
