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
        // Update aria-controls for accessibility
        hamburger.setAttribute('aria-controls', 'main-nav');
        // Focus the first link when menu opens
        if (!expanded) {
            navLinks[0].focus();
        }
    });

    // Focus management for mobile navigation
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            this.classList.add('nav-focused');
        });
        link.addEventListener('blur', function() {
            this.classList.remove('nav-focused');
        });
    });

    // Keyboard navigation support with accessible focus
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Keyboard navigation for menu links
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const currentIndex = Array.from(navLinks).indexOf(document.activeElement);
                const previousIndex = currentIndex - 1;
                const nextIndex = currentIndex + 1;

                if (e.key === 'ArrowDown' && nextIndex < navLinks.length) {
                    navLinks[nextIndex].focus();
                } else if (e.key === 'ArrowUp' && previousIndex >= 0) {
                    navLinks[previousIndex].focus();
                }
            }
        });
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

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    // Validation helpers
    function showFieldError(fieldId, message) {
        const errorEl = document.getElementById(fieldId + '-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
    }

    function clearFieldErrors() {
        document.querySelectorAll('.form-error').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^\+?254\d{9}$/.test(phone.replace(/\s+/g, ''));
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearFieldErrors();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const phone = contactForm.phone.value.trim();
        const service = contactForm.service.value;
        const message = contactForm.message.value.trim();
        let hasError = false;

        if (!name) {
            showFieldError('name', 'Please enter your full name');
            hasError = true;
        }

        if (!email) {
            showFieldError('email', 'Please enter your email address');
            hasError = true;
        } else if (!validateEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            hasError = true;
        }

        if (!phone) {
            showFieldError('phone', 'Please enter your phone number');
            hasError = true;
        } else if (!validatePhone(phone)) {
            showFieldError('phone', 'Please enter a valid Kenyan phone number (+254 7XX XXX XXX)');
            hasError = true;
        }

        if (hasError) return;

        // Submit to Formspree
        const formData = new FormData(contactForm);
        fetch('https://formspree.io/f/mjblvkyw', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Form submission failed');
            }
            return response.json();
        })
        .then(data => {
            contactForm.reset();
            formSuccess.hidden = false;
            formSuccess.setAttribute('aria-live', 'polite');
            formSuccess.focus();
            // Auto-hide after 10 seconds
            setTimeout(() => {
                formSuccess.hidden = true;
            }, 10000);
        })
        .catch(error => {
            console.error('Form submission error:', error);
            formError.style.display = 'block';
            formError.textContent = 'There was an error sending your message. Please try again.';
        });
    });

    // Dismiss success message button
    const dismissSuccess = document.getElementById('dismiss-success');
    if (dismissSuccess) {
        dismissSuccess.addEventListener('click', function() {
            formSuccess.hidden = true;
            contactForm.hidden = false;
            clearFieldErrors();
        });
    }

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