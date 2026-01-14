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
    document.body.style.overflow = isActive ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
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

// ==================== PROJECT FILTERING ====================
const filterButtons = document.querySelectorAll('.filter-controls button');
const projects = document.querySelectorAll('.project');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });

        // Add active class to clicked button
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        const filter = button.dataset.filter;

        projects.forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                project.removeAttribute('hidden');
                // Optional: simple fade in
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            } else {
                project.setAttribute('hidden', '');
                // Ensure it's visually hidden if CSS overrides [hidden]
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
            }
        });
    });
});
const form = document.getElementById("contactForm");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!email.checkValidity()) {
        emailError.textContent = "Enter a valid email address.";
        email.focus();
        return;
    } else {
        emailError.textContent = "";
    }

    // Simulate submission
    const btn = form.querySelector("button");
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = "✅ Message Sent!";
        btn.style.backgroundColor = "#2ecc71";

        // Reset form
        form.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = ""; // Reverts to CSS
        }, 3000);
    }, 2000);
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