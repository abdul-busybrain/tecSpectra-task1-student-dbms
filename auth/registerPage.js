document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { fullName, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert(`${fullName} your ${role} account has been created successfully`);
    window.location.href = "./loginPage.html";
  });
