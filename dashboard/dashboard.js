function checkAccess() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
    alert("You need to log in to access this page.");
    window.location = "../auth/login.html";
    return;
  }

  const validRoles = ["admin", "teacher", "student"];
  if (!validRoles.includes(user.role)) {
    alert("You do not have permission to access this page.");
    window.location = "../auth/login.html";
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
        <li><a href='./dashboard.html'>Dashboard</a></li>
        <li><a href='../manage/students/students.html'>Manage Users</a></li>
        <li><a href='../manage/students/students.html'>Manage Students</a></li>
        <li><a href='../manage/courses/courses.html'>Manage Courses</a></li>
        <li><a href='../auth/logout.html'>Logout</a></li>
      `;
    } else if (role === "teacher") {
      links = `
        <li><a href='./index.html'>Dashboard</a></li>
        <li><a href='../coursework/upload/uploadCoursework.html'>Upload Coursework</a></li>
        <li><a href='../coursework/grade/gradeCoursework.html'>Grade Coursework</a></li>
        <li><a href='../auth/logout.html'>Logout</a></li>
      `;
    } else if (role === "student") {
      links = `
        <li><a href='./index.html'>Dashboard</a></li>
        <li><a href='../coursework/view/viewCoursework.html'>View Coursework</a></li>
        <li><a href='../auth/logout.html'>Logout</a></li>
      `;
    }

    navbar.innerHTML = `<ul>${links}</ul>`;
  } else {
    navbar.innerHTML = `
      <ul>
        <li><a href="../auth/login.html">Login</a></li>
        <li><a href="../auth/register.html">Register</a></li>
      </ul>
    `;
  }
}

function setupRoleSpecificContent(role) {
  const contentDiv = document.getElementById("role-specific-content");

  let content = "";
  switch (role) {
    case "admin":
      content = `
        <h2>Admin Dashboard</h2>
        <p>Welcome, Administrator. Here are your options:</p>
        <ul>
          <li><a href='../manage/students/students.html'>Manage Students</a></li>
          <li><a href='../manage/courses/courses.html'>Manage Courses</a></li>
          <li><a href='../reports/reports.html'>View Reports</a></li>
        </ul>
      `;
      break;
    case "teacher":
      content = `
        <h2>Teacher Dashboard</h2>
        <p>You have access to manage your courses, view students submissions, and interact with your students.</p>
        <ul>
          <li><a href='../coursework/upload/uploadCoursework.html'>Upload Coursework</a></li>
          <li><a href='../coursework/grade/gradeCoursework.html'>Grade Coursework</a></li>
          <li><a href='../communication/teacherChat.html'>Communicate with Students</a></li>
        </ul>
      `;
      break;
    case "student":
      content = `
        <h2>Student Dashboard</h2>
        <p>Welcome, Student. Here are your options:</p>
        <ul>
          <li><a href='../coursework/view/viewCoursework.html'>View Coursework</a></li>
          <li><a href='../coursework/submit/submitCoursework.html'>Submit Assignments</a></li>
          <li><a href='../grades/grades.html'>Check Grades</a></li>
        </ul>
      `;
      break;
  }

  contentDiv.innerHTML = content;
}

window.onload = checkAccess;
