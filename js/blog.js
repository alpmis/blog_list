let blog_list = document.querySelector("#blog_list")
let loading = document.querySelector("#loading")
let accessToken = localStorage.getItem("accessToken");

(function checkAuth() {
    if (!accessToken) {
        window.location.pathname ="/pages/registor.html"
    }
})()

function getBlog() {
    fetch("https://asadbek6035.pythonanywhere.com/blog/list/", { method: "GET" })
        .then((blog_api) => {
            return blog_api.json()
        })
        .then((blog_api) => {
            rederBlog(blog_api);
        })
        .catch((err) => {
            console.log(err, "Xato");
        })
        .finally(() => {
            blog_list.classList.remove("hidden")
            loading.classList.add("hidden")
        })
}
getBlog()

function rederBlog(blog) {
    console.log(blog);
    blog_list.innerHTML = ""
    blog.forEach((item) => {
        let div = document.createElement("div")
        let box = `
        <img class="rounded-lg px-2 py-1 h-[250px]" src="${item.image}" alt="${item.title}">
        <div id="title" class="p-3">
        <p class="text-xl", "font-semibold", "text-black", "dark:text-white">Title: ${item.title}</p>
        <p class="text-gray-700", "dark:text-gray-300">Description: ${item.description}</p>
        <p>Date-Created: ${item.date_created}</p>
        <div class="flex justify-between">
        <a class="w-full" href="/pages/learn.html?id=${item?.id}"><button class="w-full bg-green-600 text-white p-1 active:bg-green-300 rounded-lg">Learn More..</button><a/>
        </div>
        </div>
        `;
        div.classList.add("border", "rounded-lg","p-1", "bg-gray-100", "dark:bg-gray-800","shadow-lg")
        div.innerHTML = box
        blog_list.appendChild(div)
    });
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