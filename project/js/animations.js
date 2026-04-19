function shakeButton(button) {
    button.style.transform = 'translateX(5px)';
    setTimeout(() => {
        button.style.transform = 'translateX(-5px)';
        setTimeout(() => {
            button.style.transform = 'translateX(3px)';
            setTimeout(() => {
                button.style.transform = 'translateX(0)';
            }, 50);
        }, 50);
    }, 50);
}

function glowEffect(element) {
    element.style.boxShadow = '0 0 30px rgba(184, 126, 255, 0.8)';
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 500);
}

async function typeTextEffect(element, text, speed = 30) {
    element.style.display = 'block';
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

function observeCards() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => observer.observe(card));
}