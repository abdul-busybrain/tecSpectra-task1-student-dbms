function checkAccess() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
    alert("You need to log in to access this page.");
    window.location = "../auth/loginPage.html";
    return;
  }

  const validRoles = ["admin", "teacher", "student"];
  if (!validRoles.includes(user.role)) {
    alert("You do not have permission to access this page.");
    window.location = "../auth/loginPage.html";
    return;
  }

  updateNavbar();
  setupRoleSpecificContent(user.role);
}

function updateNavbar() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navbar = document.getElementById("navbar");

  if (user) {
    const role = user.role;
    let links = "";

    if (role === "admin") {
      links = `
              <li><a href='./dashboard.html'>My Dashboard</a></li>
              <li><a href='../manage/students/students.html'>Manage Students</a></li>
              <li><a href='../manage/courses/courses.html'>Manage Courses</a></li>
              <li><a href='../auth/logout.html'>Logout</a></li>
          `;
    } else if (role === "teacher") {
      links = `
              <li><a href='./index.html'>Dashboard</a></li>
              <li><a href='../coursework/upload/uploadCoursework.html'>Upload  Course Work</a></li>
              <li><a href='../auth/logout.html'>Logout</a></li>
          `;
    } else if (role === "student") {
      links = `
              <li><a href='./index.html'>Dashboard</a></li>
              <li><a href='../coursework/view/viewCoursework.html'>View Course Work</a></li>
              <li><a href='../auth/logout.html'>Logout</a></li>
          `;
    }

    navbar.innerHTML = `<ul>${links}</ul>`;
  } else {
    navbar.innerHTML = `
          <ul>
              <li><a href="../auth/loginPage.html">Login</a></li>
              <li><a href="../auth/registerPage.html">Register</a></li>
          </ul>
      `;
  }
}

function setupRoleSpecificContent(role) {
  const contentDiv = document.getElementById("role-specific-content");

  switch (role) {
    case "admin":
      contentDiv.innerHTML = `
              <h2>Admin Dashboard</h2>
              <p>Welcome, Administrator. Here are your options:</p>
              <ul>
                  <li>Manage Students</li>
                  <li>Manage Courses</li>
                  <li>View Reports</li>
              </ul>
          `;
      break;
    case "teacher":
      contentDiv.innerHTML = `
              <h2>Teacher Dashboard</h2>
              <p>Welcome, Teacher. Here are your options:</p>
              <ul>
                  <li>Manage Your Courses</li>
                  <li>Grade Assignments</li>
                  <li>Communicate with Students</li>
              </ul>
          `;
      break;
    case "student":
      contentDiv.innerHTML = `
              <h2>Student Dashboard</h2>
              <p>Welcome, Student. Here are your options:</p>
              <ul>
                  <li>View Your Courses</li>
                  <li>Submit Assignments</li>
                  <li>Check Grades</li>
              </ul>
          `;
      break;
  }
}

window.onload = checkAccess;
