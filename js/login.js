const API_BASE_URL = 'https://new-library-backend.vercel.app'; 

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // console.log(`${API_BASE_URL}/api/users/login`);
    //API
    fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.userData.username);
            localStorage.setItem('role', data.userData.role);
            localStorage.setItem('id', data.userData.id);

            alert('Login successful!');
            window.location.href = 'view_books.html'; 
        } else {
            alert('Login failed. Please check your username and password.');
        }
    })
    .catch(err => {
        console.error('Error during login:', err);
        alert('An error occurred. Please try again later.');
    });
});
