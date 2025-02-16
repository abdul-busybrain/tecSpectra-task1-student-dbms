function checkAccess(allowedRoles) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user || !allowedRoles.includes(user.role)) {
    alert("You do not have permission to access this page.");
    window.location = "../auth/loginPage.html";
  }
}

checkAccess(["admin"]);
checkAccess(["teacher"]);
checkAccess(["student"]);
