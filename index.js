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
    
    // Validate required fields
    if (!studentData.studentId || !studentData.fullName || !studentData.email || !studentData.department) {
        showMessage('Please fill in all required fields!', 'error');
        return;
    }
    
    // Check if student ID already exists
    if (isStudentIdExists(studentData.studentId, tableBody)) {
        showMessage('Student ID already exists!', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Add student to table
        addStudentToTable(studentData, tableBody);
        
        // Show success message
        showMessage('Registration successful! Welcome to PUCPC!', 'success');
        
        // Reset form
        form.reset();
        
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Scroll to recent students section
        document.getElementById('recent-students').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }, 1500);
}

// Check if Student ID exists
function isStudentIdExists(studentId, tableBody) {
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const firstCell = rows[i].getElementsByTagName('td')[0];
        if (firstCell && firstCell.textContent === studentId) {
            return true;
        }
    }
    return false;
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

// Show Messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    
    // Style based on type
    if (type === 'success') {
        messageDiv.style.cssText = `
            background: #dcfce7;
            color: #166534;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #bbf7d0;
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            max-width: 300px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        `;
    } else {
        messageDiv.style.cssText = `
            background: #fef2f2;
            color: #dc2626;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #fecaca;
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            max-width: 300px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        `;
    }
    
    // Add to document
    document.body.appendChild(messageDiv);
    
    // Animate in
    messageDiv.style.transform = 'translateX(100%)';
    setTimeout(() => {
        messageDiv.style.transition = 'transform 0.3s ease';
        messageDiv.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 5000);
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

// Form Validation Setup
function setupFormValidation() {
    const form = document.getElementById('signupForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
    
    // Email format validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail(this);
        });
    }
    
    // Student ID format validation
    const studentIdInput = document.getElementById('studentId');
    if (studentIdInput) {
        studentIdInput.addEventListener('input', function() {
            validateStudentId(this);
        });
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
}

// Validate Individual Field
function validateField(field) {
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('valid', 'invalid');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        field.classList.add('invalid');
        return false;
    }
    
    // Field is valid
    if (value) {
        field.classList.add('valid');
    }
    
    return true;
}

// Validate Email Format
function validateEmail(emailField) {
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    emailField.classList.remove('valid', 'invalid');
    
    if (email) {
        if (emailRegex.test(email)) {
            emailField.classList.add('valid');
        } else {
            emailField.classList.add('invalid');
        }
    }
}

// Validate Student ID Format
function validateStudentId(studentIdField) {
    const studentId = studentIdField.value.trim();
    // Format: ABC-YYYY-NNN (e.g., CSE-2021-001)
    const studentIdRegex = /^[A-Z]{3}-\d{4}-\d{3}$/;
    
    studentIdField.classList.remove('valid', 'invalid');
    
    if (studentId) {
        if (studentIdRegex.test(studentId)) {
            studentIdField.classList.add('valid');
        } else {
            studentIdField.classList.add('invalid');
            // Auto-format if partially correct
            const formatted = formatStudentId(studentId);
            if (formatted !== studentId) {
                studentIdField.value = formatted;
            }
        }
    }
}

// Format Student ID
function formatStudentId(value) {
    // Remove any non-alphanumeric characters except hyphens
    let formatted = value.replace(/[^A-Za-z0-9-]/g, '').toUpperCase();
    
    // Add hyphens at appropriate positions
    if (formatted.length > 3 && formatted.charAt(3) !== '-') {
        formatted = formatted.substring(0, 3) + '-' + formatted.substring(3);
    }
    if (formatted.length > 8 && formatted.charAt(8) !== '-') {
        formatted = formatted.substring(0, 8) + '-' + formatted.substring(8);
    }
    
    // Limit length
    if (formatted.length > 12) {
        formatted = formatted.substring(0, 12);
    }
    
    return formatted;
}

// Format Phone Number
function formatPhoneNumber(phoneField) {
    let value = phoneField.value.replace(/\D/g, ''); // Remove non-digits
    
    // Bangladesh phone number format: +880XXXXXXXXX
    if (value.length > 0) {
        if (value.startsWith('880')) {
            value = '+' + value;
        } else if (value.startsWith('0')) {
            value = '+880' + value.substring(1);
        } else if (value.length === 11 && value.startsWith('1')) {
            value = '+880' + value;
        }
    }
    
    phoneField.value = value;
}

// Utility Functions
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function generateStudentId(department) {
    const year = new Date().getFullYear();
    const deptCode = department.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(Math.random() * 999) + 1;
    return `${deptCode}-${year}-${randomNum.toString().padStart(3, '0')}`;
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
    // Add click effect to cards
    const cards = document.querySelectorAll('.card, .member-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
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
