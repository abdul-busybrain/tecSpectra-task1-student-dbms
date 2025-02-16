let students = JSON.parse(localStorage.getItem("students")) || [];

// Function to add a new student
function addStudent() {
  const name = document.getElementById("studentName").value;
  const id = document.getElementById("studentId").value;
  const studentClass = document.getElementById("studentClass").value;
  const grade = document.getElementById("studentGrade").value;

  if (name && id && studentClass && grade) {
    const student = { name, id, class: studentClass, grade };
    students.push(student);
    saveToLocalStorage();
    renderTable();
    clearForm();
  } else {
    alert("Please fill all the fields");
  }
}

// Fuction to render the table
function renderTable(studentData = students) {
  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";

  studentData.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.class}</td>
        <td>${student.grade}</td>
        <td class="actions">
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">
        Delete
        </button>
        </td>
        `;
    tbody.appendChild(row);
  });
}

// Function to delete a student
function deleteStudent(index) {
  students.splice(index, 1);
  saveToLocalStorage();
  renderTable();
}

// Function to edit a student
function editStudent(index) {
  const student = students[index];
  document.getElementById("studentName").value = student.name;
  document.getElementById("studentId").value = student.id;
  document.getElementById("studentClass").value = student.class;
  document.getElementById("studentGrade").value = student.grade;

  // Remove the student from the list
  deleteStudent(index);
}

// Function to search students
function searchStudent() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.id.toLowerCase().includes(searchTerm)
  );
  renderTable(filteredStudents);
}

// Function to clear the form
function clearForm() {
  document.getElementById("studentName").value = "";
  document.getElementById("studentId").value = "";
  document.getElementById("studentClass").value = "";
  document.getElementById("studentGrade").value = "";
}

// Function to save students to local storage
function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

renderTable();
