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

function clickLoginBtn() {
    const password = document.querySelector("#invateCode");     

    if (!password.value.trim()) {
        password.reportValidity();
        return;
    }

    // 서버로 로그인 요청 (POST)
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ password: password.value.trim() })
    })
    .then(res => {
        if (res.redirected) {
            window.location.href = res.url;
        } else {
            return res.text();
        }
    })
    .then(data => {
        if (data) alert(data); // 실패 메시지
    })
    .catch(err => console.error("로그인 요청 에러:", err));    
}