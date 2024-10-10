const API_BASE_URL = 'https://new-library-backend.vercel.app'; 

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'LIBRARIAN') {
        alert('Access denied. Only librarians can view members.');
        localStorage.clear();
        window.location.href = 'login.html';
        return;
    }
});

const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
        alert('You need to log in first!');
        window.location.href = 'login.html';
        return;
    }

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    // API call
    fetch(`${API_BASE_URL}/api/books/add`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Book added successfully!');
            window.location.href = 'view_books.html';
        } else {
            alert('Failed to add book.');
        }
    })
    .catch(err => {
        console.error('Error adding book:', err);
        alert('An error occurred. Please try again later.');
    });
});
