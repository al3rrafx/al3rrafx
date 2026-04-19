document.addEventListener('DOMContentLoaded', function() {
    console.log('العرَّاف جاهز 🔮');
    populateDateSelects();
    createStars();
});

function populateDateSelects() {
    const daySelectors = ['birthDay', 'coupleDay1', 'coupleDay2'];
    const monthSelectors = ['birthMonth', 'coupleMonth1', 'coupleMonth2'];
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    
    for (let selector of daySelectors) {
        const select = document.getElementById(selector);
        if (select) {
            select.innerHTML = '<option value="">اليوم</option>';
            for (let i = 1; i <= 31; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                select.appendChild(option);
            }
        }
    }
    
    for (let selector of monthSelectors) {
        const select = document.getElementById(selector);
        if (select) {
            select.innerHTML = '<option value="">الشهر</option>';
            for (let i = 0; i < months.length; i++) {
                const option = document.createElement('option');
                option.value = i + 1;
                option.textContent = months[i];
                select.appendChild(option);
            }
        }
    }
}

function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) return;
    
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = Math.random() * 3 + 2 + 's';
        starsContainer.appendChild(star);
    }
}

function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    if (isError) {
        toast.style.borderColor = '#ff6b6b';
        toast.style.color = '#ff6b6b';
    }
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function showLoading(button) {
    button.classList.add('btn-loading');
    const originalHTML = button.innerHTML;
    button.innerHTML = '<span class="loader"></span> جاري الكشف...';
    return () => {
        button.innerHTML = originalHTML;
        button.classList.remove('btn-loading');
    };
}