window.addEventListener("DOMContentLoaded", () => {
    // Lấy tên người dùng đã đăng nhập
    const username = localStorage.getItem("userLoggedIn") || "guest";
    const cartKey = `cart_${username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    const container = document.getElementById("cart-container");
    const checkoutBtn = document.getElementById("checkout-btn");

    function updateCartBadgeShop() {
        const badge = document.getElementById('cart-badge');
        if (badge) {
            const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            badge.textContent = total;
            badge.classList.add('animate');
            setTimeout(() => badge.classList.remove('animate'), 400);
        }
    }

    function saveCart() {
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
        updateCartBadgeShop();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        saveCart();
    }

    function changeQuantity(index, delta) {
        cart[index].quantity = (cart[index].quantity || 1) + delta;
        if (cart[index].quantity <= 0) {
            removeItem(index);
        } else {
            saveCart();
        }
    }

    function renderCart() {
        if (cart.length === 0) {
            container.innerHTML = "<p>Chưa có sản phẩm nào trong giỏ hàng.</p>";
            checkoutBtn.style.display = 'none';
            return;
        } else {
            checkoutBtn.style.display = 'block';
        }

        let tableHTML = `
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Hình ảnh</th>
                        <th>Tên món</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng cộng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let totalCartPrice = 0;

        cart.forEach((item, index) => {
            const quantity = item.quantity || 1;
            const itemPrice = Number(item.price);

            const formattedItemPrice = new Intl.NumberFormat('vi-VN').format(itemPrice);
            const totalItemPrice = itemPrice * quantity;
            const formattedTotalItemPrice = new Intl.NumberFormat('vi-VN').format(totalItemPrice);

            totalCartPrice += totalItemPrice;

            tableHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td><img src="${item.img}" alt="${item.name}" class="cart-img"></td>
                    <td>${item.name}</td>
                    <td>${formattedItemPrice} VNĐ</td>
                    <td>
                        <button class="quantity-btn" data-index="${index}" data-delta="-1">-</button>
                        <span>${quantity}</span>
                        <button class="quantity-btn" data-index="${index}" data-delta="1">+</button>
                    </td>
                    <td>${formattedTotalItemPrice} VNĐ</td>
                    <td><button class="remove-btn" data-index="${index}">Xóa</button></td>
                </tr>
            `;
        });

        const formattedTotalCartPrice = new Intl.NumberFormat('vi-VN').format(totalCartPrice);

        tableHTML += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5">Tổng tiền giỏ hàng:</td>
                        <td>${formattedTotalCartPrice} VNĐ</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        `;

        container.innerHTML = tableHTML;

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                removeItem(index);
            });
        });

        document.querySelectorAll(".quantity-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = parseInt(event.target.dataset.index);
                const delta = parseInt(event.target.dataset.delta);
                changeQuantity(index, delta);
            });
        });

        updateCartBadgeShop();
    }

    // Chỉnh sửa: Chuyển hướng đến trang checkout 
    checkoutBtn.addEventListener("click", () => {
        if (cart.length > 0) {
            // Kiểm tra đăng nhập trước khi thanh toán
            if (username === "guest") {
                // Lưu thông tin chuyển hướng để sau khi đăng nhập sẽ quay lại trang checkout
                localStorage.setItem("redirectAfterLogin", "checkout.html");
                alert("Bạn cần đăng nhập để thanh toán.");
                window.location.href = "SignIn.html";
                return;
            }
            // Chuyển hướng đến trang checkout
            window.location.href = "checkout.html";
        } else {
            alert("Giỏ hàng của bạn đang trống!");
        }
    });

    renderCart();
    updateCartBadgeShop();

    // Hiển thị thông tin đặt bàn mới nhất nếu có (theo user)
    const latestBookingDiv = document.getElementById('latest-booking');
    const latestBooking = localStorage.getItem(`bookingLatest_${username}`);
    if (latestBookingDiv && latestBooking) {
        const info = JSON.parse(latestBooking);
        latestBookingDiv.innerHTML = `
            <div class="booking-latest-box">
                <h2>Đặt bàn gần nhất của bạn</h2>
                <ul class="booking-info-list">
                    <li><strong>Họ tên:</strong> ${info.name}</li>
                    <li><strong>Số điện thoại:</strong> ${info.phone}</li>
                    <li><strong>Email:</strong> ${info.email}</li>
                    <li><strong>Ngày:</strong> ${info.date}</li>
                    <li><strong>Giờ:</strong> ${info.time}</li>
                    <li><strong>Số khách:</strong> ${info.guest}</li>
                    <li><strong>Khu vực:</strong> ${info.area}</li>
                </ul>
            </div>
        `;
    }
});
