
document.addEventListener('DOMContentLoaded', () => {
    App.init(); // Auth check

    const user = App.getCurrentUser();
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        App.logout();
    });

    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    if (!categoryId) {
        window.location.href = 'dashboard.html';
        return;
    }

    loadCategoryData(categoryId);
});

let currentCategory = null;
let currentTabs = [];
let activeTabId = null;

function loadCategoryData(categoryId) {
    const categories = JSON.parse(localStorage.getItem('mnt_categories') || '[]');
    const allContent = JSON.parse(localStorage.getItem('mnt_content') || '{}');

    currentCategory = categories.find(c => c.id === categoryId);
    if (!currentCategory) {
        alert('Category not found');
        window.location.href = 'dashboard.html';
        return;
    }

    document.getElementById('page-title').textContent = currentCategory.title;

    currentTabs = allContent[categoryId] || [];
    if (currentTabs.length > 0) {
        renderTabs();
        switchTab(currentTabs[0].id);
    } else {
        document.getElementById('content-area').innerHTML = '<p>لا يوجد محتوى حالياً.</p>';
    }
}

function renderTabs() {
    const tabsContainer = document.getElementById('tabs-container');
    tabsContainer.innerHTML = '';

    currentTabs.forEach(tab => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${tab.id === activeTabId ? 'active' : ''}`;
        btn.textContent = tab.title;
        btn.onclick = () => switchTab(tab.id);
        tabsContainer.appendChild(btn);
    });
}

function switchTab(tabId) {
    activeTabId = tabId;

    // Update active class on buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.textContent === currentTabs.find(t => t.id === tabId).title) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderContent();
}

function renderContent() {
    const tabData = currentTabs.find(t => t.id === activeTabId);
    if (!tabData) return;

    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = tabData.html;

    // Check permissions for Edit button
    const actionsArea = document.getElementById('actions-area');
    actionsArea.innerHTML = '';

    if (App.hasPermission('edit_content')) {
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-primary';
        editBtn.innerHTML = '<i class="fas fa-edit"></i> تعديل المحتوى';
        editBtn.onclick = () => enableEditMode();
        actionsArea.appendChild(editBtn);
    }
}

function enableEditMode() {
    const contentArea = document.getElementById('content-area');
    const originalHtml = contentArea.innerHTML;

    // Convert to textarea for editing code/text
    contentArea.innerHTML = `
        <textarea id="editor" class="form-control" style="min-height: 300px; direction: ltr; font-family: monospace;">${originalHtml}</textarea>
        <div class="edit-controls" style="margin-top: 10px; display: flex; gap: 10px;">
            <button onclick="saveContent()" class="btn btn-primary">حفظ التغييرات</button>
            <button onclick="cancelEdit()" class="btn" style="background: #ddd;">إلغاء</button>
        </div>
    `;

    document.getElementById('actions-area').style.display = 'none';
}

function saveContent() {
    const newHtml = document.getElementById('editor').value;

    // Update local state
    const tabIndex = currentTabs.findIndex(t => t.id === activeTabId);
    if (tabIndex !== -1) {
        currentTabs[tabIndex].html = newHtml;
    }

    // Persist to localStorage
    const allContent = JSON.parse(localStorage.getItem('mnt_content') || '{}');
    allContent[currentCategory.id] = currentTabs;
    localStorage.setItem('mnt_content', JSON.stringify(allContent));

    // Reload view
    document.getElementById('actions-area').style.display = 'block';
    renderContent();
    alert('تم حفظ التغييرات بنجاح!');
}

function cancelEdit() {
    document.getElementById('actions-area').style.display = 'block';
    renderContent();
}
