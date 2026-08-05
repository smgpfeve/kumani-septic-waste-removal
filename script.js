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

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[\+]?[0-9\s\-\(\)]{10,}$/;

    // Show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorSpan = formGroup.querySelector('.form-error');
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', input.id + '-error');
        errorSpan.textContent = message;
        errorSpan.id = input.id + '-error';
    }

    // Clear error message
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorSpan = formGroup.querySelector('.form-error');
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
        errorSpan.textContent = '';
        errorSpan.id = '';
    }

    // Validate individual field
    function validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        const name = input.name;

        clearError(input);

        if (input.hasAttribute('required') && !value) {
            showError(input, `${name.charAt(0).toUpperCase() + name.slice(1)} is required`);
            return false;
        }

        if (type === 'email' && value && !emailPattern.test(value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }

        if (type === 'tel' && value && !phonePattern.test(value)) {
            showError(input, 'Please enter a valid phone number');
            return false;
        }

        return true;
    }

    // Validate entire form
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Add real-time validation on blur
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') || this.value.trim()) {
                validateField(this);
            }
        });

        field.addEventListener('input', function() {
            if (this.getAttribute('aria-invalid') === 'true') {
                validateField(this);
            }
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            // Focus first invalid field
            const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }

        // Submit form to Formspree
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                contactForm.reset();
                formSuccess.hidden = false;
                contactForm.hidden = true;
                setTimeout(() => {
                    formSuccess.hidden = true;
                    contactForm.hidden = false;
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('There was an error sending your message. Please try again or contact us directly.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
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