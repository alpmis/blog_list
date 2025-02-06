let blog_list = document.querySelector("#blog_list")
let loading = document.querySelector("#loading")

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
    blog.forEach((item, i) => {
        let div = document.createElement("div")
        let box = `
        <img class="rounded-lg px-2 py-1 h-[250px]" src="${item.image}" alt="${item.title}">
        <div id="title" class="p-3">
        <p>Title: ${item.title}</p>
        <p>Description: ${item.description}</p>
        <p>Date-Created: ${item.date_created}</p>
        <div class="flex justify-between">
        <button class="w-full bg-green-600 text-white p-1 active:bg-green-300 rounded-lg" onclick="learnBtn(${item.id})">Learn More..</button>
        </div>
        </div>
        `;
        div.classList.add("border", "rounded-lg", "p-[2px]")
        div.innerHTML = box
        blog_list.appendChild(div)
    });
}

async function learnBtn(id) {
    console.log("blog", id);
    let res = await fetch(
        `https://asadbek6035.pythonanywhere.com/blog/retrieve/${id}`, 
        { method: "GET" }
    );
    res = await res.json();
    if (res) {
        window.location.pathname = "/pages/learn.html"
        // window.location.search = `/id:${id}`
    }
}