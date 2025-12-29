// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading').classList.add('hide');
    }, 1000);
});

// Navbar Scroll Effect
var navbar = document.getElementById('navbar');
var lastScroll = 0;

window.addEventListener('scroll', function() {
    var currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Hamburger Menu
var hamburger = document.getElementById('hamburger');
var navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav links
var navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link
var sections = document.querySelectorAll('section');
var navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    var current = '';
    
    sections.forEach(function(section) {
        var sectionTop = section.offsetTop;
        var sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Scroll To Top Button
var scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing Effect
var typingText = document.querySelector('.typing-text');
var texts = [
    'Web Developer',
    'UI/UX Designer',
    'Digital Creator',
    'Problem Solver'
];
var textIndex = 0;
var charIndex = 0;
var isDeleting = false;
var typingSpeed = 100;

function type() {
    var currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect
type();

// Animate Skills on Scroll
function animateSkills() {
    var skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(function(card) {
        var cardPosition = card.getBoundingClientRect().top;
        var screenPosition = window.innerHeight;
        
        if (cardPosition < screenPosition - 100) {
            var progress = card.querySelector('.skill-progress');
            var targetWidth = progress.getAttribute('data-progress');
            progress.style.width = targetWidth + '%';
        }
    });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Intersection Observer for animations
var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    var animateElements = document.querySelectorAll('.skill-card, .soft-skill-card, .project-card, .education-card');
    
    animateElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
});

// Contact Form - MAILTO VERSION
var contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Mohon isi semua field!');
            return;
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Email tidak valid!');
            return;
        }
        
        // Create mailto link
        var mailtoLink = 'mailto:gungrama556@gmail.com' +
                         '?subject=' + encodeURIComponent(subject) +
                         '&body=' + encodeURIComponent(
                             'Nama: ' + name + '\n' +
                             'Email: ' + email + '\n\n' +
                             'Pesan:\n' + message
                         );
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Email client akan terbuka. Silakan kirim email dari aplikasi email Anda.');
        
        // Reset form
        contactForm.reset();
    });
}

// Parallax Effect for Hero
window.addEventListener('scroll', function() {
    var scrolled = window.pageYOffset;
    var heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = 'translateY(' + scrolled * 0.3 + 'px)';
    }
});

// Add hover effect to project cards
var projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Prevent default behavior for demo links
document.querySelectorAll('a[href="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#' && !this.classList.contains('nav-link')) {
            e.preventDefault();
            alert('Ini adalah link demo. Ganti dengan URL project yang sebenarnya.');
        }
    });
});

// Add active state to form inputs
var formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(function(input) {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Console message
console.log('%c👋 Halo! Terima kasih sudah mengunjungi portfolio saya!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cJika Anda tertarik untuk berkolaborasi, jangan ragu untuk menghubungi saya! 🚀', 'font-size: 14px; color: #764ba2;');