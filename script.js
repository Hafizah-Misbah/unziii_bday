// Typing effect parameters
const openingText = "Hey Unziiii... Happy Birthday! ✨";
let typeIndex = 0;

function typeWriter() {
    const typingElement = document.getElementById("typing-text");
    if (typingElement && typeIndex < openingText.length) {
        typingElement.innerHTML += openingText.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 90);
    }
}

// Screen Navigation Function
function nextScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));
    
    const target = document.getElementById(screenId);
    if(target) {
        target.classList.add('active');
    }
}

// Final Reveal + Confetti Trigger
function triggerFinalReveal() {
    nextScreen('screen-final');
    launchConfetti();
}

// Flip photo cards
function revealPhoto(cardElement) {
    cardElement.classList.toggle('flipped');
}

// Sky Blue Particles Background
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    for(let i = 0; i < 65; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.7 + 0.3
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if(p.x < 0) p.x = canvas.width;
            if(p.x > canvas.width) p.x = 0;
            if(p.y < 0) p.y = canvas.height;
            if(p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(135, 206, 235, ${p.alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00d2ff";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// Floating Sky Blue Balloons Generator
function createBalloons() {
    const container = document.getElementById('balloonContainer');
    if(!container) return;
    for (let i = 0; i < 12; i++) {
        let balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 90}%`;
        balloon.style.animationDelay = `${Math.random() * 6}s`;
        balloon.style.animationDuration = `${6 + Math.random() * 5}s`;
        container.appendChild(balloon);
    }
}

// Confetti Effect (Black & Sky Blue Tones)
function launchConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#87ceeb', '#00d2ff', '#ffffff', '#111111']
        });
    }
}

// Attach functions to Global Window Object for Vite Module Support
window.nextScreen = nextScreen;
window.triggerFinalReveal = triggerFinalReveal;
window.revealPhoto = revealPhoto;
window.launchConfetti = launchConfetti;

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    typeWriter();
    initParticles();
    createBalloons();
});