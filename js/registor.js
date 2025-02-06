let full_name = document.querySelector("#full_name")
let phone_number = document.querySelector("#phone_number")
let password = document.querySelector("#password")
let password2 = document.querySelector("#confirm_password")
let avatar = document.querySelector("#avatar")

function logIn2() {
    window.location.pathname = "pages/logIn.html"
}

async function registor() {
    try {
        if (password.value !== password2.value) throw new Error('Parol bir xil kiritilmadi..')

            const form_data = new FormData()
            form_data.append("full_name", full_name.value)
            form_data.append("phone_number", phone_number.value)
            form_data.append("password", password.value)
            form_data.append("password2",password2.value)
            form_data.append("avatar", avatar.files[0])
           
        let res = await fetch(`https://asadbek6035.pythonanywhere.com/account/register/`, {
            method: "POST", 
            body: form_data
        });
        res = await res.json()
        if (res.success){
            window.location.pathname = "/pages/logIn.html"
        }
        console.log(res);
    }
    catch (error) {
        alert(error.message)
    }

    
}