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

    fetchMembers('active');

    document.getElementById('activeMembersBtn').addEventListener('click', function() {
        toggleActiveButton('active');
        fetchMembers('active');
    });

    document.getElementById('inactiveMembersBtn').addEventListener('click', function() {
        toggleActiveButton('deleted');
        fetchMembers('deleted');
    });
});

//fetch members
function fetchMembers(status) {
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/api/users/${status}Members`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const membersList = document.getElementById('membersList');
        membersList.innerHTML = '<ul>';

        if (data.members.length === 0) membersList.innerHTML = '<p>No members to display.</p>';

        else {
            data.members.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.className = 'member';
                memberDiv.innerHTML = `
                    <p>${member.username} (${member.email}) - ${member.status}</p>
                `;
                memberDiv.addEventListener('click', function() {
                    window.location.href = `member_detail.html?id=${member.id}`;
                });
                membersList.appendChild(memberDiv);

            });
        }
    })
    .catch(err => {
        console.error(`Error fetching ${status} members:`, err);
        alert(`Error loading ${status} members. Please try again later.`);
    });
}


function toggleActiveButton(status) {
    const activeBtn = document.getElementById('activeMembersBtn');
    const inactiveBtn = document.getElementById('inactiveMembersBtn');

    if (status === 'active') {
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
    } else {
        inactiveBtn.classList.add('active');
        activeBtn.classList.remove('active');
    }
}
