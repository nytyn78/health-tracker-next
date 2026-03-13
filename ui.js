let chart

export function renderDashboard(today,avg,maint,balance){

document.getElementById("caloriesToday").textContent =
"Calories today: "+today

document.getElementById("calories7").textContent =
"7-day average calories: "+Math.round(avg)

if(maint)
document.getElementById("maintenance").textContent =
"Estimated maintenance: "+Math.round(maint)

if(balance!==null)
document.getElementById("balance").textContent =
"Energy balance: "+Math.round(balance)
}

export function renderMetabolic(text){

document.getElementById("metabolic").textContent=text
}

export function renderCalorieHistory(cal){

const list=document.getElementById("calorieHistory")

list.innerHTML=""

cal.slice().reverse().forEach((c,i)=>{

const li=document.createElement("li")

li.innerHTML=
c.calories+" kcal — "+c.date+
" <button data-i='"+i+"'>edit</button>"

li.querySelector("button").onclick=()=>{

const newCal=prompt("Calories:",c.calories)

const newDate=prompt("Date:",c.date)

if(newCal) c.calories=Number(newCal)

if(newDate) c.date=newDate

location.reload()

}

list.appendChild(li)

})
}

export function renderWeightHistory(w){

const list=document.getElementById("weightHistory")

list.innerHTML=""

w.slice().reverse().forEach((x,i)=>{

const li=document.createElement("li")

li.innerHTML=
x.weight+" kg — "+x.date+
" <button data-i='"+i+"'>edit</button>"

li.querySelector("button").onclick=()=>{

const newW=prompt("Weight:",x.weight)

const newDate=prompt("Date:",x.date)

if(newW) x.weight=Number(newW)

if(newDate) x.date=newDate

location.reload()

}

list.appendChild(li)

})
}

export function renderWeightChart(weights){

if(weights.length===0) return

const ctx=document.getElementById("weightChart")

const labels=weights.map(w=>w.date)

const data=weights.map(w=>w.weight)

if(chart) chart.destroy()

chart=new Chart(ctx,{
type:"line",
data:{
labels,
datasets:[{
label:"Weight",
data,
tension:0.3
}]
}
})
}
