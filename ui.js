let chart

export function renderCalories(calories){

 document.getElementById("calories").textContent =
 "Total Calories: " + calories
}


export function renderMetabolic(text){

 document.getElementById("metabolic").textContent =
 text
}


export function renderWeightHistory(weights){

 const list = document.getElementById("weightHistory")

 list.innerHTML = ""

 weights.slice().reverse().forEach(w=>{

 const li = document.createElement("li")

 li.textContent =
 w.weight + " kg — " + w.date

 list.appendChild(li)

 })

}


export function renderWeightChart(weights){

 const ctx =
 document.getElementById("weightChart")

 const labels = weights.map(w=>w.date)

 const data = weights.map(w=>w.weight)

 if(chart) chart.destroy()

 chart = new Chart(ctx,{
  type:"line",
  data:{
   labels:labels,
   datasets:[{
    label:"Weight",
    data:data,
    borderColor:"#2f80ed",
    fill:false
   }]
  }
 })

}