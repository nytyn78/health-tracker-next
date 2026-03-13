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

 if(!weights || weights.length === 0) return

 weights.slice().reverse().forEach(w => {

  const li = document.createElement("li")

  li.textContent = w.weight + " kg — " + w.date

  list.appendChild(li)

 })

}


export function renderWeightChart(weights){

 if(!weights || weights.length === 0) return

 const canvas = document.getElementById("weightChart")

 const ctx = canvas.getContext("2d")

 const labels = weights.map(w => w.date)

 const data = weights.map(w => w.weight)

 if(chart) chart.destroy()

 chart = new Chart(ctx,{
  type: "line",
  data: {
   labels: labels,
   datasets: [{
    label: "Weight",
    data: data,
    borderColor: "#2f80ed",
    backgroundColor: "rgba(47,128,237,0.1)",
    tension: 0.3,
    fill: true
   }]
  },
  options:{
   responsive: true,
   plugins:{
    legend:{
     display:true
    }
   },
   scales:{
    y:{
     beginAtZero:false
    }
   }
  }
 })

}
