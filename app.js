import {state} from './state.js'
import {
avgCalories,
weightTrend,
maintenanceEstimate,
energyBalance
} from './analytics.js'

import {
renderDashboard,
renderMetabolic,
renderWeightHistory,
renderWeightChart
} from './ui.js'


function refresh(){

 const caloriesToday =
 state.calories.length
 ? state.calories[state.calories.length-1].calories
 : 0

 const avgCal = avgCalories(state.calories)

 const maintenance =
 maintenanceEstimate(avgCal, state.weights)

 const balance =
 energyBalance(caloriesToday, maintenance)

 renderDashboard(caloriesToday, maintenance, balance)

 let text = ""

 const trend = weightTrend(state.weights)

 if(trend){

 text += "7‑day trend weight: " + trend.toFixed(2) + " kg"

 }

 if(maintenance){

 text += "\nMaintenance estimate based on 14‑day weight change"

 }

 renderMetabolic(text)

 renderWeightHistory(state.weights)

 renderWeightChart(state.weights)

 localStorage.setItem("healthTracker", JSON.stringify(state))

}



document.getElementById("addCalories").onclick = () => {

 const c = Number(document.getElementById("calorieInput").value)

 state.calories.push({
  calories:c,
  date:new Date().toISOString().slice(0,10)
 })

 refresh()

}


document.getElementById("addWeight").onclick = () => {

 const w = Number(document.getElementById("weightInput").value)

 state.weights.push({
  weight:w,
  date:new Date().toISOString().slice(0,10)
 })

 refresh()

}

refresh()