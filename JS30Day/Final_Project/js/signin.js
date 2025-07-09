//  Hàm xử lý đăng nhập khi người dùng nhấn nút "Sign In"
function handleSignIn() {
    // Lấy giá trị từ các input
    const email = document.getElementById("signin-email").value.trim();      
    const pass = document.getElementById("signin-password").value;           
    const msg = document.getElementById("signin-message");                  
    const remember = document.getElementById("remember-me").checked;         

    // Lấy mật khẩu đã đăng ký tương ứng với email từ localStorage
    const storedPass = localStorage.getItem(email);

    // Kiểm tra xem tài khoản có tồn tại và mật khẩu có đúng không
    if (!storedPass || storedPass !== pass) {
        msg.textContent = " Tài khoản hoặc mật khẩu sai!";
        return; // Dừng lại nếu thông tin không đúng
    }

    // Nếu người dùng tích "Remember me"
    if (remember) {
        localStorage.setItem("rememberEmail", email);    // Lưu lại email
        localStorage.setItem("rememberPassword", pass);  // Lưu lại mật khẩu
    } else {
    // Nếu không tích → xóa thông tin ghi nhớ
        localStorage.removeItem("rememberEmail");
        localStorage.removeItem("rememberPassword");
    }

    // Lưu trạng thái đăng nhập (đồng bộ với các file khác)
    localStorage.setItem("userLoggedIn", email);

    // Hiển thị thông báo đăng nhập thành công
    msg.style.color = "lightgreen";
    msg.textContent = " Đăng nhập thành công! Đang chuyển...";

    // Kiểm tra xem có cần chuyển hướng đến trang checkout không
    const redirectTo = localStorage.getItem("redirectAfterLogin");
    let targetPage = "home.html"; // Trang mặc định (đường dẫn tương đối)
    
    if (redirectTo) {
        // Nếu có thông tin chuyển hướng, sử dụng nó
        targetPage = redirectTo;
        localStorage.removeItem("redirectAfterLogin"); // Xóa thông tin chuyển hướng
    }

    // Sau 2 giây, chuyển sang trang đích
    setTimeout(() => {
        window.location.href = targetPage;
    }, 2000);
}
