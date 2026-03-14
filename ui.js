export function renderDashboard(today,avg,tdee,balance){

document.getElementById("todayCalories").innerText =
"Calories today: "+today

document.getElementById("avgCalories").innerText =
"7-day average calories: "+avg

document.getElementById("tdee").innerText =
"Estimated maintenance: "+(tdee||0)+" kcal"

document.getElementById("balance").innerText =
"Energy balance: "+balance+" kcal"

}

export function renderMetabolic(text){

document.getElementById("metabolic").innerText=text

}

export function renderCalorieHistory(calories){

const el=document.getElementById("calorieHistory")

el.innerHTML=""

calories.slice().reverse().forEach(c=>{

const li=document.createElement("li")

li.innerText=c.calories+" kcal — "+c.date

const edit=document.createElement("button")

edit.innerText="edit"

edit.onclick=()=>{

const v=prompt("Edit calories",c.calories)

if(v!==null){

c.calories=Number(v)

location.reload()

}

}

li.appendChild(edit)

el.appendChild(li)

})

}

export function renderWeightHistory(weights){

const el=document.getElementById("weightHistory")

el.innerHTML=""

weights.slice().reverse().forEach(w=>{

const li=document.createElement("li")

li.innerText=w.weight+" kg — "+w.date

const edit=document.createElement("button")

edit.innerText="edit"

edit.onclick=()=>{

const v=prompt("Edit weight",w.weight)

if(v!==null){

w.weight=Number(v)

location.reload()

}

}

li.appendChild(edit)

el.appendChild(li)

})

}

function movingAverage(data,windowSize){

const result=[]

for(let i=0;i<data.length;i++){

let start=Math.max(0,i-windowSize+1)

let subset=data.slice(start,i+1)

let avg=subset.reduce((a,b)=>a+b,0)/subset.length

result.push(avg)

}

return result

}

export function renderWeightChart(weights,calories=[]){

const canvas=document.getElementById("chart")

if(!canvas) return

const ordered=[...weights].sort((a,b)=>new Date(a.date)-new Date(b.date))

const labels=ordered.map(w=>w.date.slice(5))

const weightData=ordered.map(w=>Number(w.weight))

const trend=movingAverage(weightData,7)

// align calories to weight dates
const calorieMap={}

calories.forEach(c=>{

calorieMap[c.date]=c.calories

})

const calorieData=ordered.map(w=>calorieMap[w.date]||null)

const min=Math.min(...weightData)-0.2
const max=Math.max(...weightData)+0.2

if(!window.weightChart){

const ctx=canvas.getContext("2d")

window.weightChart=new Chart(ctx,{
data:{
labels:labels,
datasets:[

{
type:"line",
label:"Weight",
data:weightData,
borderColor:"#2563eb",
borderWidth:3,
tension:0.35,
pointRadius:4,
yAxisID:"y"
},

{
type:"line",
label:"Trend",
data:trend,
borderColor:"#ef4444",
borderWidth:3,
tension:0.4,
pointRadius:0,
borderDash:[6,6],
yAxisID:"y"
},

{
type:"bar",
label:"Calories",
data:calorieData,
backgroundColor:"#94a3b8",
yAxisID:"y1"
}

]
},

options:{
responsive:true,
maintainAspectRatio:false,
animation:false,

plugins:{
legend:{
position:"top"
}
},

scales:{

y:{
min:min,
max:max,
ticks:{
stepSize:0.2
},
title:{
display:true,
text:"Weight (kg)"
}
},

y1:{
position:"right",
grid:{
drawOnChartArea:false
},
title:{
display:true,
text:"Calories"
}
},

x:{
ticks:{
maxRotation:45,
minRotation:45
}
}

}

}

})

}else{

window.weightChart.data.labels=labels

window.weightChart.data.datasets[0].data=weightData
window.weightChart.data.datasets[1].data=trend
window.weightChart.data.datasets[2].data=calorieData

window.weightChart.options.scales.y.min=min
window.weightChart.options.scales.y.max=max

window.weightChart.update()

}

}
