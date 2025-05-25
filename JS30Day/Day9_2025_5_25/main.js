const divBody = document.querySelector('body');
const divButton = document.querySelector('.button');
const divSelect = document.querySelector('select');

divButton.addEventListener('click', () => {
    if (divSelect.value === 'anh1') {
        divBody.style.backgroundImage = "url('/JS30Day/Day9_2025_5_25/img/OIP%20(1).jpg')";
    } else if (divSelect.value === 'anh2') {
        divBody.style.backgroundImage = "url('/JS30Day/Day9_2025_5_25/img/OIP%20(2).jpg')";
    } else {
        divBody.style.backgroundImage = "url('/JS30Day/Day9_2025_5_25/img/OIP.jpg')";
    }
});
