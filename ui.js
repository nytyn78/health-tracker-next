let chart

export function renderDashboard(today, maintenance, balance){

 document.getElementById("caloriesToday").textContent =
 "Calories today: " + today

 if(maintenance){
 document.getElementById("maintenance").textContent =
 "Estimated maintenance: " + Math.round(maintenance) + " kcal"
 }

 if(balance != null){

 const sign = balance > 0 ? "+" : ""

 document.getElementById("balance").textContent =
 "Energy balance: " + sign + Math.round(balance) + " kcal"

 }

}

export function renderMetabolic(text){

 document.getElementById("metabolic").textContent = text

}

export function renderWeightHistory(weights){

 const list = document.getElementById("weightHistory")

 list.innerHTML = ""

 weights.slice().reverse().forEach(w=>{

 const li = document.createElement("li")

 li.textContent = w.weight + " kg — " + w.date

 list.appendChild(li)

 })

}

export function renderWeightChart(weights){

 if(weights.length === 0) return

 const ctx = document.getElementById("weightChart").getContext("2d")

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
    tension:0.3
   }]
  }
 })

}