const API_BASE_URL = 'https://new-library-backend.vercel.app';

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('id');

    const role = localStorage.getItem('role');
    if (role !== 'LIBRARIAN') {
        alert('Access denied. Only librarians can view members.');
        localStorage.clear();
        window.location.href = 'login.html';
        return;
    }

    if (!token || !memberId) {
        alert('You need to log in and select a member to view details.');
        localStorage.clear();
        window.location.href = 'login.html';
        return;
    }

    fetchMemberDetails(memberId, token);

    document.getElementById('deleteMemberBtn').addEventListener('click', () => deleteMember(memberId, token));
});


function fetchMemberDetails(memberId, token) {
    fetch(`${API_BASE_URL}/api/users/member/${memberId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {

        const memberDetails = document.getElementById('memberDetails');
        memberDetails.innerHTML = `
            <p>Name: ${data.user.username}</p>
            <p>Email: ${data.user.email}</p>
            <p>Status: ${data.user.status}</p>
        `;

        if(data.user.status === 'INACTIVE') document.getElementById('deleteMemberBtn').style.display = 'none';

        const borrowHistory = document.getElementById('borrowHistory');
        borrowHistory.innerHTML = '';

        if (data.user.borrowHistory.length === 0) {
            borrowHistory.innerHTML = '<p>No borrow history available.</p>';
        } else {
            data.user.borrowHistory.forEach(item => {
                borrowHistory.innerHTML += `
                    <div class="borrow-item">
                        <p>Book Title: ${item.book.title}</p>
                        <p>Author: ${item.book.author}</p>
                        <p>Borrowed On: ${new Date(item.borrowDate).toLocaleDateString()}</p>
                        <p>Returned On: ${item.returnDate ? new Date(item.returnDate).toLocaleDateString() : 'Not Returned'}</p>
                        <p>Status: ${item.status}</p>
                    </div>
                `;
            });
        }
    })
    .catch(err => {
        console.error('Error fetching member details:', err);
        alert('Error loading member details. Please try again later.');
    });
}


function deleteMember(memberId, token) {
    const url = `${API_BASE_URL}/api/users/delete/${memberId}`; 

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Member deleted successfully.');
            window.location.href = 'view_members.html'; 
        } else {
            alert('Failed to delete the member. Please try again.');
        }
    })
    .catch(err => {
        console.error('Error deleting member:', err);
        alert('Error deleting member. Please try again later.');
    });
}
