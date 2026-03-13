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

const today=state.calories.length?
state.calories[state.calories.length-1].calories:0

const avg=avgCalories(state.calories)

state.tdee=rollingTDEE(avg,state.weights,state.tdee)

const balance=energyBalance(today,state.tdee)

renderDashboard(today,avg,state.tdee,balance)

let text=""

const trend=weightTrend(state.weights)

if(trend)
text+="7-day trend weight: "+trend.toFixed(2)

renderMetabolic(text)

renderCalorieHistory(state.calories)

renderWeightHistory(state.weights)

renderWeightChart(state.weights)

localStorage.setItem("healthTracker",JSON.stringify(state))
}

document.getElementById("addCalories").onclick=()=>{

const c=Number(document.getElementById("calorieInput").value)

let date=document.getElementById("calorieDate").value

if(!date)
date=new Date().toISOString().slice(0,10)

state.calories.push({calories:c,date})

refresh()
}

document.getElementById("addWeight").onclick=()=>{

const w=Number(document.getElementById("weightInput").value)

let date=document.getElementById("weightDate").value

if(!date)
date=new Date().toISOString().slice(0,10)

state.weights.push({weight:w,date})

refresh()
}

document.getElementById("simulate").onclick=()=>{

state.weights=[
{weight:80,date:"2026-03-01"},
{weight:79.6,date:"2026-03-02"},
{weight:79.2,date:"2026-03-03"},
{weight:78.8,date:"2026-03-04"},
{weight:78.4,date:"2026-03-05"},
{weight:78,date:"2026-03-06"},
{weight:77.6,date:"2026-03-07"},
{weight:77.2,date:"2026-03-08"}
]

state.calories=[
{calories:2400,date:"2026-03-02"},
{calories:2300,date:"2026-03-03"},
{calories:2200,date:"2026-03-04"},
{calories:2100,date:"2026-03-05"},
{calories:2000,date:"2026-03-06"},
{calories:2100,date:"2026-03-07"},
{calories:2200,date:"2026-03-08"}
]

refresh()
}

refresh()
