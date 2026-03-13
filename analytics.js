export function avgCalories(cal){

if(cal.length===0) return 0

const slice = cal.slice(-7)

return slice.reduce((a,b)=>a+b.calories,0)/slice.length
}

export function weightTrend(w){

if(w.length<7) return null

const slice = w.slice(-7)

return slice.reduce((a,b)=>a+b.weight,0)/7
}

export function rollingTDEE(avg,w,prev){

if(w.length<8) return prev

const w1 = w[w.length-8].weight
const w2 = w[w.length-1].weight

const change = (w2-w1)/7

const energy = change*7700

const estimate = avg-energy

if(!prev) return estimate

return 0.8*prev + 0.2*estimate
}

export function energyBalance(cal,maint){

if(!maint) return null

return cal-maint
}
