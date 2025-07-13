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

    // Lấy username từ localStorage
    const username = localStorage.getItem("userLoggedIn") || "guest";

    if (successPopup) successPopup.style.display = 'none';

    // Thiết lập ngày tối thiểu là hôm nay
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) {
        dateInput.min = today;
        dateInput.max = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }

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

    function isValidTime(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours >= 8 && hours <= 20; // Giờ mở cửa từ 8h đến 20h
    }

    function isValidName(name) {
        return name.length >= 2 && name.length <= 50;
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
            const note = noteInput.value.trim();

            // Validation
            if (!name || !phone || !email || !date || !time || !guest || !area) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
                return;
            }
            
            if (!isValidName(name)) {
                alert('Tên phải có từ 2-50 ký tự!');
                nameInput.focus();
                return;
            }
            
            if (!isValidPhone(phone)) {
                alert('Số điện thoại không hợp lệ! (9-11 số)');
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

            if (!isValidTime(time)) {
                alert('Giờ đặt bàn phải trong khoảng 8:00 - 20:00!');
                timeInput.focus();
                return;
            }

            // Tạo object booking
            const bookingInfo = {
                id: Date.now(),
                name: name,
                phone: phone,
                email: email,
                date: date,
                time: time,
                guest: guest,
                area: area,
                note: note,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            // Lưu booking vào localStorage
            const bookingHistoryKey = `bookingHistory_${username}`;
            const bookingHistory = JSON.parse(localStorage.getItem(bookingHistoryKey)) || [];
            bookingHistory.push(bookingInfo);
            localStorage.setItem(bookingHistoryKey, JSON.stringify(bookingHistory));

            // Lưu booking gần nhất
            localStorage.setItem(`bookingLatest_${username}`, JSON.stringify(bookingInfo));

            // Hiển thị thông báo thành công
            if (successPopup) {
                successPopup.style.display = 'block';
                successPopup.innerHTML = '<i class="fa-solid fa-check"></i> Đặt bàn thành công! Chúng tôi sẽ liên hệ sớm.';
                setTimeout(() => {
                    successPopup.style.display = 'none';
                }, 3000);
            }

            // Reset form
            form.reset();
            
            // Reset ngày tối thiểu
            if (dateInput) {
                dateInput.min = today;
            }

            // Hiệu ứng button
            const submitBtn = form.querySelector('.btn-reservation');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã đặt bàn!';
            submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #b08968 0%, #d19151 100%)';
                submitBtn.disabled = false;
            }, 2000);

            console.log('Đặt bàn thành công:', bookingInfo);
        });
    }

    // Cập nhật cart badge
    function updateCartBadge() {
        const cartKey = `cart_${username}`;
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        const badge = document.getElementById('cart-badge');
        if (badge) {
            badge.textContent = totalQuantity;
        }
    }

    updateCartBadge();
}); 