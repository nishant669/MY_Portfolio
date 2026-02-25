const CERTS = [
    {
        id: 0,
        name: "Python Programming",
        company: "Reliance Foundation",
        icon: "fab fa-python",
        accent: "#3776ab",
        bg: "linear-gradient(135deg, #1a2a3a 0%, #0d1f2d 100%)",
        logoSeed: "coursera",
        imgSeed: "python-cert",
        desc: "Comprehensive course covering Python basics, data structures, and program development.",
        link: "https://coursera.org/verify/python-cert"
    },
    {
        id: 1,
        name: "The Complete C++ Programming",
        company: "Udemy",
        icon: "icon-cpp", 
        accent: "#00599C",
        bg: "linear-gradient(135deg, #001f3f 0%, #000a1a 100%)",
        logoSeed: "udemy",
        imgSeed: "webdev-cert",
        desc: "Comprehensive C++ development covering object-oriented programming, data structures, and memory management.",
        link: "https://udemy.com/certificate/webdev-cert"
    },
    {
        id: 2,
        name: "Javascript Essential",
        company: "Coursera",
        icon: "fab fa-js",
        accent: "#f7df1e",
        bg: "linear-gradient(135deg, #292400 0%, #171400 100%)",
        logoSeed: "microsoft",
        imgSeed: "azure-cert",
        desc: "Foundational knowledge of Javascript programming concepts and web interactivity.",
        link: "https://learn.microsoft.com/credentials/certifications/azure-fundamentals"
    },
    {
        id: 3,
        name: "MySQL",
        company: "HackerRank",
        icon: "fas fa-database",
        accent: "#f29111",
        bg: "linear-gradient(135deg, #2a1500 0%, #1a0d00 100%)",
        logoSeed: "oracle",
        imgSeed: "sql-cert",
        desc: "SQL fundamentals, data manipulation, and database design principles.",
        link: "https://education.oracle.com/database-programming-with-sql"
    },
    {
        id: 4,
        name: "Data Analytics Job Simulation",
        company: "Deloitte",
        icon: "fas fa-chart-line",
        accent: "#86bc25",
        bg: "linear-gradient(135deg, #0d1f05 0%, #061202 100%)",
        logoSeed: "google",
        imgSeed: "analytics-cert",
        desc: "In-demand data skills to get job-ready in less than 6 months.",
        link: "https://coursera.org/professional-certificates/google-data-analytics"
    },
    {
        id: 5,
        name: "Web Development & Web Design",
        company: "Skill India",
        icon: "fab fa-react",
        accent: "#61dafb",
        bg: "linear-gradient(135deg, #001533 0%, #000b20 100%)",
        logoSeed: "meta",
        imgSeed: "frontend-cert",
        desc: "Build job-ready skills for an in-demand front-end development career.",
        link: "https://coursera.org/professional-certificates/meta-front-end-developer"
    }
];

let deck = [...CERTS];
let dealtCards = [];
let revealedCount = 0;

const dealArea   = document.getElementById('dealt-area');
const deckBadge  = document.getElementById('deck-badge');
const deckPile   = document.getElementById('deck-pile');
const emptyHint  = document.getElementById('empty-hint');
const statDeck   = document.getElementById('stat-deck');
const statDealt  = document.getElementById('stat-dealt');
const statRev    = document.getElementById('stat-revealed');

function updateStats() {
    statDeck.textContent  = deck.length;
    statDealt.textContent = dealtCards.length;
    statRev.textContent   = revealedCount;
    deckBadge.textContent = deck.length;
    deckPile.style.opacity = deck.length === 0 ? '0.25' : '1';
    deckPile.style.pointerEvents = deck.length === 0 ? 'none' : 'auto';
}

function makeCard(cert) {
    const wrapper = document.createElement('div');
    wrapper.className = 'cert-card';
    wrapper.dataset.id = cert.id;
    wrapper.style.setProperty('--accent', cert.accent);

    wrapper.innerHTML = `
        <div class="card-front-face" style="background:${cert.bg}; border:1.5px solid ${cert.accent}44; box-shadow:0 0 30px ${cert.accent}33">
            <div class="symbol-glow-ring" style="--accent:${cert.accent}">
                <div class="inner-ring"></div>
                <i class="${cert.icon} symbol-icon-big"></i>
            </div>
            <div class="card-cert-name">${cert.name}</div>
            <div class="card-company-badge">${cert.company}</div>
            <div class="flip-hint-tag"><i class="fas fa-hand-pointer"></i> tap to reveal</div>
        </div>
        <div class="card-back-face">
            <div class="back-header">
                <img src="https://picsum.photos/seed/${cert.logoSeed}/50/50" class="back-logo" alt="${cert.company}">
                <div class="back-title">${cert.name}</div>
            </div>
            <img src="https://picsum.photos/seed/${cert.imgSeed}/300/180" class="back-cert-img" alt="Certificate" loading="lazy">
            <div class="back-desc">${cert.desc}</div>
            <a href="${cert.link}" target="_blank" rel="noopener" class="cert-link-btn">
                <i class="fas fa-external-link-alt"></i> View Certificate
            </a>
        </div>`;

    wrapper.addEventListener('click', () => toggleFlip(wrapper));
    return wrapper;
}

