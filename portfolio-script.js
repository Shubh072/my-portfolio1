/**
 * Shubham Gayakwad - Portfolio Scripts
 * Clean, lightweight, professional UI interactions
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking any navigation link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll();

    // 3. Smooth Scroll for Anchor Links with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 72;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Back to Top Button Visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    }

    // 5. Global ESC Key Handler to close modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeCertModal();
        }
    });
});

/**
 * Scroll smoothly to top of the page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Open the Certificate PDF preview modal
 */
function openCertModal(pdfUrl, title) {
    const modal = document.getElementById('cert-modal');
    const iframe = document.getElementById('cert-modal-iframe');
    const titleElem = document.getElementById('cert-modal-title');
    const downloadLink = document.getElementById('cert-modal-download-link');

    if (modal && iframe) {
        if (titleElem) titleElem.textContent = title || 'Certificate Preview';
        if (downloadLink) downloadLink.href = pdfUrl;
        iframe.src = pdfUrl;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close the Certificate PDF preview modal
 */
function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    const iframe = document.getElementById('cert-modal-iframe');

    if (modal) {
        modal.classList.remove('active');
        if (iframe) iframe.src = '';
        document.body.style.overflow = '';
    }
}

/**
 * Close Certificate Modal when clicking outside dialog
 */
function closeCertModalOnBackdrop(event) {
    if (event.target.id === 'cert-modal') {
        closeCertModal();
    }
}

/**
 * Handle Contact Form submission
 */
function handleContactSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-form-feedback');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (!form || !feedback) return;

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();

    if (!name || !email) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Please fill out all required fields.';
        feedback.classList.remove('hidden');
        return;
    }

    // Indicate submission
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }

    setTimeout(() => {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been sent successfully. I will get back to you shortly.`;
        feedback.classList.remove('hidden');
        form.reset();

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }

        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 6000);
    }, 800);
}
