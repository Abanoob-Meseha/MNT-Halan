
document.addEventListener('DOMContentLoaded', () => {
    App.init(); // Check auth

    const user = App.getCurrentUser();
    document.getElementById('user-name').textContent = user.name;

    renderCategories();

    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        App.logout();
    });
});

function renderCategories() {
    const categories = JSON.parse(localStorage.getItem('mnt_categories') || '[]');
    const grid = document.getElementById('categories-grid');

    // Clear loading state
    grid.innerHTML = '';

    categories.forEach(cat => {
        const card = document.createElement('a');
        card.href = `details.html?category=${cat.id}`;
        card.className = 'card category-card';
        card.innerHTML = `
            <div class="icon-wrapper">
                <i class="fas ${cat.icon}"></i>
            </div>
            <h3>${cat.title}</h3>
        `;
        grid.appendChild(card);
    });
}
