import {state} from './state.js'

import {
avgCalories,
weightTrend,
rollingTDEE,
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

// sort entries by date
state.weights.sort((a,b)=>a.date.localeCompare(b.date))
state.calories.sort((a,b)=>a.date.localeCompare(b.date))

// today's calories
const todayDate = new Date().toISOString().slice(0,10)

const todayEntry = state.calories.find(c=>c.date===todayDate)

const today = todayEntry ? todayEntry.calories : 0

// averages
const avg = avgCalories(state.calories)

// update TDEE
state.tdee = rollingTDEE(avg,state.weights,state.tdee)

// energy balance
const balance = energyBalance(today,state.tdee)

// render UI
renderDashboard(today,avg,state.tdee,balance)

let text=""

const trend = weightTrend(state.weights)

if(trend)
text += "7-day trend weight: " + trend.toFixed(2)

renderMetabolic(text)

renderCalorieHistory(state.calories)
renderWeightHistory(state.weights)
renderWeightChart(state.weights)

// save state
localStorage.setItem("healthTracker",JSON.stringify(state))

}



document.addEventListener("DOMContentLoaded",()=>{

// add calories
document.getElementById("addCalories").onclick = ()=>{

const c = Number(document.getElementById("calorieInput").value)

let date = document.getElementById("calorieDate").value

if(!date)
date = new Date().toISOString().slice(0,10)

const existing = state.calories.find(x=>x.date===date)

if(existing)
existing.calories = c
else
state.calories.push({calories:c,date})

refresh()

}


// add weight
document.getElementById("addWeight").onclick = ()=>{

const w = Number(document.getElementById("weightInput").value)

let date = document.getElementById("weightDate").value

if(!date)
date = new Date().toISOString().slice(0,10)

state.weights.push({weight:w,date})

refresh()

}


// load test data
document.getElementById("simulate").onclick = ()=>{

state.weights = [
{weight:80,date:"2026-03-01"},
{weight:79.8,date:"2026-03-02"},
{weight:79.6,date:"2026-03-03"},
{weight:79.2,date:"2026-03-04"},
{weight:78.8,date:"2026-03-05"},
{weight:78.7,date:"2026-03-06"},
{weight:78.5,date:"2026-03-07"},
{weight:78.2,date:"2026-03-08"},
{weight:78,date:"2026-03-09"},
{weight:77.8,date:"2026-03-10"},
{weight:77.5,date:"2026-03-11"},
{weight:77.5,date:"2026-03-12"},
{weight:77.4,date:"2026-03-13"},
{weight:77.2,date:"2026-03-14"}
]

state.calories = [
{calories:2400,date:"2026-03-08"},
{calories:2300,date:"2026-03-09"},
{calories:2200,date:"2026-03-10"},
{calories:2100,date:"2026-03-11"},
{calories:2000,date:"2026-03-12"},
{calories:2100,date:"2026-03-13"},
{calories:2200,date:"2026-03-14"}
]

state.tdee = null

refresh()

}


// initial render
refresh()

})
