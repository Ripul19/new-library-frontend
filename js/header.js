function loadHeader() {
    const headerContainer = document.getElementById('headerContainer');

    const headerHTML = `
        <header style="background-color: #333; padding: 10px;">
            <nav>
                <ul style="list-style-type: none; margin: 0; padding: 0; display: flex; justify-content: space-between; align-items: center;">
                    <li style="display: inline; padding-right: 15px;">
                        <a href="view_books.html" style="color: white; text-decoration: none; font-weight: bold;">Home</a>
                    </li>
                    <li style="display: inline; padding-right: 15px;">
                        <a href="settings.html" style="color: white; text-decoration: none; font-weight: bold;">Profile</a>
                    </li>
                    <li style="display: inline;">
                        <button id="logoutBtn" style="background-color: #ff6347; color: white; border: none; padding: 8px 16px; cursor: pointer; border-radius: 4px;">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    `;

    headerContainer.innerHTML = headerHTML;

    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '../index.html';
    });
}
loadHeader();