document.getElementById("studentBtn").onclick = function () {
 window.location.href = "student";
};

document.getElementById("companyBtn").onclick = function () {
  window.location.href = "company";
};
const sendCodeBtn = document.getElementById("sendCodeBtn");
const smsCode = document.getElementById("smsCode");
const loginBtn = document.getElementById("loginBtn");

if (sendCodeBtn) {
  sendCodeBtn.onclick = function () {
    smsCode.classList.remove("hidden");
    loginBtn.classList.remove("hidden");
  };
}

if (loginBtn) {
  loginBtn.onclick = function () {
    window.location.href = "ambassador.html";
  };
}
