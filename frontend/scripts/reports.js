let pro=localStorage.getItem("Productive") || 0
let unpro=localStorage.getItem("Unproductive") || 0
let idle=localStorage.getItem("Idle") || 0

var xValues = ["Productive", "Unproductive", "Idle"];
var yValues = [pro, unpro,idle];
var barColors = ["green", "red","yellow"];

window.onload=()=>{
    new Chart("BarGraph", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    }
    })

    new Chart("pie-graph-section", {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "World Wide Wine Production"
          }
        }
      });
}