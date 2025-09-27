const nav = document.querySelector('nav');
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    nav.classList.toggle('active', isActive);

    hamburger.setAttribute('aria-expanded', isActive);
});

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        nav.classList.toggle('active', isActive);

        hamburger.setAttribute('aria-expanded', isActive);
    });
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Smooth scroll ke atas dengan easing
function smoothScrollToTop(duration = 800) {
    const start = window.scrollY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easing: easeInOutCubic
        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, start * (1 - ease));

        if (elapsed < duration) {
            requestAnimationFrame(scrollStep);
        }
    }

    requestAnimationFrame(scrollStep);
}

backToTop.addEventListener('click', () => {
    smoothScrollToTop(1000);
});

const revealElements = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
});

revealElements.forEach(el => observer.observe(el));