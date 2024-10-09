const API_BASE_URL = 'https://new-library-backend.vercel.app'; 

document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadSettings();
});


function loadSettings() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        alert('You need to log in first!');
        window.location.href = 'login.html';
        return;
    }

    fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const settingsContent = document.getElementById('settingsContent');
        const user = data.user;
        
        settingsContent.innerHTML = `
            <h2>Profile Settings</h2>
            <p>Name: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Role: ${user.role}</p>
        `;
        
        settingsContent.innerHTML += `
            <button id="deleteAccountBtn">Delete Account</button>
            <h3>Borrow History</h3>
            <div id="borrowHistory"></div>
        `;
        document.getElementById('deleteAccountBtn').addEventListener('click', () => deleteAccount());
        loadBorrowHistory(user.id);

        if (role === 'LIBRARIAN') {
            settingsContent.innerHTML += `
                <h3>Member Management</h3>
                <button id="viewMembersBtn">View Members</button>
            `;
            document.getElementById('viewMembersBtn').addEventListener('click', () => {
                window.location.href = 'view_members.html';
            });
        }
    })
    .catch(err => console.error('Error fetching user profile:', err));
}


function loadBorrowHistory(userId) {
    const token = localStorage.getItem('token');
    fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const borrowHistoryDiv = document.getElementById('borrowHistory');
        borrowHistoryDiv.innerHTML = '<ul>';
        data.user.borrowHistory.forEach(item => {
            let borrowDate = new Date(item.borrowDate);
            let returnDate = item.returnDate ? new Date(item.returnDate).toLocaleString() : 'Not returned yet';
            borrowHistoryDiv.innerHTML += `<li>${item.book.title} (Borrowed on: ${borrowDate.toLocaleString()})</li> (Returned on: ${returnDate})`;
        });
        borrowHistoryDiv.innerHTML += '</ul>';
    })
    .catch(err => console.error('Error fetching borrow history:', err));
}

// Delete account
function deleteAccount() {
    const token = localStorage.getItem('token');
    fetch(`${API_BASE_URL}/api/users/delete/self`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Account deleted successfully!');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = 'login.html';
        } else {
            alert('Failed to delete account.');
        }
    })
    .catch(err => console.error('Error deleting account:', err));
}
