// Scroll animado personalizado con easing real
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (!element) return;
    const headerOffset = 0;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
    animateScrollTo(offsetPosition, 700);
}

function animateScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    let start;
    function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);
        // easeInOutCubic
        const ease = percent < 0.5
            ? 4 * percent * percent * percent
            : 1 - Math.pow(-2 * percent + 2, 3) / 2;
        window.scrollTo(0, startY + diff * ease);
        if (time < duration) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    });

    // Animaciones de aparición
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.section, .project-card, .resume-box, .contact-form').forEach(el => {
        observer.observe(el);
    });
});
