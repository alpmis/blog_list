let accessToken = localStorage.getItem("accessToken");
let more_image = document.querySelector("#more_image")
let comment_list = document.querySelector("#comment_list")
let loading = document.querySelector("#loading")
let more_title = document.querySelector("#more_title")
let more_desc = document.querySelector("#more_desc")
let more_date = document.querySelector("#more_date")
let comments = document.querySelector("#comments")
let com_t = document.querySelector("#com_t")
let comment_user = document.querySelector("#comment_user")


let id = new URLSearchParams(window.location.search)
id = id.get(`id`);

(function checkAuth() {
    if (!accessToken) {
        window.location.pathname = "/pages/registor.html"
    }
})();

async function getByIdBlog() {
    try {
        let res = await fetch(`https://asadbek6035.pythonanywhere.com/blog/retrieve/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        );
        res = await res.json()
        // console.log(res);

        if (res.code == "token_not_valid") {
            window.location.pathname = "/pages/registor.html"
        }
        more_image.src = res?.image
        more_image.alt = res?.title
        more_title.textContent = res?.title
        more_desc.textContent = "Description:  " + res?.description
        more_date.textContent = "Created Date:  " + res?.date_created
    } catch (error) {

    }
    finally {
        loading.classList.add("hidden")
        comment_list.classList.remove("hidden")
    }
}
getByIdBlog()

async function getByIdComment() {
    let res = await fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/list?blog_id=${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    );
    res = await res.json()


    comment_user.innerHTML = null
    res.forEach(element => {
        let p_id = document.createElement("p")
        p_id.classList.add("mx-2", "p-1", "font-semibold")
        p_id.textContent = "User ID: " + element.id

        let p_desc = document.createElement("p")
        p_desc.classList.add("mx-2", "p-1")
        p_desc.textContent = "Description: " + element.description

        comment_user.appendChild(p_id)
        comment_user.appendChild(p_desc)
        comment_user.classList.add("text-start")
        comment_user.classList.remove("text-center")
        console.log(element);
    });
    if (res.length == 0) {
        console.log(res);
        let p_no = document.createElement("p")
        p_no.classList.add("mx-2", "p-1", "font-semibold")
        p_no.textContent = "NO COMMENT"
        comment_user.classList.remove("text-start")
        comment_user.classList.add("text-center")
        comment_user.appendChild(p_no)
    }

}
getByIdComment()

function com_list() {
    comments.classList.toggle("hidden")
}

async function postComment() {
    let body = {
        blog: id,
        description: com_t.value
    }
    let res = await fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/post/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": 'application/json'
        },
        body: JSON.stringify(body)
    }
    );
    res = await res.json()
    if (res) {
        getByIdComment()
        com_t.value = null
    }

}

const darkModeToggle = document.querySelector("#darkModeToggle");
const html = document.documentElement;

if (localStorage.getItem("darkMode") === "enabled") {
    html.classList.add("dark");
    darkModeToggle.textContent = "☀️ Light Mode";
}

darkModeToggle.addEventListener("click", () => {
    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        localStorage.setItem("darkMode", "disabled");
        darkModeToggle.textContent = "🌙 Dark Mode";
    } else {
        html.classList.add("dark");
        localStorage.setItem("darkMode", "enabled");
        darkModeToggle.textContent = "☀️ Light Mode";
    }
});