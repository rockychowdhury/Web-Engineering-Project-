// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Set up form handling
    setupFormHandling();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
    
    // Set up animations
    setupAnimations();
    
    // Set up form validation
    setupFormValidation();
    
    console.log('PUCPC Portal initialized successfully!');
}

// Form Handling
function setupFormHandling() {
    const signupForm = document.getElementById('signupForm');
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(signupForm, studentsTable);
        });
    }
}

// Handle Form Submission
function handleFormSubmission(form, tableBody) {
    // Get form data
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
    
    
    // Simulate API call delay
    setTimeout(() => {
        // Add student to table
        addStudentToTable(studentData, tableBody);
        
        // Reset form
        form.reset();
        
        // Scroll to recent students section
        document.getElementById('recent-students').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }, 1500);
}



// Add Student to Table
function addStudentToTable(studentData, tableBody) {
    const row = tableBody.insertRow(0); // Insert at the beginning
    row.classList.add('fade-in');
    
    // Create cells
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
    
    // Highlight the new row
    row.style.backgroundColor = '#dcfce7';
    setTimeout(() => {
        row.style.backgroundColor = '';
    }, 3000);
}


// Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation Setup
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.card, .member-card, .course-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}
// Utility Functions
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}
// Add some sample data on page load
function addSampleData() {
    const tableBody = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    
    // Sample student data
    const sampleStudents = [
        {
            studentId: 'BBA-2023-012',
            fullName: 'Sadia Karim',
            department: 'Business Administration',
            email: 'sadia.karim@student.pu.edu.bd',
            joinDate: '2024-06-14'
        },
        {
            studentId: 'ENG-2022-045',
            fullName: 'Rashid Ahmed',
            department: 'English',
            email: 'rashid.ahmed@student.pu.edu.bd',
            joinDate: '2024-06-15'
        }
    ];
    
    // Add sample students to table
    sampleStudents.forEach(student => {
        setTimeout(() => {
            addStudentToTable(student, tableBody);
        }, Math.random() * 1000);
    });
}

// Initialize sample data after a short delay
setTimeout(addSampleData, 2000);

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {

    // Add hover effect to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8fafc';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

});