let pro=localStorage.getItem("Productive") || 0
let unpro=localStorage.getItem("Unproductive") || 0
let idle=localStorage.getItem("Idle") || 0

let Productive_time_percent_box=document.getElementById("Productive_time_percent")
let Unproductive_time_percent_box=document.getElementById("Unproductive_time_percent")
let Idle_time_percent_box=document.getElementById("Idle_time_percent")



var xValues = ["Productive", "Unproductive", "Idle"];
var yValues = [pro, unpro,idle];
var barColors = ["green", "red","yellow"];
let total=Number(pro)+Number(unpro)+Number(idle)

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
            text: "Time spread"
          }
        }
      });

    find_percentage()
    showname()
}


function find_percentage(){
    let productive_time_percent=(pro/total)*100;
    let unproductive_time_percent=(unpro/total)*100;
    let idle_time_percent=(idle/total)*100;

    Productive_time_percent_box.innerHTML=`${productive_time_percent.toFixed(2)} %`;
    Unproductive_time_percent_box.innerHTML=`${unproductive_time_percent.toFixed(2)} %`;
    Idle_time_percent_box.innerHTML=`${idle_time_percent.toFixed(2)} %`;
}


function showname(){
    let showLoggedUser=document.getElementById("showLoggedUser")
    let nameOfUser=localStorage.getItem("loggedUser")
    if(nameOfUser){
        showLoggedUser.innerText=nameOfUser.split(" ")[0].toUpperCase()
    }
}

document.getElementById("toLogoutUser").addEventListener("click",(e)=>{
  e.preventDefault()
  window.location.href="index.html"
  localStorage.clear()
})