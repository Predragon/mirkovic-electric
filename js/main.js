// Theme Switcher
function toggleTheme() {
    const body = document.body;
    const darkIcon = document.getElementById('darkIcon');
    const lightIcon = document.getElementById('lightIcon');
    
    // Toggle theme class
    body.classList.toggle('light-theme');
    
    // Toggle icon active states
    darkIcon.classList.toggle('active');
    lightIcon.classList.toggle('active');
    
    // Save preference in memory (no localStorage)
    window.currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    // Default to dark theme
    window.currentTheme = 'dark';
    
    // You could add auto-detection based on system preference here:
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // if (!prefersDark) {
    //     toggleTheme();
    // }
});

// Mobile Navigation Toggle
function toggleNav() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close Navigation
function closeNav() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            // Handle internal links
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                closeNav(); // Close mobile menu if open
            }
        });
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Form submission handler (you can customize this)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send to your backend
            console.log('Form submitted:', data);
            
            // Show success message (you can customize this)
            alert('Thank you! We will contact you soon.');
            this.reset();
        });
    }
});
