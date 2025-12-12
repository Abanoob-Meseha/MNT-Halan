# MNT Halan Ma3lomaty 📱

**MNT Halan Ma3lomaty** is a modern, responsive web dashboard designed to manage and display financial information and loan details for MNT Halan employees and agents. Built with a focus on simplicity, native performance, and ease of use.

## 🚀 Features

-   **Dashboard Overview**: Quick access to key financial categories (Micro-finance, Auto, Consumer, etc.).
-   **Dynamic Content Views**:
    -   **Tabs View**: For categorized content like Auto Finance.
    -   **Grid View**: Visual cards for Micro-finance topics.
-   **Content Management System**:
    -   Role-based access control (Admin vs User).
    -   In-place editing for Admins using a simple rich-text interface.
    -   Changes are persisted locally (LocalStorage).
-   **User Experience**:
    -   Fully **RTL** (Right-to-Left) support for Arabic.
    -   Responsive design for all devices.
    -   Smooth animations and transition effects.
-   **Interactive Modals**: Detailed content popups for grid items.

## 🛠️ Technology Stack

-   **Frontend**: HTML5, CSS3 (Custom Properties, Flexbox/Grid), JavaScript (ES6+).
-   **Icons**: FontAwesome 6.
-   **Storage**: Browser LocalStorage (No backend required).

## 📦 How to Run

1.  Clone the repository.
2.  Open `index.html` in any modern web browser.
3.  That's it! No `npm install` or server setup required.

## 🔐 Login Credentials

| Role | Username | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `Bola.Adel` | `123` | Full Access (Read/Edit/Manage) |
| **User** | `user` | `123` | Read Only |

## 📂 Project Structure

```
MNT Halan Ma3lomaty/
├── css/
│   └── style.css       # Global styles, variables, and animations
├── js/
│   ├── app.js          # Auth and core logic
│   ├── data.js         # Dummy data and LocalStorage init
│   ├── dashboard.js    # Dashboard rendering logic
│   └── details.js      # Details page, grid, and modal logic
├── images/             # Assets
├── index.html          # Entry point (Redirects to Login)
├── login.html          # Authentication page
├── dashboard.html      # Main overview page
└── details.html        # Dynamic content page
```

---
Developed for **MNT Halan**.
