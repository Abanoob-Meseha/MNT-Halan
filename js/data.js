
const INITIAL_DATA = {
    users: [
        { id: 1, username: 'Bola.Adel', password: '123', name: 'Bola Adel', role: 'admin', permissions: ['edit_content', 'manage_users'] },
        { id: 2, username: 'user', password: '123', name: 'Normal User', role: 'user', permissions: ['view_content'] }
    ],
    categories: [
        { id: 'micro', title: 'تمويل متناهي الصغر', icon: 'fa-coins', viewType: 'grid' },
        { id: 'medium', title: 'تمويل متوسط', icon: 'fa-chart-line', viewType: 'tabs' },
        { id: 'auto', title: 'تمويل السيارات', icon: 'fa-car', viewType: 'tabs' },
        { id: 'consumer', title: 'التمويل الاستهلاكي', icon: 'fa-shopping-cart', viewType: 'tabs' },
        { id: 'investment', title: 'الاستثمار', icon: 'fa-piggy-bank', viewType: 'tabs' },
        { id: 'gam3ya', title: 'الجمعية', icon: 'fa-users', viewType: 'tabs' },
        { id: 'employee', title: 'التمويل للموظفين', icon: 'fa-user-tie', viewType: 'tabs' }
    ],
    content: {
        'micro': [
            { id: 'cond', title: 'الاشتراطات العامة', icon: 'fa-file-contract', html: '<h3>الاشتراطات العامة</h3><p>تفاصيل...</p>' },
            { id: 'guarantee', title: 'سياسة الضمانات', icon: 'fa-shield-alt', html: '<h3>سياسة الضمانات</h3><p>تفاصيل...</p>' },
            { id: 'renewal', title: 'التجديد', icon: 'fa-sync', html: '<h3>التجديد</h3><p>تفاصيل...</p>' },
            {
                id: 'craft',
                title: 'القرض الحرفي',
                icon: 'fa-tools',
                html: `
                    <h3>القرض الحرفي</h3>
                    <p><strong>يشترط تفعيل القرض الحرفي بالفرع موافقة مدير العمليات.</strong></p>

                    <h4>الفئة المستهدفة:</h4>
                    <p>العملاء الذين لهم أنشطة حرفية وليس لديهم مكان ثابت لممارسة النشاط (كهربائي - مبيض محارة - سباك - ميكانيكي بأنواعه - مبلط سيراميك - فني تصنيع رخام - نقاش - بناء - سائق برخصة مهنية) وما يستجد من أنشطة بحسب طبيعة منطقة العمل.</p>

                    <h4>الهدف من التمويل:</h4>
                    <p>(شراء خامات – شراء معدات – شراء عدد – رسوم الترخيص والمخالفات للسائقين)</p>

                    <h4>قيمة التمويل:</h4>
                    <p>(من 3000 جنيه الي 25000 جنيه) للحرفيين، وللسائقين 10000 جم الجديد</p>

                    <h4>نظام التجديد:</h4>
                    <p>التجديد بحد أقصى 35000 جم للقرض الحرفي وللسائقين الحد الأقصى لتجديد 15000جم.</p>

                    <h4>مدة السداد:</h4>
                    <p>من 6 شهر الي 24 شهر (جديد او تجديد).</p>

                    <h4>الضمانات:</h4>
                    <ul>
                        <li>يشترط وجود ضامن بالقرض الحرفي له دخل يؤهله من سداد الاقساط.</li>
                    </ul>

                    <h4>اشتراطات خاصة:</h4>
                    <ol style="padding-right: 20px;">
                        <li>ان يكون قد مضي 6 أشهر على تاريخ افتتاح الفرع او ان مدير الفرع معين من أكثر من عام بالشركة ويستثني من هذا الشرط القروض الحرفية التجديد.</li>
                        <li>الاستعلام عن جدية النشاط أو مزاولة العميل للنشاط هو مسئولية مدير الفرع.</li>
                        <li>يكون منزل العميل هو مكان المعاينة لتلك الفئة من التمويل.</li>
                        <li>يشترط موافقة مشرف المنطقة على صرف الحالات التي يزيد تمويلها عن 20000 جنيه.</li>
                        <li>يشترط موافقة مشرف المنطقة او من ينوب عنة على الاقراض للسائقين بشرط قرب انتهاء الرخصة او انتهائها من شهر مضي</li>
                    </ol>
                `
            },
            { id: 'seasonal', title: 'القرض الموسمي', icon: 'fa-cloud-sun', html: '<h3>القرض الموسمي</h3><p>تفاصيل...</p>' },
            { id: 'boat', title: 'تمويل مراكب الصيد', icon: 'fa-ship', html: '<h3>تمويل مراكب الصيد</h3><p>تفاصيل...</p>' },
            { id: 'overhaul', title: 'عمرة السيارات', icon: 'fa-wrench', html: '<h3>عمرة السيارات</h3><p>تفاصيل...</p>' },
            { id: 'iscore', title: 'الأي سكور', icon: 'fa-chart-bar', html: '<h3>الأي سكور</h3><p>تفاصيل...</p>' },
            { id: 'guarantor', title: 'اقتراض الضامن', icon: 'fa-user-friends', html: '<h3>اقتراض الضامن</h3><p>تفاصيل...</p>' },
            { id: 'independent', title: 'القرض المستقل', icon: 'fa-user', html: '<h3>القرض المستقل</h3><p>تفاصيل...</p>' },
            { id: 'express', title: 'الاكسبريس', icon: 'fa-tachometer-alt', html: '<h3>الاكسبريس</h3><p>تفاصيل...</p>' },
            { id: 'transfers', title: 'التحويلات الداخلية و الخارجية', icon: 'fa-exchange-alt', html: '<h3>التحويلات</h3><p>تفاصيل...</p>' },
            { id: 'posting', title: 'الترحيلات', icon: 'fa-share-square', html: '<h3>الترحيلات</h3><p>تفاصيل...</p>' },
            { id: 'scheduling', title: 'الجدولة', icon: 'fa-calendar-alt', html: '<h3>الجدولة</h3><p>تفاصيل...</p>' },
            { id: 'legal', title: 'الشئون القانونية', icon: 'fa-balance-scale', html: '<h3>الشئون القانونية</h3><p>تفاصيل...</p>' },
            { id: 'ban', title: 'حظر العملاء', icon: 'fa-user-slash', html: '<h3>حظر العملاء</h3><p>تفاصيل الحظر...</p>' },
            { id: 'solidarity', title: 'الضامن المتضامن', icon: 'fa-handshake', html: '<h3>الضامن المتضامن</h3><p>تفاصيل الضامن...</p>' }
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
        ],
        'employee': [
            { id: 'tab1', title: 'المميزات', html: '<h3>مميزات تمويل الموظفين</h3><p>أقل فائدة وأسهل إجراءات...</p>' },
            { id: 'tab2', title: 'المستندات المطلوبة', html: '<h3>الأوراق المطلوبة</h3><p>صورة البطاقة، مفردات مرتب...</p>' }
        ]
    }
};

function initData() {
    // We need to force update for this step to apply new data structure to existing localStorage
    // In a real app we'd have migrations. Here we'll just check if the new category exists, if not, reset/merge.
    // For simplicity in this demo, let's just Refresh the data if 'employee' is missing or 'micro' has no icons.

    // Force update for demo purposes to ensure new content changes are reflected
    const needsUpdate = true;

    if (needsUpdate || !localStorage.getItem('mnt_users')) {
        localStorage.setItem('mnt_users', JSON.stringify(INITIAL_DATA.users));
        localStorage.setItem('mnt_categories', JSON.stringify(INITIAL_DATA.categories));

        // Merge content to keep old edits if any, but in this specific request we want the new structure for Micro
        // Best safest bet for MVP demo: overwrite content for 'micro' and 'employee', keep others if possible, 
        // OR just reset everything. Resetting is safer to ensure new structure works.
        localStorage.setItem('mnt_content', JSON.stringify(INITIAL_DATA.content));
        console.log('Data reset/updated for new features');
    }
}

// Auto-run init on load
initData();
