// SMOOTH SCROLLING & NAVIGATION

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open

            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// NAVBAR SCROLL EFFECT

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// MOBILE MENU TOGGLE

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// CUSTOM CURSOR

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth follower animation

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;
    
    followerX += distX / 10;
    followerY += distY / 10;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

// Cursor hover effects

const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .hamburger');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// BUTTON RIPPLE EFFECT

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// SCROLL REVEAL ANIMATION

const revealSections = document.querySelectorAll('.section-reveal');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// SKILL BARS ANIMATION

const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const animateSkills = () => {
    const skillsSection = document.querySelector('.skills');
    const skillsSectionTop = skillsSection.getBoundingClientRect().top;
    const triggerBottom = window.innerHeight * 0.8;
    
    if (skillsSectionTop < triggerBottom && !skillsAnimated) {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
        skillsAnimated = true;
    }
};

window.addEventListener('scroll', animateSkills);
animateSkills(); // Initial check

// ACTIVE NAV LINK ON SCROLL

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNav);

// PROJECT CARDS TILT EFFECT

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// PROFILE IMAGE PARALLAX

const profileImage = document.querySelector('.profile-placeholder');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.3;
    
    if (profileImage && scrolled < 800) {
        profileImage.style.transform = `translateY(${parallax}px)`;
    }
});

// BACKGROUND GRADIENT ANIMATION

const hero = document.querySelector('.hero');
let gradientAngle = 135;

const animateGradient = () => {
    gradientAngle = (gradientAngle + 0.1) % 360;
    requestAnimationFrame(animateGradient);
};

// Uncomment to enable continuous gradient animation
// animateGradient();

// TYPING EFFECT FOR HERO SUBTITLE

const subtitle = document.querySelector('.hero-subtitle');
const subtitleText = subtitle.textContent;
subtitle.textContent = '';

let charIndex = 0;

const typeWriter = () => {
    if (charIndex < subtitleText.length) {
        subtitle.textContent += subtitleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect after page load

window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// INTERSECTION OBSERVER FOR ANIMATIONS

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Animate skill cards with stagger effect

            if (entry.target.classList.contains('skills')) {
                const skillCards = entry.target.querySelectorAll('.skill-card');
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease forwards`;
                    }, index * 100);
                });
            }
            
            // Animate project cards with stagger effect

            if (entry.target.classList.contains('projects')) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease forwards`;
                    }, index * 150);
                });
            }
        }
    });
}, observerOptions);

// Observe all reveal sections

revealSections.forEach(section => observer.observe(section));

// SCROLL TO TOP ON PAGE LOAD

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// PREVENT CONTEXT MENU ON IMAGES

document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// GLASS CARD GLOW EFFECT

const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// PERFORMANCE OPTIMIZATION

// Debounce function for scroll events

function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions

window.addEventListener('scroll', debounce(() => {
    highlightNav();
    revealOnScroll();
    animateSkills();
}));

// CONSOLE EASTER EGG

console.log('%c👋 Welcome to Aakash\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using pure HTML, CSS, and JavaScript', 'color: #f59e0b; font-size: 14px;');
console.log('%cInterested in working together? Let\'s connect!', 'color: #9ca3af; font-size: 12px;');

// PAGE VISIBILITY API

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back!';
    } else {
        document.title = 'Aakash S - Developer Portfolio';
    }
});

// KEYBOARD NAVIGATION

document.addEventListener('keydown', (e) => {

    // Escape key closes mobile menu

    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Arrow keys for section navigation

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToNextSection();
    }
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToPrevSection();
    }
});

function scrollToNextSection() {
    const currentScroll = window.pageYOffset;
    let nextSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (sectionTop > currentScroll + 10 && !nextSection) {
            nextSection = section;
        }
    });
    
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPrevSection() {
    const currentScroll = window.pageYOffset;
    let prevSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (sectionTop < currentScroll - 10) {
            prevSection = section;
        }
    });
    
    if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// LAZY LOADING PLACEHOLDER

// Add data-src to images for lazy loading if needed in future

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
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

// ACTIVE LINK STYLING

// Add active class to current nav link

const currentLocation = window.location.hash;
if (currentLocation) {
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
}

// PREVENT FLASH ON PAGE LOAD

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// SCROLL PROGRESS INDICATOR (OPTIONAL)

// Uncomment to add a scroll progress bar at the top

const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #f59e0b);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// END OF SCRIPT

console.log('%c✨ All scripts loaded successfully!', 'color: #10b981; font-size: 12px;');

/* ===============================
   RESUME DOWNLOAD (VERCEL SAFE)
================================= */

document.addEventListener("DOMContentLoaded", () => {

    const RESUME_PATH = "./My_Resume.pdf"; 
    // ⚠️ Make sure filename EXACTLY matches GitHub (case-sensitive)

    function downloadResume() {
        fetch(RESUME_PATH, { method: "HEAD" })
            .then(response => {
                if (!response.ok) {
                    console.error("Resume file not found. Check filename & path.");
                    alert("Resume file not found. Please check deployment.");
                    return;
                }

                const link = document.createElement("a");
                link.href = RESUME_PATH;
                link.download = "Aakash_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(() => {
                console.error("Download failed.");
                alert("Download failed. Please try again.");
            });
    }

    /* Desktop navbar icon */
    const downloadIcon = document.querySelector(".download-icon");
    if (downloadIcon) {
        downloadIcon.addEventListener("click", downloadResume);
    }

    /* Mobile button */
    const mobileBtn = document.querySelector(".btn-third");
    if (mobileBtn) {
        mobileBtn.addEventListener("click", downloadResume);
    }

});