function toggleFlip(card) {
    const wasFlipped = card.classList.contains('flipped');
    card.classList.toggle('flipped');
    card.classList.toggle('unflipped');
    if (!wasFlipped) {
        revealedCount++;
        burst(card);
    } else {
        revealedCount = Math.max(0, revealedCount - 1);
    }
    updateStats();
}

function dealOne() {
    if (deck.length === 0) return;
    const cert = deck.shift();
    dealtCards.push(cert);
    emptyHint.style.display = 'none';
    const card = makeCard(cert);
    dealArea.appendChild(card);
    updateStats();
    deckBounce();
}

function deckBounce() {
    const top = deckPile.querySelector('.deck-top');
    top.style.transition = 'transform 0.1s';
    top.style.transform = 'translateY(-12px) scale(1.03)';
    setTimeout(() => { top.style.transform = ''; top.style.transition = ''; }, 200);
}

function dealAll() {
    let delay = 0;
    const count = deck.length; 
    for(let i = 0; i < count; i++) {
        setTimeout(dealOne, delay);
        delay += 120;
    }
}

function flipAll() {
    const unflippedCards = document.querySelectorAll('.cert-card:not(.flipped)');
    unflippedCards.forEach((c, i) => {
        setTimeout(() => {
            if (!c.classList.contains('flipped')) {
                toggleFlip(c);
            }
        }, i * 80);
    });
}

function reset() {
    deck = [...CERTS];
    dealtCards = [];
    revealedCount = 0;
    dealArea.innerHTML = '';
    emptyHint.style.display = 'flex';
    dealArea.appendChild(emptyHint);
    updateStats();
}

function burst(el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#f5c842','#ff2d78','#9b4dff','#00f5ff','#fff'];
    for (let i = 0; i < 18; i++) {
        const bit = document.createElement('div');
        bit.className = 'confetti-bit';
        const angle = Math.random() * 360;
        const dist  = 60 + Math.random() * 80;
        bit.style.cssText = `
            left:${cx}px; top:${cy}px;
            background:${colors[Math.floor(Math.random()*colors.length)]};
            --dx:${Math.cos(angle*Math.PI/180)*dist}px;
            --dy:${Math.sin(angle*Math.PI/180)*dist}px;
            --dr:${Math.random()*360}deg;
            border-radius:${Math.random()>0.5?'50%':'2px'};
        `;
        document.body.appendChild(bit);
        setTimeout(() => bit.remove(), 950);
    }
}

document.getElementById('deal-one-btn').addEventListener('click', dealOne);
document.getElementById('deal-all-btn').addEventListener('click', dealAll);
document.getElementById('flip-all-btn').addEventListener('click', flipAll);
document.getElementById('reset-btn').addEventListener('click', reset);
deckPile.addEventListener('click', dealOne);

// "Hello World" Loader Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.transform = 'translateY(-100%)'; 
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
        }, 800); 
    }, 2400); 
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Effect
const typingTexts = ['Full Stack Developer', 'Web Designer', 'Problem Solver', 'Tech Enthusiast'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typingText');

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, pauseTime);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }
    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

typeText();

// Particle Background
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const numberOfParticles = 100;
    
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 77, 255, ${particle.opacity})`;
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
    });
    
    particles.forEach((particle1, index) => {
        particles.slice(index + 1).forEach(particle2 => {
            const distance = Math.sqrt(
                Math.pow(particle1.x - particle2.x, 2) +
                Math.pow(particle1.y - particle2.y, 2)
            );
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle1.x, particle1.y);
                ctx.lineTo(particle2.x, particle2.y);
                ctx.strokeStyle = `rgba(155, 77, 255, ${0.1 * (1 - distance / 100)})`;
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00f5ff)';
    
    this.reset();
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
    }, 3000);
});

updateStats();

// Keyboard shortcuts for certification deck
document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { 
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault(); 
            dealOne(); 
        }
    }
    if (e.key === 'r' || e.key === 'R') reset();
    if (e.key === 'f' || e.key === 'F') flipAll();
    if (e.key === 'a' || e.key === 'A') dealAll();
});

const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});