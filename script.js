const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

const logoContainer = document.querySelector('.logo-container');
if (logoContainer) {
    logoContainer.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card');
interactiveElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#FF69B4';
    });
    
    elem.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#FFB6D9';
    });
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            createSparkle(e.clientX, e.clientY);
        }
    });
});


function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-effect';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        z-index: 9999;
        pointer-events: none;
        animation: sparkle-fade 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-fade {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);



const typingText = document.querySelector('.typing-text');
const texts = ['Software Engineer', 'Creative Coder', 'Digital Artist', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeWriter, 500);
    } else {
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
}

typeWriter();



const playBtn = document.querySelector('.play-btn');
const playerDisplay = document.querySelector('.player-display');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? '❚❚' : '▶';
    
    if (isPlaying) {
        playerDisplay.textContent = '♪ Now Playing: Welcome to My Portfolio ♪';
        animatePlayerDisplay();
    } else {
        playerDisplay.textContent = '♪ Paused ♪';
    }
    
    playBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        playBtn.style.transform = 'scale(1)';
    }, 200);
});

function animatePlayerDisplay() {
    if (!isPlaying) return;
    
    const notes = ['♪', '♫', '♬', '♩'];
    let noteIndex = 0;
    
    const interval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        
        const note = notes[noteIndex % notes.length];
        playerDisplay.textContent = `${note} Now Playing: Welcome to My Portfolio ${note}`;
        noteIndex++;
    }, 500);
}



const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;
        
        elem.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(20px)`;
    });
    
    elem.addEventListener('mouseleave', () => {
        elem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});




const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('skill-category')) {
                const items = entry.target.querySelectorAll('.skill-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 50);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .experience-card, .project-card, .skill-category').forEach(elem => {
    elem.style.opacity = '0';
    elem.style.transform = 'translateY(20px)';
    elem.style.transition = 'all 0.6s ease';
    observer.observe(elem);
});

document.querySelectorAll('.skill-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px) scale(0.8)';
    item.style.transition = 'all 0.3s ease';
});



document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.classList.contains('close')) {
            const windowContainer = this.closest('.window-container');
            windowContainer.style.transform = 'scale(0)';
            windowContainer.style.opacity = '0';
            setTimeout(() => {
                windowContainer.style.transform = 'scale(1)';
                windowContainer.style.opacity = '1';
            }, 500);
        } else if (this.classList.contains('minimize')) {
            const windowBody = this.closest('.window-container').querySelector('.window-body');
            windowBody.style.display = windowBody.style.display === 'none' ? 'block' : 'none';
        } else if (this.classList.contains('maximize')) {
            const windowContainer = this.closest('.window-container');
            windowContainer.classList.toggle('maximized');
        }
        
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

const guestbookBtn = document.querySelector('.guestbook-btn');
const guestbookInput = document.querySelector('.guestbook-input');

guestbookBtn.addEventListener('click', () => {
    const message = guestbookInput.value.trim();
    
    if (message) {
        createConfetti();
        
        const originalText = guestbookBtn.innerHTML;
        guestbookBtn.innerHTML = '<span>Thank You!</span> <span class="btn-emoji">💕</span>';
        guestbookBtn.style.background = 'linear-gradient(135deg, #FFB6D9, #D8B7E5)';
        
        guestbookInput.value = '';
        
        setTimeout(() => {
            guestbookBtn.innerHTML = originalText;
            guestbookBtn.style.background = '';
        }, 2000);
    } else {
        guestbookInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            guestbookInput.style.animation = '';
        }, 500);
    }
});

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .window-container.maximized {
        position: fixed;
        top: 50px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        z-index: 1000;
    }
`;
document.head.appendChild(shakeStyle);



function createConfetti() {
    const colors = ['#FFB6D9', '#D8B7E5', '#87CEEB', '#FFF4BD', '#B2F2E1'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 0.5;
        
        confetti.style.cssText = `
            position: fixed;
            left: ${left}%;
            top: -10px;
            width: 10px;
            height: 10px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: fall ${animationDuration}s linear ${animationDelay}s forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + animationDelay) * 1000);
    }
}

const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallStyle);


document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const emojis = ['✨', '💫', '⭐', '🌟'];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        const floatingEmoji = document.createElement('div');
        floatingEmoji.textContent = emoji;
        floatingEmoji.style.cssText = `
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.5rem;
            pointer-events: none;
            animation: float-up 1s ease-out forwards;
        `;
        
        this.style.position = 'relative';
        this.appendChild(floatingEmoji);
        
        setTimeout(() => {
            floatingEmoji.remove();
        }, 1000);
    });
});

const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
    @keyframes float-up {
        to {
            transform: translateX(-50%) translateY(-30px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatUpStyle);


const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
            border-bottom: 3px solid var(--pink-main);
            box-shadow: 0 10px 30px rgba(255, 182, 217, 0.3);
            z-index: 999;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);



const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            activatePartyMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activatePartyMode() {
    document.body.style.animation = 'party 1s infinite';
    createConfetti();

    const partyMessage = document.createElement('div');
    partyMessage.innerHTML = '🎉 PARTY MODE ACTIVATED! 🎉';
    partyMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: bold;
        color: #FF69B4;
        text-align: center;
        z-index: 10000;
        animation: rainbow 1s infinite;
    `;
    
    document.body.appendChild(partyMessage);
    
    setTimeout(() => {
        partyMessage.remove();
        document.body.style.animation = '';
    }, 3000);
}

const partyStyle = document.createElement('style');
partyStyle.textContent = `
    @keyframes party {
        0%, 100% { transform: rotate(-1deg); }
        50% { transform: rotate(1deg); }
    }
    
    @keyframes rainbow {
        0% { color: #FF69B4; }
        20% { color: #87CEEB; }
        40% { color: #D8B7E5; }
        60% { color: #FFF4BD; }
        80% { color: #B2F2E1; }
        100% { color: #FF69B4; }
    }
`;
document.head.appendChild(partyStyle);


console.log('%c✨ Welcome to my Portfolio! ✨', 
    'color: #FF69B4; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(255,182,217,0.5);');
console.log('%c💿 Built with love and nostalgia 💿', 
    'color: #D8B7E5; font-size: 14px;');
console.log('%c🦋 Try the Konami Code for a surprise! 🦋', 
    'color: #87CEEB; font-size: 14px;');