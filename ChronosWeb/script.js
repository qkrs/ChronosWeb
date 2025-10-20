// FORMA - Enhanced JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize theme
    initializeTheme();
    
    // Initialize loading screen
    initializeLoadingScreen();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks_mobile = document.querySelector('.nav-links');
    
    if (navToggle && navLinks_mobile) {
        navToggle.addEventListener('click', function() {
            navLinks_mobile.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', 
                navToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    }
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Scroll progress bar
    initializeScrollProgress();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(28, 28, 28, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .value-card, .card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Contact form removed: no initialization needed
    
    // Back to top button
    initializeBackToTop();
    
    // Intersection Observer for animations
    initializeScrollAnimations();

    // Magnetic buttons
    initializeMagneticButtons();

    // Tilt hover (removed for works) keep available if needed elsewhere

    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Handle HTML tags
                    let tagEnd = text.indexOf('>', i);
                    heroTitle.innerHTML += text.slice(i, tagEnd + 1);
                    i = tagEnd + 1;
                } else {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for geometric shapes
    const shapes = document.querySelectorAll('.geometric-shape');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Stats removed

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-links.active {
            display: flex !important;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            z-index: 999;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
}

// Navigation helpers
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.removeAttribute('aria-current');
        if (link.getAttribute('href') === targetId) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

function closeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

// Form and testimonials removed

// Back to top button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .value-card, .card, .work-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Scroll progress
function initializeScrollProgress() {
    const bar = document.querySelector('.scroll-progress__bar');
    if (!bar) return;
    const onScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Magnetic buttons
function initializeMagneticButtons() {
    const magnets = document.querySelectorAll('.magnetic');
    const strength = 20;
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${relX / strength}px, ${relY / strength}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0,0)';
        });
    });
}

// Tilt hover cards
function initializeTiltCards() {
    const cards = document.querySelectorAll('.tilt');
    cards.forEach(card => {
        const damp = 20;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 8;
            const rotateX = ((y / rect.height) - 0.5) * -8;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)';
        });
    });
}
