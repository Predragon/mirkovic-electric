// Mobile menu toggle
document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! We will contact you shortly.');
    this.reset();
});
