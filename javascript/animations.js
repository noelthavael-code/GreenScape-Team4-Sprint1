/* Scroll-triggered animations */
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards - reset animation to allow fade-in-up on scroll
    const serviceCards = document.querySelectorAll('#service1, #service2, #service3');
    serviceCards.forEach((card) => {
        // Remove inline animation style so CSS class can apply
        card.style.animation = '';
        observer.observe(card);
    });

    // Scroll handler for navbar and parallax effects
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const navbar = document.querySelector('.navbar-container');

                // Navbar shadow effect
                if (navbar) {
                    if (scrollTop > 100) {
                        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    } else {
                        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                    }
                }

                // Subtle parallax on hero image (moves up as you scroll down)
                const mainImage = document.getElementById('main-image');
                if (mainImage && scrollTop < 500) {
                    const parallaxOffset = scrollTop * 0.15;
                    mainImage.style.transform = `translateY(-${parallaxOffset}px)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    });

    // Stagger animation setup for service titles
    const titleElements = document.querySelectorAll('.sectionTitle');
    titleElements.forEach((title, index) => {
        title.style.animationDelay = `${0.1 * index}s`;
    });
});
