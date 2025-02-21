let courses = JSON.parse(localStorage.getItem("courses")) || [];

function renderCourses() {
  const tableBody = document.getElementById("courseTable");
  tableBody.innerHTML = "";

  courses.forEach((course, index) => {
    tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${course.name}</td>
                <td>${course.description}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editCourse(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteCourse(${index})">Delete</button>
                </td>
            </tr>
        `;
  });

  localStorage.setItem("courses", JSON.stringify(courses));
}

function addCourse() {
  const name = document.getElementById("courseName").value.trim();
  const description = document.getElementById("courseDescription").value.trim();

  if (!name || !description) {
    alert("Please fill in all fields!");
    return;
  }

  courses.push({ name, description });
  document.getElementById("courseName").value = "";
  document.getElementById("courseDescription").value = "";
  renderCourses();
}

function editCourse(index) {
  const newName = prompt("Enter new course name:", courses[index].name);
  const newDescription = prompt(
    "Enter new course description:",
    courses[index].description
  );

  if (newName !== null && newDescription !== null) {
    courses[index].name = newName.trim();
    courses[index].description = newDescription.trim();
    renderCourses();
  }
}

function deleteCourse(index) {
  if (confirm("Are you sure you want to delete this course?")) {
    courses.splice(index, 1);
    renderCourses();
  }
}

function searchCourses() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm)
  );

  const tableBody = document.getElementById("courseTable");
  tableBody.innerHTML = "";

  filteredCourses.forEach((course, index) => {
    tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${course.name}</td>
                <td>${course.description}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editCourse(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteCourse(${index})">Delete</button>
                </td>
            </tr>
        `;
  });
}

window.onload = renderCourses;
