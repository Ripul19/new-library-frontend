const API_BASE_URL = 'https://new-library-backend.vercel.app'; 

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value; 


    // console.log(`${API_BASE_URL}/api/users/register`);

    fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, role })
    })
    .then(response => response.json())
    .then(data => {
            alert('Sign up successful!');
            window.location.href = 'login.html';
    })
    .catch(err => {
        console.error('Error during sign up:', err);
        alert('An error occurred. Please try again later.');
    });
});
