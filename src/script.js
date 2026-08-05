// JavaScript for Kumani Septic Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('main-nav');

    hamburger.addEventListener('click', function() {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
        mainNav.classList.toggle('active');
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.hidden = false;
        } else {
            backToTop.hidden = true;
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simple validation - you can enhance this
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const phone = contactForm.phone.value.trim();

        if (name && email && phone) {
            // Simulate form submission
            contactForm.reset();
            formSuccess.hidden = false;
            setTimeout(() => {
                formSuccess.hidden = true;
            }, 5000);
        } else {
            alert('Please fill in all required fields');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation for stat counters
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                let current = 0;
                const increment = targetValue / 50;

                const updateCount = () => {
                    current += increment;
                    if (current < targetValue) {
                        target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        target.textContent = targetValue;
                    }
                };

                updateCount();
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(counter => {
        observer.observe(counter);
    });
});

// For production: Consider adding service worker, lazy loading images, etc.