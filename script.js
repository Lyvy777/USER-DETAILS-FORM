document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const comments = document.getElementById('comments').value.trim();

    let isValid = true;
    let errorMessage = '';

    if (!fullName) {
        isValid = false;
        errorMessage += 'Full Name is required.\n';
    }
    if (!email) {
        isValid = false;
        errorMessage += 'Email Address is required.\n';
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
    }
    if (!phone) {
        isValid = false;
        errorMessage += 'Phone Number is required.\n';
    }
    if (!gender) {
        isValid = false;
        errorMessage += 'Gender is required.\n';
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }

    const formData = {
        fullName: fullName,
        email: email,
        phone: phone,
        gender: gender.value,
        comments: comments
    };

    fetch('https://example.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Submission failed');
        }
        return response.json();
    })
    .then(data => {
        displayResult(formData, 'Form submitted successfully!');
    })
    .catch(error => {
        displayResult(formData, 'Form submitted successfully! (Simulated)');
    });
});

function displayResult(data, message) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h2>${message}</h2>
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Email Address:</strong> ${data.email}</p>
        <p><strong>Phone Number:</strong> ${data.phone}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Comments:</strong> ${data.comments || 'None'}</p>
    `;
}