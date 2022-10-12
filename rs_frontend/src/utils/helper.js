function formatTime(timeString) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}

function getTotalCost(start_time, end_time, cost_per_hr){
  const [start_hr, start_min] = start_time.split(":");
  const [end_hr, end_min] = end_time.split(":");
  let time = end_hr - start_hr;
  let startMinInt = parseInt(start_min);
  let endMinInt = parseInt(end_min)
  let t2 = Math.abs(endMinInt - startMinInt);
  t2 = t2/60;
  time = time + t2;
 
  //console.log("min diff is " + t2)
  //console.log(end_time);
  //console.log(start_time);
  //console.log("time is " + time)
  let totalCost = time * cost_per_hr;
  return totalCost.toFixed(2);
}

module.exports = { formatTime, getTotalCost };