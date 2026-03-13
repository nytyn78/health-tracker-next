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
renderWeightChart,
renderCalorieHistory
} from './ui.js'

function refresh(){

 const todayCalories =
 state.calories.length
 ? state.calories[state.calories.length-1].calories
 : 0

 const avgCal = avgCalories(state.calories)

 const maintenance =
 maintenanceEstimate(avgCal, state.weights)

 const balance =
 energyBalance(todayCalories, maintenance)

 renderDashboard(todayCalories, avgCal, maintenance, balance)

 let text = ""

 const trend = weightTrend(state.weights)

 if(trend){
  text += "7-day trend weight: " + trend.toFixed(2) + " kg"
 }

 if(maintenance){
  text += "\nMaintenance estimate based on 14-day weight change"
 }

 renderMetabolic(text)

 renderCalorieHistory(state.calories)
 renderWeightHistory(state.weights)
 renderWeightChart(state.weights)

 localStorage.setItem("healthTracker", JSON.stringify(state))

}

document.getElementById("addCalories").onclick = () => {

 const c = Number(document.getElementById("calorieInput").value)
 if(!c) return

 const today = new Date().toISOString().slice(0,10)

 const existing = state.calories.find(d => d.date === today)

 if(existing){
  existing.calories = c
 } else {
  state.calories.push({
   calories:c,
   date:today
  })
 }

 refresh()

}

document.getElementById("addWeight").onclick = () => {

 const w = Number(document.getElementById("weightInput").value)
 if(!w) return

 state.weights.push({
  weight:w,
  date:new Date().toISOString().slice(0,10)
 })

 refresh()

}

refresh()