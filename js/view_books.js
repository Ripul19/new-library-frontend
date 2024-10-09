const API_BASE_URL = 'https://new-library-backend.vercel.app'; 

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        alert('You need to log in first!');
        window.location.href = 'login.html';
        return;
    }

    if (role === 'LIBRARIAN') {
        document.getElementById('addBookContainer').style.display = 'block';
        document.getElementById('addBookBtn').addEventListener('click', () => {
            window.location.href = 'add_books.html'; 
        });
    }

    //API
    fetch(`${API_BASE_URL}/api/books/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';  
        
        data.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.dataset.bookId = book.id;  

            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Published Year:</strong> ${book.publishedYear}</p>
            `;
            
            bookItem.addEventListener('click', function() {
                const bookId = this.dataset.bookId;
                window.location.href = `book_details.html?id=${bookId}`;
            });

            bookList.appendChild(bookItem);
        });
    })
    .catch(err => {
        console.error('Error fetching books:', err);
        alert('Error loading books. Please try again later.');
    });
});
