const titleEl = document.querySelectorAll(".article-title")
const titleImg = document.querySelectorAll('.img')
titleEl.forEach(item=>{
    item.textContent = "Dương Minh Vũ Đẹp Trai Nhất Vũ Trụ"
})

titleImg.forEach(item=>{
    item.src = "https://i.pinimg.com/736x/d9/7a/5d/d97a5d5e75c6e60e1b1db1aa16d5e52d.jpg"
    item.srcset = "https://i.pinimg.com/736x/d9/7a/5d/d97a5d5e75c6e60e1b1db1aa16d5e52d.jpg"
})

