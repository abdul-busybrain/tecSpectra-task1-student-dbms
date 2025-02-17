document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Email", email);
  console.log("Password", password);

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  console.log("Users from localStorage", users);

  const user = users.find((u) => u.email === email && u.password === password);

  console.log("User found:", user);

  if (user) {
    // Store the logged-in user in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(user));
    console.log("User stored in sessionStorage", user);

    // Redirect to dashboard
    window.location.href = "../dashboard/index.html";
  } else {
    alert("Invalid username or password");
  }
});
