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

// detect today's calories correctly
const todayDate = new Date().toISOString().slice(0,10)

const todayEntry = state.calories.find(c=>c.date===todayDate)
