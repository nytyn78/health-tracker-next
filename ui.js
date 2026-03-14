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

export function renderWeightChart(weights){

const canvas=document.getElementById("chart")
if(!canvas) return

const ctx=canvas.getContext("2d")

const ordered=[...weights].sort((a,b)=>new Date(a.date)-new Date(b.date))

const labels=ordered.map(w=>w.date.slice(5))
const data=ordered.map(w=>Number(w.weight))

// round axis limits
const min=Math.floor(Math.min(...data))-1
const max=Math.ceil(Math.max(...data))+1

if(window.weightChart)
window.weightChart.destroy()

window.weightChart=new Chart(ctx,{
type:"line",
data:{
labels:labels,
datasets:[{
label:"Weight",
data:data,
borderColor:"#2563eb",
borderWidth:3,
tension:0.35,
pointRadius:4
}]
},
options:{
responsive:true,
maintainAspectRatio:false,
plugins:{
legend:{display:false}
},
scales:{
y:{
min:min,
max:max
}
}
}
})

}
