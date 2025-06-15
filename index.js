document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(signupForm, studentsTable);
        });
    }
});

function handleFormSubmission(form, tableBody) {
    const formData = new FormData(form);
    const studentData = {
        studentId: formData.get('studentId'),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        department: formData.get('department'),
        phone: formData.get('phone'),
        year: formData.get('year'),
        interests: formData.get('interests'),
        joinDate: new Date().toISOString().split('T')[0]
    };
    
    setTimeout(() => {
        addStudentToTable(studentData, tableBody);
        form.reset();
        document.getElementById('recent-students').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }, 1500);
}

function addStudentToTable(studentData, tableBody) {
    const row = tableBody.insertRow(0);
    row.classList.add('fade-in');
    const cells = [
        studentData.studentId,
        studentData.fullName,
        studentData.department,
        studentData.email,
        studentData.joinDate
    ];
    cells.forEach(cellData => {
        const cell = row.insertCell();
        cell.textContent = cellData;
    });
    
    row.style.backgroundColor = '#dcfce7';
    setTimeout(() => {
        row.style.backgroundColor = '';
    }, 3000);
}