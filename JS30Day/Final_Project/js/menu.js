
// ==== LỌC MENU THEO LOẠI ==== //
const filterButtons = document.querySelectorAll(".filter-btn");
const menuGroups = document.querySelectorAll(".menu-group");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Cập nhật class active
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedCategory = button.dataset.category;

        menuGroups.forEach(group => {
            if (selectedCategory === "all" || group.dataset.group === selectedCategory) {
                group.style.display = "block";
            } else {
                group.style.display = "none";
            }
        });
    });
});

// ==== YÊU THÍCH VÀ LƯU LOCALSTORAGE ==== //
const favoriteButtons = document.querySelectorAll(".btn-fav");

favoriteButtons.forEach(button => {
    button.addEventListener("click", () => {
        const item = button.closest(".menu-item");
        const title = item.querySelector("h4").textContent;
        const price = item.querySelector("p").textContent;
        const image = item.querySelector("img").getAttribute("src");

        const favItem = { title, price, image };

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // Kiểm tra trùng
        const isExist = favorites.some(fav => fav.title === favItem.title);
        if (!isExist) {
            favorites.push(favItem);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert(`Đã thêm "${favItem.title}" vào yêu thích!`);
        } else {
            alert(`"${favItem.title}" đã có trong danh sách yêu thích.`);
        }
    });
});

