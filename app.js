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
  state.calories.push({calories:c,date:today})
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

document.getElementById("simulate").onclick = () => {

 state.weights = [
{weight:80,date:"2026-03-01"},
{weight:79.6,date:"2026-03-02"},
{weight:79.2,date:"2026-03-03"},
{weight:78.8,date:"2026-03-04"},
{weight:78.4,date:"2026-03-05"},
{weight:78,date:"2026-03-06"},
{weight:77.6,date:"2026-03-07"},
{weight:77.2,date:"2026-03-08"},
{weight:76.8,date:"2026-03-09"},
{weight:76.4,date:"2026-03-10"},
{weight:76,date:"2026-03-11"},
{weight:75.8,date:"2026-03-12"},
{weight:75.4,date:"2026-03-13"}
]

 state.calories = [
{calories:2400,date:"2026-03-07"},
{calories:2300,date:"2026-03-08"},
{calories:2200,date:"2026-03-09"},
{calories:2100,date:"2026-03-10"},
{calories:2000,date:"2026-03-11"},
{calories:2100,date:"2026-03-12"},
{calories:2200,date:"2026-03-13"}
]

 refresh()
}

refresh()