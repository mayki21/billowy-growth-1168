let form1 = document.getElementById("form");


  form1.addEventListener("submit", (e) =>
   {
        e.preventDefault();
            const payload = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    fetch(`http://localhost:8008/user/signup`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
        .then((res) => {
            if(res.msg === "SignUp successful") 
            {
                window.open("signin.html");
               
            } 
            else if(res.msg === "user is already register") 
            {
                alert("user already register");
                window.open("signin.html");
            }
            else{
                window.open("otp.html");
                localStorage.setItem("userInfo", JSON.stringify(payload));
            }
        })
        .catch(err => console.log(err));
});

const googleAuthBtn = document.getElementById('google-auth-btn');
googleAuthBtn.addEventListener('click', () => {
    const authLink = 'http://localhost:8008/auth/google';
    window.location.href = authLink;
});