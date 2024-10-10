# Library Management System - Frontend

## Overview
This is the frontend of a Library Management System, which allows users to manage books and members in a library. The system has different functionalities for regular members and librarians, providing role-based access control. This project is built using HTML, CSS, and JavaScript and communicates with a backend API to perform operations like viewing books, borrowing and returning books, managing user accounts, and more.

## Features
- **Authentication**: Login and sign-up functionalities for users.
- **Book Management**:
  - **View Books**: All users can view the list of available books.
  - **Add/Update/Delete Books**: Librarians can add, update, and delete books.
  - **Borrow/Return Books**: Members can borrow or return books.
- **User Management**:
  - **Profile Management**: Users can view their profile details, borrow history, and delete their account.
  - **View Members**: Librarians can view and manage active and inactive members.
- **Role-Based Access**: Different pages and functionalities are accessible based on the user's role (Member or Librarian).
- **Dynamic Navigation**: Dynamic content loading based on user authentication status and role.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   ```
2. Open the project folder and launch the application by opening index.html in your preferred browser.

3. Ensure the backend API is running to allow communication for book management, member management, etc.

## Technologies
```bash
Frontend: HTML, CSS, JavaScript (ES6+)
Backend: Communicates with the backend API (Node.js/Express or any server exposing REST APIs)
Styling: Basic CSS for layout and design
```

All the other details regarding the flow statement are in the Library Management System-frontend.docx file

For now an api endpoint is already present in js file, you can replace it with you own API endpoint.

This preoject deployment was done on vercel and its configration file is present in the project structure.