// Logic xử lý form đặt bàn cho trang Book Table
// Author: AI Assistant
// Giữ lại comment giải thích để dễ bảo trì

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-table');
    const nameInput = document.getElementById('res-name');
    const phoneInput = document.getElementById('res-phone');
    const emailInput = document.getElementById('res-email');
    const dateInput = document.getElementById('res-date');
    const timeInput = document.getElementById('res-time');
    const guestSelect = document.getElementById('res-guest');
    const areaSelect = document.getElementById('res-area');
    const noteInput = document.getElementById('res-note');
    const successPopup = document.getElementById('success-message');

    // Ẩn popup khi load trang
    if (successPopup) successPopup.style.display = 'none';

    // Hàm kiểm tra email hợp lệ
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    // Hàm kiểm tra số điện thoại hợp lệ
    function isValidPhone(phone) {
        return /^\d{9,11}$/.test(phone);
    }
    // Hàm kiểm tra ngày không phải quá khứ và không quá 1 tuần
    function isValidDate(dateStr) {
        const today = new Date();
        today.setHours(0,0,0,0);
        const inputDate = new Date(dateStr);
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 7);
        return inputDate >= today && inputDate <= maxDate;
    }

    // Xử lý submit form
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Lấy giá trị các trường
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const email = emailInput.value.trim();
            const date = dateInput.value;
            const time = timeInput.value;
            const guest = guestSelect.value;
            const area = areaSelect.value;
            // const note = noteInput.value.trim(); // Ghi chú không bắt buộc

            // Kiểm tra dữ liệu đầu vào
            if (!name || !phone || !email || !date || !time || !guest || !area) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
                return;
            }
            if (!isValidPhone(phone)) {
                alert('Số điện thoại không hợp lệ!');
                phoneInput.focus();
                return;
            }
            if (!isValidEmail(email)) {
                alert('Email không hợp lệ!');
                emailInput.focus();
                return;
            }
            if (!isValidDate(date)) {
                alert('Ngày đặt bàn không được là quá khứ hoặc quá 1 tuần!');
                dateInput.focus();
                return;
            }
            // Có thể thêm kiểm tra giờ hợp lệ ở đây nếu muốn

            // Hiển thị popup xác nhận
            if (successPopup) {
                successPopup.style.display = 'block';
                setTimeout(() => {
                    successPopup.style.display = 'none';
                }, 2500);
            }
            // Lưu thông tin đặt bàn mới nhất và lịch sử cho từng user vào localStorage
            const username = localStorage.getItem('userLoggedIn') || 'guest';
            const bookingInfo = {
                name,
                phone,
                email,
                date,
                time,
                guest,
                area,
                createdAt: new Date().toISOString()
            };
            // Lưu latest
            localStorage.setItem(`bookingLatest_${username}`, JSON.stringify(bookingInfo));
            // Lưu lịch sử
            let history = JSON.parse(localStorage.getItem(`bookingHistory_${username}`)) || [];
            history.push(bookingInfo);
            localStorage.setItem(`bookingHistory_${username}`, JSON.stringify(history));
            // Reset form
            form.reset();
        });
    }
}); 