function clickTogglePw() {
    const togglePw = document.querySelector("#togglePassword");
    const inputPw = document.querySelector("#invateCode");
    const icons = togglePw.querySelector("i");

    const type = inputPw.type === "password" ? "text" : "password";
    inputPw.type = type;

    // 아이콘 토글
    icons.classList.toggle("bi-eye");
    icons.classList.toggle("bi-eye-slash");
}