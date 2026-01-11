// ==================== SMOOTH SCROLLING ====================
// Add smooth scroll behavior to all navigation links
const navLinks = document.querySelectorAll('.site-nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Scroll to the section with smooth behavior
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active link
            updateActiveLink(this);
        }
    });
});

// ==================== ACTIVE LINK MANAGEMENT ====================
function updateActiveLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// ==================== SCROLL HIGHLIGHTING ====================
// Highlight the active section in navigation as user scrolls
const sections = document.querySelectorAll('section');
const navHeight = document.querySelector('.site-nav').offsetHeight;

function highlightNavOnScroll() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if section is in viewport (with offset for sticky nav)
        if (window.pageYOffset >= sectionTop - navHeight - 100) {
            current = section.getAttribute('id');
        }
    });

    // Update active navigation link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Throttle function to improve performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction() {
        const later = () => {
            clearTimeout(timeout);
            func();
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll event listener with throttling
window.addEventListener('scroll', throttle(() => {
    highlightNavOnScroll();

    // Toggle scrolled class for shrinking nav
    const nav = document.querySelector('.site-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, 100));

// ==================== SECTION HOVER EFFECTS ====================
// Enhanced hover effects for sections
sections.forEach(section => {
    section.addEventListener('mouseenter', function () {
        this.style.backgroundColor = '#fafafa';
    });

    section.addEventListener('mouseleave', function () {
        this.style.backgroundColor = '#ffffff';
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
// Add fade-in animation when sections come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ==================== DYNAMIC COPYRIGHT YEAR ====================
// Update copyright year automatically
const footer = document.querySelector('.site-footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = `&copy; ${currentYear} Developed by Godfrey Wambugu. All rights reserved.`;
}

// ==================== EXTERNAL LINK HANDLING ====================
// Add target="_blank" to external links automatically
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ==================== FORM VALIDATION (for future contact form) ====================
// You can add this when you create a contact form
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== MOBILE MENU TOGGLE (if needed in future) ====================
// Placeholder for mobile menu functionality
function toggleMobileMenu() {
    const nav = document.querySelector('.site-nav');
    nav.classList.toggle('mobile-active');
}

// ==================== PERFORMANCE: LAZY LOAD IMAGES (for future use) ====================
// When you add images to your projects
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call lazy load when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ==================== CONSOLE MESSAGE ====================
// Fun easter egg for developers who inspect your site
console.log('%c👋 Hello, Developer!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #764ba2; font-size: 14px;');
console.log('%cFeel free to reach out: wambugugodfrey7@gmail.com', 'color: #555; font-size: 12px;');
