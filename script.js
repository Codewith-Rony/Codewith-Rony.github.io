// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    const isDark = body.getAttribute('data-theme') === 'light';
    icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
    bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    bars[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => bar.style.transform = 'none');
        bars[1].style.opacity = '1';
    });
});

// Smooth scrolling and active navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .home-section');

function setActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Navbar scroll effects & progress bar
const navbar = document.getElementById('navbar');
const scrollProgressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    // Scroll progress
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (scrollProgressBar) {
        scrollProgressBar.style.width = scrollPercent + '%';
    }

    // Navbar class toggle
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typewriter Effect
const typewriter = document.getElementById('typewriter');
const phrases = [
    'Software Engineer',
    'Full Stack Developer',
    'AI/ML Enthusiast',
    'Flutter Developer'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typewriterEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40; // Faster deletion
    } else {
        typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80; // Smooth typing speed
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2200; // Pause at the end of phrase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Pause before typing next phrase
    }

    setTimeout(typewriterEffect, typingSpeed);
}

// Start typewriter effect after page load
window.addEventListener('load', () => {
    setTimeout(typewriterEffect, 1200);
});

// Keyboard accessibility for toggles
[navToggle, themeToggle].forEach(toggle => {
    if (toggle) {
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
    }
});

// Particles Animation
function createParticles() {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 15 : 35;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size and position
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-arrow');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSec = document.getElementById('about');
        if (aboutSec) aboutSec.scrollIntoView({ behavior: 'smooth' });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger skill progress bars
            if (entry.target.classList.contains('skills-section')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Animate skill progress bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            setTimeout(() => {
                bar.style.width = width;
            }, Math.random() * 500);
        }
    });
}

// Contact Form
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            if (formMessage) formMessage.classList.add('show');
            
            // Reset form after showing message
            setTimeout(() => {
                contactForm.reset();
                if (formMessage) formMessage.classList.remove('show');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 5000);
        }, 1500);
    });
}

// Smooth reveal animations on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('[class*="fadeIn"], [class*="slideIn"]');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize animations on load
window.addEventListener('load', () => {
    revealOnScroll();
    setActiveNav();
});

// Handle window resize for particles
window.addEventListener('resize', () => {
    const particlesContainer = document.getElementById('particles');
    particlesContainer.innerHTML = '';
    createParticles();
});

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const formData = new FormData();

    formData.append("entry.801995976", name);
    formData.append("entry.481586520", email);
    formData.append("entry.1446534767", message);

    await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdt1REa8Cb8kkuwb3uAvsru3aYjqmzDThVHbIAz3ZPE6BsAeQ/formResponse",
        {
            method: "POST",
            mode: "no-cors",
            body: formData
        }
    );

    alert("Message sent successfully!");

    form.reset();
});