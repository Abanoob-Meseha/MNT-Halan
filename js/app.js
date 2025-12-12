
const App = {
    init: function () {
        this.checkAuth();
    },

    checkAuth: function () {
        const user = localStorage.getItem('mnt_current_user');
        const isLoginPage = window.location.pathname.includes('login.html');

        if (!user && !isLoginPage) {
            window.location.href = 'login.html';
        } else if (user && isLoginPage) {
            window.location.href = 'dashboard.html';
        }
    },

    login: function (username, password) {
        const users = JSON.parse(localStorage.getItem('mnt_users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('mnt_current_user', JSON.stringify(user));
            window.location.href = 'dashboard.html';
            return { success: true };
        } else {
            return { success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
        }
    },

    logout: function () {
        localStorage.removeItem('mnt_current_user');
        window.location.href = 'login.html';
    },

    getCurrentUser: function () {
        return JSON.parse(localStorage.getItem('mnt_current_user'));
    },

    hasPermission: function (permission) {
        const user = this.getCurrentUser();
        return user && user.permissions && user.permissions.includes(permission);
    }
};

// Initialize if not manually called (for pages that include this script)
// document.addEventListener('DOMContentLoaded', () => App.init());
