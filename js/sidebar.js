// التحكم في القائمة الجانبية
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sidebar initialized');
    
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');
    
    function openSidebar() {
        if (sidebar) {
            sidebar.classList.add('open');
            document.body.classList.add('sidebar-open');
            if (overlay) overlay.classList.add('active');
            console.log('Sidebar opened');
        }
    }
    
    function closeSidebarFunc() {
        if (sidebar) {
            sidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open');
            if (overlay) overlay.classList.remove('active');
            console.log('Sidebar closed');
        }
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
        console.log('Menu toggle listener added');
    } else {
        console.warn('Menu toggle not found');
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeSidebarFunc);
        console.log('Close button listener added');
    } else {
        console.warn('Close button not found');
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeSidebarFunc);
        console.log('Overlay listener added');
    } else {
        console.warn('Overlay not found');
    }
    
    // إغلاق القائمة بالضغط على ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
            closeSidebarFunc();
        }
    });
    
    // التأكد من وجود العناصر في كل الصفحات
    if (!sidebar) console.error('Sidebar element not found!');
    if (!menuToggle) console.error('Menu toggle button not found!');
});