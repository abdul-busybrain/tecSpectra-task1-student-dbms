document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Store the logged-in user in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(user));

    // Redirect to dashboard
    window.location.href = "../dashboard/index.html";
  } else {
    alert("Invalid username or password");
  }
});
