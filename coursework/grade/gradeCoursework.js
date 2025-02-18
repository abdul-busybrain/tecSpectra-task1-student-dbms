function checkAccess() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user || user.role !== "teacher") {
    alert("You do not have permission to access this page.");
    window.location = "../../auth/loginPage.html";
  }
}

function displaySubmissions() {
  const submissionsList = document.getElementById("submissionsList");
  const coursework = JSON.parse(localStorage.getItem("coursework") || "[]");

  let submissionsHTML = "";
  coursework.forEach((course, courseIndex) => {
    if (course.submissions && course.submissions.length > 0) {
      submissionsHTML += `
                <h2>${course.courseTitle}</h2>
                ${course.submissions
                  .map(
                    (submission, submissionIndex) => `
                    <div class="submission-item">
                        <p>Student ID: ${submission.studentId}</p>
                        <p>Submission: ${submission.submission}</p>
                        <p>Date: ${new Date(
                          submission.date
                        ).toLocaleString()}</p>
                        <input type="number" class="grade-input" id="grade-${courseIndex}-${submissionIndex}" min="0" max="100" placeholder="Grade">
                        <button class="grade-button" onclick="gradeSubmission(${courseIndex}, ${submissionIndex})">Submit Grade</button>
                    </div>
                `
                  )
                  .join("")}
            `;
    }
  });

  submissionsList.innerHTML =
    submissionsHTML || "<p>No submissions to grade.</p>";
}

function gradeSubmission(courseIndex, submissionIndex) {
  const gradeInput = document.getElementById(
    `grade-${courseIndex}-${submissionIndex}`
  );
  const grade = gradeInput.value;

  if (grade && !isNaN(grade) && grade >= 0 && grade <= 100) {
    const coursework = JSON.parse(localStorage.getItem("coursework") || "[]");
    coursework[courseIndex].submissions[submissionIndex].grade = Number(grade);
    localStorage.setItem("coursework", JSON.stringify(coursework));
    alert("Grade submitted successfully!");
    displaySubmissions();
  } else {
    alert("Please enter a valid grade between 0 and 100.");
  }
}

window.onload = function () {
  checkAccess();
  displaySubmissions();
};
