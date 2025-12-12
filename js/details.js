
document.addEventListener('DOMContentLoaded', () => {
    App.init(); // Auth check

    const user = App.getCurrentUser();
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        App.logout();
    });

    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    if (!categoryId) {
        window.location.href = 'dashboard.html';
        return;
    }

    loadCategoryData(categoryId);
});

let currentCategory = null;
let currentItems = []; // Tabs or Grid Items
let activeItemId = null; // Currently active tab or modal item

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
    currentItems = allContent[categoryId] || [];

    const wrapper = document.getElementById('view-wrapper');
    wrapper.innerHTML = '';

    if (currentCategory.viewType === 'grid') {
        renderGridView(wrapper);
    } else {
        renderTabsView(wrapper);
    }
}

// ---------------- Tabs View Logic ---------------- //
function renderTabsView(container) {
    container.innerHTML = `
        <div class="tabs-wrapper">
            <div id="tabs-container" class="tabs-header"></div>
            <div class="content-body">
                <div class="content-header">
                    <h3>المحتوى</h3>
                    <div id="actions-area"></div>
                </div>
                <div id="content-area"></div>
            </div>
        </div>
    `;

    renderTabsHeader();
    if (currentItems.length > 0) switchTab(currentItems[0].id);
    else document.getElementById('content-area').innerHTML = '<p>لا يوجد محتوى.</p>';
}

function renderTabsHeader() {
    const tabsContainer = document.getElementById('tabs-container');
    tabsContainer.innerHTML = '';
    currentItems.forEach(item => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${item.id === activeItemId ? 'active' : ''}`;
        btn.textContent = item.title;
        btn.onclick = () => switchTab(item.id);
        tabsContainer.appendChild(btn);
    });
}

function switchTab(itemId) {
    activeItemId = itemId;
    renderTabsHeader(); // Update active state

    const itemData = currentItems.find(i => i.id === itemId);
    if (!itemData) return;

    document.getElementById('content-area').innerHTML = itemData.html;
    renderEditButton('actions-area', () => enableEditMode('content-area', 'actions-area', saveTabContent, cancelTabEdit));
}

// ---------------- Grid View Logic ---------------- //
function renderGridView(container) {
    const grid = document.createElement('div');
    grid.className = 'details-grid';

    currentItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'details-card';
        card.innerHTML = `
            <i class="fas ${item.icon || 'fa-file'}"></i>
            <h3>${item.title}</h3>
        `;
        card.onclick = () => openModal(item.id);
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

// ---------------- Mixed Edit Logic ---------------- //

function renderEditButton(containerId, onClick) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    if (App.hasPermission('edit_content')) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.innerHTML = '<i class="fas fa-edit"></i> تعديل';
        btn.onclick = onClick;
        container.appendChild(btn);
    }
}

function enableEditMode(contentDivId, actionsDivId, saveCallback, cancelCallback) {
    const contentDiv = document.getElementById(contentDivId);
    const originalHtml = contentDiv.innerHTML; // Or get from data to be safe? InnerHTML is fine for now.

    contentDiv.innerHTML = `
        <textarea id="editor-${contentDivId}" class="form-control" style="min-height: 300px; direction: ltr; font-family: monospace;">${originalHtml}</textarea>
        <div class="edit-controls" style="margin-top: 15px; display: flex; gap: 10px; justify-content: flex-end;">
            <button id="save-btn-${contentDivId}" class="btn btn-primary">حفظ</button>
            <button id="cancel-btn-${contentDivId}" class="btn" style="background: #eef;">إلغاء</button>
        </div>
    `;

    document.getElementById(actionsDivId).style.display = 'none';

    document.getElementById(`save-btn-${contentDivId}`).onclick = () => {
        const newVal = document.getElementById(`editor-${contentDivId}`).value;
        saveCallback(newVal);
    };

    document.getElementById(`cancel-btn-${contentDivId}`).onclick = () => cancelCallback();
}

// Tabs Save/Cancel
function saveTabContent(newHtml) {
    const index = currentItems.findIndex(i => i.id === activeItemId);
    if (index !== -1) currentItems[index].html = newHtml;
    persistData();
    document.getElementById('actions-area').style.display = 'block';
    switchTab(activeItemId); // Re-render
    alert('تم الحفظ!');
}

function cancelTabEdit() {
    document.getElementById('actions-area').style.display = 'block';
    switchTab(activeItemId);
}

// ---------------- Modal Logic ---------------- //
function openModal(itemId) {
    activeItemId = itemId;
    const item = currentItems.find(i => i.id === itemId);
    if (!item) return;

    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-content-area').innerHTML = item.html;

    renderEditButton('modal-actions', () => enableEditMode('modal-content-area', 'modal-actions', saveModalContent, cancelModalEdit));

    const overlay = document.getElementById('modal-overlay');
    overlay.classList.add('open');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    activeItemId = null;
}

function saveModalContent(newHtml) {
    const index = currentItems.findIndex(i => i.id === activeItemId);
    if (index !== -1) currentItems[index].html = newHtml;
    persistData();

    // Refresh content view and show actions again
    document.getElementById('modal-content-area').innerHTML = newHtml;
    document.getElementById('modal-actions').style.display = 'block';
    renderEditButton('modal-actions', () => enableEditMode('modal-content-area', 'modal-actions', saveModalContent, cancelModalEdit));

    alert('تم الحفظ!');
}

function cancelModalEdit() {
    const item = currentItems.find(i => i.id === activeItemId);
    document.getElementById('modal-content-area').innerHTML = item.html;
    document.getElementById('modal-actions').style.display = 'block';
}

function persistData() {
    const allContent = JSON.parse(localStorage.getItem('mnt_content') || '{}');
    allContent[currentCategory.id] = currentItems;
    localStorage.setItem('mnt_content', JSON.stringify(allContent));
}
