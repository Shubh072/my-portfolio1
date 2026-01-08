// Portfolio Interactive Features
let isLightTheme = false;
let fabOpen = false;

document.addEventListener('DOMContentLoaded', function() {
    // Hide loading overlay
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loading-overlay');
        loadingOverlay.classList.add('hidden');
    }, 1500);

    // Create particle background
    createParticles();
    
    // Create cursor trail
    createCursorTrail();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.experience-card, .project-card, .skill-category, .certification-card');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Typing effect for hero name
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.borderRight = '2px solid var(--accent-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroName.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.profile-img');
        if (heroImage) {
            const speed = 0.5;
            heroImage.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)';
                
                // Show success modal
                openModal('contact-success-modal');
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'var(--gradient-primary)';
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Add hover sound effect (visual feedback)
    const interactiveElements = document.querySelectorAll('.experience-card, .project-card, .skill-category, .cta-button, .submit-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform || 'translateY(0)';
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Skill items animation on hover
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project cards staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });

    // Experience cards staggered animation
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });

    // Certification cards staggered animation
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add('fade-in-up');
    });

    // Add loading animation to page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Cursor trail effect (optional)
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
});

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Floating Action Button Functions
function toggleFAB() {
    const fabMain = document.querySelector('.fab-main');
    const fabOptions = document.querySelector('.fab-options');
    
    fabOpen = !fabOpen;
    
    if (fabOpen) {
        fabMain.classList.add('active');
        fabOptions.classList.add('active');
    } else {
        fabMain.classList.remove('active');
        fabOptions.classList.remove('active');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    toggleFAB();
}

function toggleTheme() {
    isLightTheme = !isLightTheme;
    document.body.classList.toggle('theme-light', isLightTheme);
    
    const themeIcon = document.querySelector('.fab-option i.fa-moon');
    if (themeIcon) {
        themeIcon.className = isLightTheme ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    showToast(isLightTheme ? 'Switched to Light Theme' : 'Switched to Dark Theme');
    toggleFAB();
}

function sharePortfolio() {
    if (navigator.share) {
        navigator.share({
            title: 'Shubham Gayakwad - Portfolio',
            text: 'Check out my cybersecurity and programming portfolio!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Portfolio link copied to clipboard!');
        });
    }
    toggleFAB();
}

// Toast Notification
function showToast(message, duration = 3000) {
    const toast = document.getElementById('notification-toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function closeToast() {
    const toast = document.getElementById('notification-toast');
    toast.classList.remove('show');
}

// Particle Background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Cursor Trail
function createCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX - 10 + 'px';
        trail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Skill Detail Modal
function showSkillDetails(skillName) {
    const skillDetails = {
        'Python': {
            description: 'Advanced Python programming with focus on cybersecurity applications',
            experience: '3+ years',
            projects: ['Security Scanner', 'Data Analysis Tool', 'Automation Scripts'],
            certifications: ['Python Institute PCAP', 'Advanced Python Certification']
        },
        'Java': {
            description: 'Object-oriented programming and enterprise application development',
            experience: '2+ years',
            projects: ['Security Framework', 'Web Applications', 'Database Management'],
            certifications: ['Oracle Java SE Certification']
        },
        // Add more skills as needed
    };
    
    const details = skillDetails[skillName];
    if (details) {
        const content = document.getElementById('skill-details-content');
        content.innerHTML = `
            <h3>${skillName}</h3>
            <p><strong>Description:</strong> ${details.description}</p>
            <p><strong>Experience:</strong> ${details.experience}</p>
            <p><strong>Key Projects:</strong></p>
            <ul>
                ${details.projects.map(project => `<li>${project}</li>`).join('')}
            </ul>
            <p><strong>Certifications:</strong></p>
            <ul>
                ${details.certifications.map(cert => `<li>${cert}</li>`).join('')}
            </ul>
        `;
        openModal('skills-modal');
    }
}

// Enhanced Animations
function addEnhancedAnimations() {
    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .resume-link');
    ctaButtons.forEach(btn => {
        btn.classList.add('pulse-animation');
    });
    
    // Add float animation to profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.classList.add('float-animation');
    }
    
    // Add glow effect to hero name
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        heroName.classList.add('glow-text');
    }
}

// Initialize enhanced animations
setTimeout(addEnhancedAnimations, 2000);

// Add CSS for active nav link and other dynamic styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-primary) !important;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--accent-primary);
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-content {
        transform: scale(0.7);
        transition: transform 0.3s ease;
    }
    
    .skill-item {
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// Add click handlers to skill items
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('skill-item')) {
        showSkillDetails(e.target.textContent);
    }
});

// Certificate Detail Modal Function
function viewCertificate(certId) {
    openModal(certId);
}