document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users") || []);
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.href = "../dashboard/dashboard.html";
  } else {
    alert("Invalid username or password");
  }
});
