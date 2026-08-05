// JavaScript for Kumani Septic Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('main-nav');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    hamburger.addEventListener('click', function() {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('open');
        // Update aria-expanded for accessibility
        hamburger.setAttribute('aria-controls', 'main-nav');
    });

    // Focus management for mobile navigation
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            // Add focus indicator for keyboard navigation
            this.classList.add('nav-focused');
        });
        link.addEventListener('blur', function() {
            this.classList.remove('nav-focused');
        });
    });

    // Keyboard navigation support
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
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

        // Enhanced validation with accessibility
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const phone = contactForm.phone.value.trim();

        if (name && email && phone) {
            // Simulate form submission
            contactForm.reset();
            formSuccess.hidden = false;
            formSuccess.setAttribute('aria-live', 'polite');
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