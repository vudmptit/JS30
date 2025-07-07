window.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-container");
    const checkoutBtn = document.getElementById("checkout-btn"); // Lấy nút thanh toán

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
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
            checkoutBtn.style.display = 'none'; // Ẩn nút thanh toán nếu giỏ hàng trống
            return;
        } else {
            checkoutBtn.style.display = 'block'; // Hiển thị nút thanh toán nếu có sản phẩm
        }

        // Tạo bảng HTML
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
            const itemPrice = parseFloat(item.price.replace(/[^0-9]/g, '')) || 0; // Chỉ giữ lại số

            const formattedItemPrice = new Intl.NumberFormat('vi-VN', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(itemPrice);

            const totalItemPrice = itemPrice * quantity;

            const formattedTotalItemPrice = new Intl.NumberFormat('vi-VN', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(totalItemPrice);


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
                    <td>
                        <button class="remove-btn" data-index="${index}">Xóa</button>
                    </td>
                </tr>
            `;
        });

        const formattedTotalCartPrice = new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(totalCartPrice);


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

        // Add event listeners for buttons
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
    }

    // Event listener cho nút thanh toán
    checkoutBtn.addEventListener("click", () => {
        if (cart.length > 0) {
            // Hiển thị thông báo thanh toán thành công
            alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");

            // Xóa hết giỏ hàng
            cart = [];

            // Cập nhật localStorage và render lại giao diện giỏ hàng
            saveCart();
        } else {
            alert("Giỏ hàng của bạn đang trống!");
        }
    });

    renderCart();
});