function validateEmail(email) {
    // Hàm kiểm tra định dạng email hợp lệ bằng biểu thức chính quy (RegEx)
    // Mẫu này: ký tự chữ/số + @ + domain + . + phần mở rộng (vd: user@example.com)
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
function handleSignUp() {
    const email = document.getElementById("signup-email").value.trim();   
    const password = document.getElementById("signup-password").value;   
    const confirm = document.getElementById("signup-confirm").value;      
    const msg = document.getElementById("signup-message");                

    // Kiểm tra định dạng email hợp lệ
    if (!validateEmail(email)) {
        msg.textContent = "Email không đúng định dạng!";
        return; // Dừng nếu không đúng định dạng
    }

    //  Kiểm tra độ dài mật khẩu (tối thiểu 6 ký tự)
    if (password.length < 6) {
        msg.textContent = "Mật khẩu phải ít nhất 6 ký tự.";
        return;
    }

    //  Kiểm tra mật khẩu xác nhận có khớp không
    if (password !== confirm) {
        msg.textContent = "Mật khẩu xác nhận không khớp.";
        return;
    }

    //  Kiểm tra email đã tồn tại trong localStorage chưa
    if (localStorage.getItem(email)) {
        msg.textContent = " Tài khoản đã tồn tại.";
        return;
    }

    //  Lưu email và mật khẩu vào localStorage nếu hợp lệ
    localStorage.setItem(email, password);

    //  Hiển thị thông báo thành công
    alert(" Chúc mừng bạn đã đăng kí thành công!");

    //  Chuyển hướng sang trang đăng nhập
    window.location.href = "SignIn.html";
}

function handleSignIn() {
    const btn = document.querySelector(".btn");
    btn.classList.add("loading");

    // xử lý...

    setTimeout(() => {
        btn.classList.remove("loading");
    }, 2000);
}

