const API_BASE_URL = 'https://new-library-backend.vercel.app'; 

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id'); 
    
    if (!bookId) {
        alert('Invalid book ID');
        window.location.href = 'viewBooks.html';  
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to log in first!');
        window.location.href = 'login.html';
        return;
    }

    //API
    fetch(`${API_BASE_URL}/api/books/${bookId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const bookDetails = document.getElementById('bookDetails');
        bookDetails.innerHTML = `
            <h2>${data.title}</h2>
            <p><strong>Author:</strong> ${data.author}</p>
        `;

        const role = localStorage.getItem('role');
        if (role === 'LIBRARIAN') {

            bookDetails.innerHTML += `
                <button id="updateBookBtn">Update Book</button>
                <button id="deleteBookBtn">Delete Book</button>
            `;
            
            document.getElementById('updateBookBtn').addEventListener('click', () => {
                window.location.href = `update_books.html?id=${bookId}`;
            });

            document.getElementById('deleteBookBtn').addEventListener('click', () => {

                fetch(`${API_BASE_URL}/api/books/delete/${bookId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (response.ok) {
                        alert('Book deleted successfully!');
                        window.location.href = 'view_books.html';
                    } else {
                        alert('Error deleting book');
                    }
                });
            });
        } else if (role === 'MEMBER') {

            bookDetails.innerHTML += `
                <button id="borrowBookBtn">Borrow Book</button>
                <button id="returnBookBtn">Return Book</button>
            `;

            document.getElementById('borrowBookBtn').addEventListener('click', () => borrowBook(bookId));

            document.getElementById('returnBookBtn').addEventListener('click', () => returnBook(bookId));
        }
    })
    .catch(err => {
        console.error('Error fetching book details:', err);
        alert('Error loading book details. Please try again later.');
    });
});

//borrow
function borrowBook(bookId) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    fetch(`${API_BASE_URL}/api/books/borrow/${bookId}/user/${userId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {

        if (data.status === 'BORROWED') {
            alert('Book borrowed successfully!');
            document.getElementById('borrowBookBtn').style.display = 'none';
            document.getElementById('returnBookBtn').style.display = 'inline';
        } else {
            alert('Failed to borrow book.');
        }
    })
    .catch(err => console.error('Error borrowing book:', err));
}

//return
function returnBook(bookId) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    fetch(`${API_BASE_URL}/api/books/return/${bookId}/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Book returned successfully!');
            window.location.href = 'view_books.html';
        } else {
            alert('Failed to delete book.');
        }
    })
    .catch(err => console.error('Error deleting book:', err));
}