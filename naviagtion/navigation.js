function updateNavbar() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navbar = document.getElementById("navbar");

  if (user) {
    const role = user.role;
    let links = "";

    if (role === "admin") {
      links = `
              <li><a href'./index.html'>My Dashboard</a></li>
              <li><a href'../manage/students.html'>Manage Students</a></li>
              <li><a href'../manage/courses.html'>Manage Courses</a></li>
              <li><a href'../auth/logout.html'>Logout</a></li>
              `;
    } else if (role === "student") {
      links`
          
          <li><a href'./index.html'>Dashboard</a></li>
          <li><a href'../coursework/index.html'>View Course Work</a></li>
          <li><a href'../auth/logout.html'></a></li>
          `;
    } else {
      links = `
          <li><a href="./login.html">Login</a></li>
          <li><a href="./register.html">Register</a></li>
        `;
    }
  }

  navbar.innerHTML = `<ul>${links}</ul>`;
}

window.onload = updateNavbar;
