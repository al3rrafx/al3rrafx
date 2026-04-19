// ========== القائمة الجانبية - تحافظ على التصميم الأصلي ==========

function createSidebar() {
    // إزالة أي عناصر قديمة
    const oldSidebar = document.getElementById('sidebar');
    if (oldSidebar) oldSidebar.remove();
    const oldToggle = document.getElementById('menuToggle');
    if (oldToggle) oldToggle.remove();
    const oldOverlay = document.getElementById('overlay');
    if (oldOverlay) oldOverlay.remove();

    // تحديد المسار الصحيح (عشان الشغل في مجلد pages)
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';
    const imagePath = isInPages ? '../images/logo.jpg' : 'images/logo.jpg';

    // إنشاء القائمة الجانبية
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <div class="sidebar-header">
            <img src="${imagePath}" alt="العرَّاف" class="sidebar-logo">
            <h3>العرَّاف</h3>
            <button class="sidebar-close" id="closeSidebar">✕</button>
        </div>
        <ul class="sidebar-menu">
            <li><a href="${basePath}index.html">🏠 الرئيسية</a></li>
            <li><a href="${basePath}pages/zodiac.html">⭐ أسرار برجك</a></li>
            <li><a href="${basePath}pages/couples.html">💑 Couples</a></li>
            <li><a href="${basePath}pages/daily-horoscope.html">☀️ حظك اليوم</a></li>
            <li><a href="${basePath}pages/lucky-numbers.html">🔢 أرقام الحظ</a></li>
            <li><a href="${basePath}pages/dream-interpretation.html">💭 تفسير الأحلام</a></li>
            <li><a href="${basePath}pages/tarot-reading.html">🎴 قراءة التاروت</a></li>
            <li><a href="${basePath}pages/age-calculator.html">📅 احسب عمرك</a></li>
            <li><a href="${basePath}pages/luck-game.html">🎲 لعبة الحظ</a></li>
            <li><a href="${basePath}pages/blog.html">📚 دليل الأبراج</a></li>
            <li><a href="${basePath}pages/vip.html">👑 Al3rraf VIP</a></li>
            <li><a href="${basePath}pages/about.html">📖 عن العرَّاف</a></li>
            <li><a href="${basePath}pages/contact.html">📞 اتصل بنا</a></li>
        </ul>
        <div class="sidebar-footer">
            <div class="tiktok-link">📱 <a href="https://www.tiktok.com/@al3rrafx" target="_blank">tiktok.com/@al3rrafx</a></div>
        </div>
    `;
    document.body.appendChild(sidebar);

    // زر فتح القائمة
    const menuToggle = document.createElement('button');
    menuToggle.id = 'menuToggle';
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.body.appendChild(menuToggle);

    // طبقة الخلفية
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // الأحداث
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
}

// تشغيل القائمة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSidebar);
} else {
    createSidebar();
}
