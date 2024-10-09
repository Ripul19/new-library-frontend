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

document.getElementById('updateBookForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    // const bookId = document.getElementById('bookId').value;
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id'); 
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You need to log in first!');
        window.location.href = 'login.html';
        return;
    }

    // API
    fetch(`${API_BASE_URL}/api/books/update/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, author })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Book updated successfully!');
            window.location.href = 'view_books.html';
        } else {
            alert('Failed to update book.');
        }
    })
    .catch(err => {
        console.error('Error updating book:', err);
        alert('An error occurred. Please try again later.');
    });
});
