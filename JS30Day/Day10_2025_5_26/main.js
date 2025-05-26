const images = [
    "/JS30Day/Day10_2025_5_26/img/OIP (1).jpg",
    "/JS30Day/Day10_2025_5_26/img/OIP.jpg",
    "/JS30Day/Day10_2025_5_26/img/Ảnh-nền-máy-tính-cực-đẹp-Gearvn.jpg"
];

let currentIndex = 0;

const slider = document.querySelector(".slider");

function showImage(index) {
    slider.src = images[index];
}

function prevous_picture() {
    currentIndex--;
    if (currentIndex < 0 ) {
        currentIndex = images.length - 1
    }
    showImage(currentIndex);
}

function next_picture() {
    currentIndex++ ;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    showImage(currentIndex);
}

showImage(currentIndex);