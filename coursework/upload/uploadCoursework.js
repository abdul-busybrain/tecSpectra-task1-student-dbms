function checkAccess() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user || user.role !== "teacher") {
    alert("You do not have permission to access this page");
    window.location = "../../auth/loginPage.html";
  }
}

function uploadCoursework(event) {
  event.preventDefault();

  const courseTitle = document.getElementById("courseTitle").value;
  const description = document.getElementById("description").value;
  const submissionDate = document.getElementById("submissionDate").value;
  const file = document.getElementById("file").files[0];

  //   The data will be typically sent to the server
  // For now, we'll just store it in localStorage
  const coursework = JSON.parse(localStorage.getItem("coursework" || "[]"));
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
