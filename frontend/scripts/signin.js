document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault()
    let payload = {
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    }
   console.log(payload);
   
    fetch(`http://localhost:8008/user/login`,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        if(res.msg==="login successful")
        {

            alert(res.msg)

            localStorage.setItem("loggedUser" ,res.name)


            localStorage.setItem("token",res.token)
            window.location.href="dashboard.html";

        }
        else if(res.error)
        {
            alert(res.error)
        }
        else{
            alert(res.msg)
        }
    })

})