let phone_number = document.querySelector("#phone_number")
let password = document.querySelector("#password")

function signUp2() {
    window.location.pathname = "pages/registor.html"
}
async function logIn() {
    try {
        let body = {
            phone_number: phone_number.value,
            password: password.value
        };
        let res = await fetch("https://asadbek6035.pythonanywhere.com/account/login/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        });
        res = await res.json();
        console.log(res.data.token.access);
        if (res.success) {
            localStorage.setItem("refreshToken", res?.data?.token?.refresh)
            localStorage.setItem("accessToken", res?.data?.token?.access)
            window.location.pathname = "/pages/blog.html"  
        }
        
    } catch (error) {
        alert("Telefon raqam yoki parol xato!");

    }
}