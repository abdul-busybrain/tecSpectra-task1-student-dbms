function checkAccess() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user || user.role !== "teacher") {
    alert("You do not have permission to access this page");
    window.location = "../../auth/login.html";
  }
}

function uploadCoursework(event) {
  event.preventDefault();

  const courseTitle = document.getElementById("courseTitle").value;
  const description = document.getElementById("description").value;
  const submissionDate = document.getElementById("submissionDate").value;
  const fileInput = document.getElementById("file");

  if (!fileInput.files.length) {
    alert("Please select a file to upload!");
    return;
  }

  const file = fileInput.files[0];

  // The data will be typically sent to the server
  // For now, we'll just store it in localStorage
  const coursework = JSON.parse(localStorage.getItem("coursework") || "[]");
  coursework.push({
    courseTitle,
    description,
    submissionDate,
    fileName: file ? file.name : null,
  });

  localStorage.setItem("coursework", JSON.stringify(coursework));

  alert("Coursework uploaded successfully!");
  document.getElementById("uploadForm").reset();
}

window.onload = function () {
  checkAccess();
  document
    .getElementById("uploadForm")
    .addEventListener("submit", uploadCoursework);
};
