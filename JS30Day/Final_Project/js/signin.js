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

    // Lưu trạng thái đăng nhập (để kiểm tra ở trang home)
    localStorage.setItem("loggedInUser", email);

    // Hiển thị thông báo đăng nhập thành công
    msg.style.color = "lightgreen";
    msg.textContent = " Đăng nhập thành công! Đang chuyển...";

    // Sau 2 giây, chuyển sang trang home
    setTimeout(() => {
        window.location.href = "/JS30Day/Final_Project/html/home.html";
    }, 2000);
}


    // function handleSignIn() {
    //     const btn = document.querySelector(".btn");
    //     btn.classList.add("loading");

    //     // xử lý...

    //     setTimeout(() => {
    //         btn.classList.remove("loading");
    //     }, 2000);
    // }
