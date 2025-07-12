function validateEmail(email) {
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
        return;
    }
    if (password.length < 6) {
        msg.textContent = "Mật khẩu phải ít nhất 6 ký tự.";
        return;
    }
    if (password !== confirm) {
        msg.textContent = "Mật khẩu xác nhận không khớp.";
        return;
    }
    if (localStorage.getItem(email)) {
        msg.textContent = " Tài khoản đã tồn tại.";
        return;
    }

    localStorage.setItem(email, password);

    alert(" Chúc mừng bạn đã đăng kí thành công!");

    window.location.href = "SignIn.html";
}

