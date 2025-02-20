function checkAccess() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user || user.role !== "student") {
    alert("You do not have permission to access this page.");
    window.location = "../../auth/login.html";
  }
}

function displayCoursework() {
  const courseworkList = document.getElementById("courseworkList");
  const coursework = JSON.parse(localStorage.getItem("coursework") || "[]");

  if (!coursework.length) {
    courseworkList.innerHTML = "<p>No coursework available.</p>";
    return;
  }

  courseworkList.innerHTML = coursework
    .map(
      (item, index) => `
      <div class='coursework-item'>
        <h2>${item.courseTitle}</h2>
        <p>${item.description}</p>
        <p><strong>Submission Date:</strong> ${item.submissionDate}</p>
        ${item.fileName ? `<p><strong>File:</strong> ${item.fileName}</p>` : ""}
        <button class="submit-work" onclick="submitWork(${index})">Submit Work</button> 
      </div>
    `
    )
    .join("");
}

function submitWork(index) {
  const submission = prompt("Enter your submission.");
  if (submission) {
    const coursework = JSON.parse(localStorage.getItem("coursework") || "[]");

    if (!coursework[index].submissions) {
      coursework[index].submissions = [];
    }

    coursework[index].submissions.push({
      studentId: JSON.parse(sessionStorage.getItem("user")).id,
      submission: submission,
      date: new Date().toISOString(),
    });

    localStorage.setItem("coursework", JSON.stringify(coursework));
    alert("Work submitted successfully");
    displayCoursework();
  }
}

window.onload = function () {
  checkAccess();
  displayCoursework();
};
