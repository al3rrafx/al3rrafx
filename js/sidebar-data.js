// ========== القائمة الجانبية الموحدة للموقع بالكامل ==========
// شغالة في index.html (الرئيسية) و pages/*.html (كل الصفحات الفرعية)

function createSidebar() {
    // إزالة أي عناصر قديمة لو موجودة (عشان منع التكرار)
    const oldSidebar = document.getElementById('sidebar');
    if (oldSidebar) oldSidebar.remove();
    
    const oldToggle = document.getElementById('menuToggle');
    if (oldToggle) oldToggle.remove();
    
    const oldOverlay = document.getElementById('overlay');
    if (oldOverlay) oldOverlay.remove();

    // --------------------------------------------
    // 1. تحديد المسار الصحيح للصور والروابط
    //    لو احنا في مجلد pages → الرابط يبدأ بـ ../
    //    لو احنا في الجذر (index.html) → الرابط عادي
    // --------------------------------------------
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';
    const imagePath = isInPages ? '../images/logo.jpg' : 'images/logo.jpg';

    // --------------------------------------------
    // 2. إنشاء القائمة الجانبية (Sidebar)
    // --------------------------------------------
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <div class="sidebar-header">
            <img src="${imagePath}" alt="العرَّاف" class="sidebar-logo" onerror="this.src='https://via.placeholder.com/80x80/6b2eb3/ffffff?text=Al3rraf'">
            <h3>العرَّاف</h3>
            <button class="sidebar-close" id="closeSidebar">✕</button>
        </div>
        <ul class="sidebar-menu">
            <li><a href="${basePath}index.html" id="nav-home">🏠 الرئيسية</a></li>
            <li><a href="${basePath}pages/zodiac.html" id="nav-zodiac">⭐ أسرار برجك</a></li>
            <li><a href="${basePath}pages/couples.html" id="nav-couples">💑 Couples</a></li>
            <li><a href="${basePath}pages/daily-horoscope.html" id="nav-daily">☀️ حظك اليوم</a></li>
            <li><a href="${basePath}pages/lucky-numbers.html" id="nav-lucky">🔢 أرقام الحظ</a></li>
            <li><a href="${basePath}pages/dream-interpretation.html" id="nav-dream">💭 تفسير الأحلام</a></li>
            <li><a href="${basePath}pages/tarot-reading.html" id="nav-tarot">🎴 قراءة التاروت</a></li>
            <li><a href="${basePath}pages/age-calculator.html" id="nav-age">📅 احسب عمرك</a></li>
            <li><a href="${basePath}pages/luck-game.html" id="nav-luck">🎲 لعبة الحظ</a></li>
            <li><a href="${basePath}pages/blog.html" id="nav-blog">📚 دليل الأبراج</a></li>
            <li><a href="${basePath}pages/vip.html" id="nav-vip">👑 Al3rraf VIP</a></li>
            <li><a href="${basePath}pages/about.html" id="nav-about">📖 عن العرَّاف</a></li>
            <li><a href="${basePath}pages/contact.html" id="nav-contact">📞 اتصل بنا</a></li>
        </ul>
        <div class="sidebar-footer">
            <div class="tiktok-link">📱 <a href="https://www.tiktok.com/@al3rrafx" target="_blank">tiktok.com/@al3rrafx</a></div>
        </div>
    `;
    document.body.appendChild(sidebar);

    // --------------------------------------------
    // 3. إنشاء زر فتح القائمة (Menu Toggle)
    // --------------------------------------------
    const menuToggle = document.createElement('button');
    menuToggle.id = 'menuToggle';
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.body.appendChild(menuToggle);

    // --------------------------------------------
    // 4. إنشاء طبقة الخلفية السودا (Overlay)
    // --------------------------------------------
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // --------------------------------------------
    // 5. ربط الأحداث (Event Listeners)
    // --------------------------------------------
    const sidebarElem = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('closeSidebar');
    const overlayElem = document.getElementById('overlay');

    function openSidebar() {
        sidebarElem.classList.add('open');
        overlayElem.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebarFunc() {
        sidebarElem.classList.remove('open');
        overlayElem.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebarFunc);
    if (overlayElem) overlayElem.addEventListener('click', closeSidebarFunc);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebarElem && sidebarElem.classList.contains('open')) {
            closeSidebarFunc();
        }
    });

    // --------------------------------------------
    // 6. تفعيل الرابط النشط (Active Link)
    // --------------------------------------------
    setTimeout(() => {
        const currentPath = window.location.pathname;
        const pageName = currentPath.split('/').pop();

        const linkIds = {
            'index.html': 'nav-home',
            'zodiac.html': 'nav-zodiac',
            'couples.html': 'nav-couples',
            'daily-horoscope.html': 'nav-daily',
            'lucky-numbers.html': 'nav-lucky',
            'dream-interpretation.html': 'nav-dream',
            'tarot-reading.html': 'nav-tarot',
            'age-calculator.html': 'nav-age',
            'luck-game.html': 'nav-luck',
            'blog.html': 'nav-blog',
            'vip.html': 'nav-vip',
            'about.html': 'nav-about',
            'contact.html': 'nav-contact'
        };

        const activeId = linkIds[pageName];
        if (activeId) {
            const activeLink = document.getElementById(activeId);
            if (activeLink) activeLink.classList.add('active');
        }
    }, 100);
}

// تشغيل القائمة عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSidebar);
} else {
    createSidebar();
}
