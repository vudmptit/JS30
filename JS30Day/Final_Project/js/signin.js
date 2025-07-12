//  Hàm xử lý đăng nhập khi người dùng nhấn nút "Sign In"
function handleSignIn() {
    const email = document.getElementById("signin-email").value.trim();      
    const pass = document.getElementById("signin-password").value;           
    const msg = document.getElementById("signin-message");                  
    const remember = document.getElementById("remember-me").checked;         
    const storedPass = localStorage.getItem(email);

    if (!storedPass || storedPass !== pass) {
        msg.textContent = " Tài khoản hoặc mật khẩu sai!";
        return;
    }
    if (remember) {
        localStorage.setItem("rememberEmail", email);
        localStorage.setItem("rememberPassword", pass);
    } else {
        localStorage.removeItem("rememberEmail");
        localStorage.removeItem("rememberPassword");
    }

    localStorage.setItem("userLoggedIn", email);

    msg.style.color = "lightgreen";
    msg.textContent = " Đăng nhập thành công! Đang chuyển...";

    // Kiểm tra xem có cần chuyển hướng đến trang checkout không
    const redirectTo = localStorage.getItem("redirectAfterLogin");
    let targetPage = "home.html";
    
    if (redirectTo) {

        targetPage = redirectTo;
        localStorage.removeItem("redirectAfterLogin");
    }

    setTimeout(() => {
        window.location.href = targetPage;
    }, 2000);
}
