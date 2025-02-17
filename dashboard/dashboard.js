function checkAccess(allowedRoles) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
    alert("You need to log in to access this page.");
    window.location = "../auth/loginPage.html";
    return;
  }

  // Check if the user has a valid role
  const validRoles = ["admin", "teacher", "student"];
  if (!validRoles.includes(user.role)) {
    alert("You do not have permission to access this page.");
  }
  if (!user || !allowedRoles.includes(user.role)) {
    alert("You do not have permission to access this page.");
    window.location = "../auth/loginPage.html";
    return;
  }

  // Conditions to set-up role-specific content
  if (user.role === "admin") {
    // Show admin-specific content
  } else if (user.role === "teacher") {
    // Show teacher-specific content
  } else if (user.role === "student") {
    // Show student-specific content
  }
}

checkAccess();
