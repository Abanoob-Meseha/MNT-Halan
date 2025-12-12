
const INITIAL_DATA = {
    users: [
        { id: 1, username: 'admin', password: '123', name: 'Admin User', role: 'admin', permissions: ['edit_content', 'manage_users'] },
        { id: 2, username: 'user', password: '123', name: 'Normal User', role: 'user', permissions: ['view_content'] }
    ],
    categories: [
        { id: 'micro', title: 'تمويل متناهي الصغر', icon: 'fa-coins' },
        { id: 'medium', title: 'تمويل متوسط', icon: 'fa-chart-line' },
        { id: 'auto', title: 'تمويل السيارات', icon: 'fa-car' },
        { id: 'consumer', title: 'التمويل الاستهلاكي', icon: 'fa-shopping-cart' },
        { id: 'investment', title: 'الاستثمار', icon: 'fa-piggy-bank' },
        { id: 'gam3ya', title: 'الجمعية', icon: 'fa-users' }
    ],
    content: {
        'micro': [
            { id: 'tab1', title: 'نظرة عامة', html: '<h3>نظرة عامة على التمويل متناهي الصغر</h3><p>هنا يمكنك كتابة تفاصيل عن التمويل...</p>' },
            { id: 'tab2', title: 'الشروط', html: '<h3>شروط التقديم</h3><ul><li>شرط 1</li><li>شرط 2</li></ul>' }
        ],
        'medium': [
            { id: 'tab1', title: 'نظرة عامة', html: '<h3>تمويل المشروعات المتوسطة</h3><p>دعم لنمو أعمالك...</p>' }
        ],
        'auto': [
            { id: 'tab1', title: 'انواع السيارات', html: '<h3>السيارات المتاحة</h3><p>قائمة بالسيارات...</p>' },
            { id: 'tab2', title: 'حاسبة القروض', html: '<h3>احسب قسطك</h3><p>تفاصيل القسط...</p>' }
        ],
        'consumer': [
            { id: 'tab1', title: 'المنتجات', html: '<h3>المنتجات المتاحة للتقسيط</h3><p>أجهزة كهربائية، موبايلات...</p>' }
        ],
        'investment': [
            { id: 'tab1', title: 'صناديق الاستثمار', html: '<h3>معلومات عن الصناديق</h3><p>عن الذهب والأسهم...</p>' }
        ],
        'gam3ya': [
            { id: 'tab1', title: 'كيف تعمل', html: '<h3>طريقة الاشتراك</h3><p>خطوات بسيطة...</p>' }
        ]
    }
};

function initData() {
    if (!localStorage.getItem('mnt_users')) {
        localStorage.setItem('mnt_users', JSON.stringify(INITIAL_DATA.users));
    }
    if (!localStorage.getItem('mnt_categories')) {
        localStorage.setItem('mnt_categories', JSON.stringify(INITIAL_DATA.categories));
    }
    if (!localStorage.getItem('mnt_content')) {
        localStorage.setItem('mnt_content', JSON.stringify(INITIAL_DATA.content));
    }
    console.log('Data initialized');
}

// Auto-run init on load
initData();
