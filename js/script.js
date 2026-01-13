// ==================== HAMBURGER MENU ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

// Toggle menu when hamburger is clicked
hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');

    // Update aria-expanded
    hamburger.setAttribute('aria-expanded', isActive);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
});

// Close menu when a link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
    }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
    }
});

// ==================== SMOOTH SCROLLING ====================
// Add smooth scroll behavior to all navigation links
// Add smooth scroll behavior to all navigation links
const navLinksAll = document.querySelectorAll('.site-nav a');

navLinksAll.forEach(link => {
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
    navLinksAll.forEach(link => link.classList.remove('active'));
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
    navLinksAll.forEach(link => {
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
window.addEventListener('scroll', throttle(highlightNavOnScroll, 100));


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
// ==================== CONSOLE MESSAGE ====================
// Fun easter egg for developers who inspect your site
console.log('%c👋 Hello, Developer!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #764ba2; font-size: 14px;');
console.log('%cFeel free to reach out: wambugugodfrey7@gmail.com', 'color: #555; font-size: 12px;');