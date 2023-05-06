const inputs = document.querySelectorAll("input"),
button = document.querySelector("button");

// console.log(inputs);
inputs.forEach((input, index1) => {
input.addEventListener("keyup", (e) => {
    const currentInput = input,
        nextInput = input.nextElementSibling,
        prevInput = input.previousElementSibling;

    if (currentInput.value.length > 1) {
        currentInput.value = "";
        return;
    }
    if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
    }

    if (e.key === "Backspace") {

        inputs.forEach((input, index2) => {
            if (index1 <= index2 && prevInput) {
                input.setAttribute("disabled", true);
                input.value = "";
                prevInput.focus();
            }
        });
    }
    if (!inputs[3].disabled && inputs[3].value !== "") {
        button.classList.add("active");
        return;
    }
    button.classList.remove("active");
});
});
window.addEventListener("load", () => inputs[0].focus());

const otpbutton = document.querySelector("#otpbutton");
otpbutton.addEventListener("click", fun);
function fun(event) {
try {
    event.preventDefault();

    let first = document.querySelector("#first").value;
    let second = document.querySelector("#second").value;
    let third = document.querySelector("#third").value;
    let fourth = document.querySelector("#fourth").value;
    let otp = ""
    otp += first + second + third + fourth

    let userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // console.log(userInfo)
    fetch(`http://localhost:8000/user/register?otp=${otp}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo)
    })
        .then(res => res.json())
        .then(res => {
              console.log(res.msg)
            if (res.msg === "SignUp successful") {
                alert("registered successfully")
                window.location.href = "./signin.html"
                localStorage.clear()
            }
            else if (res.msg === "wrong otp") {
                alert("wrong otp")
                window.location.href = "./otp.html"

            }else{
                alert(res.error)
            }
        })
        .catch(err => console.log(err))
} catch (error) {
    alert("Something went wrong. Please try again later.");
    console.log(error.message);
}
}