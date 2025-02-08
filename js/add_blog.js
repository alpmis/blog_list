let blog_title = document.querySelector("#blog_title")
let blog_category = document.querySelector("#blog_category")
let blog_desc = document.querySelector("#blog_desc")
let avatar = document.querySelector("#avatar")
let accessToken = localStorage.getItem("accessToken");


(function checkAuth() {
    if (!accessToken) {
        window.location.pathname = "/pages/registor.html"
    }
})()
async function addBlog() {
    try {
        if (!blog_title.value) throw new Error("Mahsulot nomi kiritilmadi")
        if (Number(blog_category.value) == 0 || Number(blog_category.value) > 2) throw new Error("Mahsulot kategoriyasi tog'ri kiritilmadi")
        if (!blog_desc.value) throw new Error("Mahsulot malumoti kiritilmadi")
        if (!avatar.files[0]) throw new Error("Mahsulot rasmi kiritilmadi")

        let form_data = new FormData()
        form_data.append("title", blog_title.value)
        form_data.append("category", blog_category.value)
        form_data.append("description", blog_desc.value)
        form_data.append("image", avatar.files[0])

        let res = await fetch(`https://asadbek6035.pythonanywhere.com/blog/create/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: form_data
        });
        res = await res.json()
        window.location.pathname = "/pages/blog.html"
    } catch (error) {
        alert(error.message)
    }
}
