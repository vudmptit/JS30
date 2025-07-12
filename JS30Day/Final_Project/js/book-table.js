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

    if (successPopup) successPopup.style.display = 'none';

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function isValidPhone(phone) {
        return /^\d{9,11}$/.test(phone);
    }
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
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const email = emailInput.value.trim();
            const date = dateInput.value;
            const time = timeInput.value;
            const guest = guestSelect.value;
            const area = areaSelect.value;
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

            if (successPopup) {
                successPopup.style.display = 'block';
                setTimeout(() => {
                    successPopup.style.display = 'none';
                }, 2500);
            }
            form.reset();
        });
    }
}); 