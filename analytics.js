export function avgCalories(calories){

if(!calories.length) return 0

const last7 = calories.slice(-7)

const sum = last7.reduce((a,b)=>a+b.calories,0)

return Math.round(sum/last7.length)

}


export function weightTrend(weights){

if(weights.length < 7) return null

const last7 = weights.slice(-7)

const sum = last7.reduce((a,b)=>a+b.weight,0)

return sum/last7.length

}


export function regressionSlope(weights){

if(weights.length < 7) return 0

const data = weights.slice(-14)

let xSum=0
let ySum=0
let xySum=0
let x2Sum=0

for(let i=0;i<data.length;i++){

const x=i
const y=data[i].weight

xSum+=x
ySum+=y
xySum+=x*y
x2Sum+=x*x

}

const n=data.length

const slope=(n*xySum-xSum*ySum)/(n*x2Sum-xSum*xSum)

return slope

}


export function rollingTDEE(avgCalories,weights,prevTDEE){

if(weights.length<7) return prevTDEE

const slope = regressionSlope(weights)

const weightChangePerDay = slope

const energyChange = weightChangePerDay*7700

const estimated = avgCalories - energyChange

if(!prevTDEE) return Math.round(estimated)

return Math.round(prevTDEE*0.7 + estimated*0.3)

}


export function energyBalance(today,tdee){

if(!tdee) return 0

return today - tdee

}
