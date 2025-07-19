// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(255, 215, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }
        
        // Simulate form submission
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        this.reset();
    });
}

// Reward card click handlers - Direct link navigation
document.querySelectorAll('.reward-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Let the link work normally - no prevention
        // The href will handle the navigation directly
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .reward-card, .step-card, .stat-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (!isNaN(number)) {
                    animateCounter(statNumber, number);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stat items
document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item, .stat-card');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add some interactive effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Add some fun hover effects to cards
document.querySelectorAll('.reward-card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotate(1deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Create Price Ticker with Live BTC Price
function createPriceTicker() {
    const ticker = document.createElement('div');
    ticker.className = 'price-ticker';
    ticker.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #ffd700;">₿</span>
            <span id="btc-price">Yükleniyor...</span>
            <span id="btc-change" style="color: #00ff00;">--</span>
        </div>
    `;
    document.body.appendChild(ticker);
    
    // Fetch live BTC price from CoinGecko API
    async function fetchBTCPrice() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
            const data = await response.json();
            
            if (data.bitcoin) {
                const price = data.bitcoin.usd;
                const change24h = data.bitcoin.usd_24h_change;
                
                const priceElement = document.getElementById('btc-price');
                const changeElement = document.getElementById('btc-change');
                
                if (priceElement && changeElement) {
                    // Format price with commas
                    const formattedPrice = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(price);
                    
                    priceElement.textContent = formattedPrice;
                    
                    // Format change percentage
                    const changeText = `${change24h >= 0 ? '+' : ''}${change24h.toFixed(2)}%`;
                    changeElement.textContent = changeText;
                    changeElement.style.color = change24h >= 0 ? '#00ff00' : '#ff0000';
                }
            }
        } catch (error) {
            console.error('BTC fiyatı alınamadı:', error);
            const priceElement = document.getElementById('btc-price');
            if (priceElement) {
                priceElement.textContent = 'Bağlantı Hatası';
            }
        }
    }
    
    // Initial fetch
    fetchBTCPrice();
    
    // Update every 30 seconds
    setInterval(fetchBTCPrice, 30000);
}

// Create Trading Chart Animation
function createTradingChart() {
    const chart = document.querySelector('.trading-chart');
    if (chart) {
        // Add moving dots
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            dot.style.width = '4px';
            dot.style.height = '4px';
            dot.style.background = '#ffd700';
            dot.style.borderRadius = '50%';
            dot.style.animation = `moveDot ${3 + i}s linear infinite`;
            dot.style.animationDelay = `${i}s`;
            chart.appendChild(dot);
        }
        
        // Add CSS for dot animation
        const chartStyle = document.createElement('style');
        chartStyle.textContent = `
            @keyframes moveDot {
                0% {
                    left: 0%;
                    top: 50%;
                    transform: translateY(-50%);
                }
                25% {
                    left: 25%;
                    top: 30%;
                }
                50% {
                    left: 50%;
                    top: 70%;
                }
                75% {
                    left: 75%;
                    top: 20%;
                }
                100% {
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        `;
        document.head.appendChild(chartStyle);
    }
}

// Add Trading Indicators
function addTradingIndicators() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Add trading indicators
        for (let i = 0; i < 3; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'trading-indicator';
            indicator.style.left = `${20 + i * 30}%`;
            indicator.style.top = `${30 + i * 20}%`;
            indicator.style.animationDelay = `${i}s`;
            hero.appendChild(indicator);
        }
    }
}

// Add Glow Effect to Cards
function addGlowEffect() {
    document.querySelectorAll('.reward-card, .service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 40px rgba(255, 215, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });
}

// Add Particle Effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#ffd700';
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0.6';
            particle.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            hero.appendChild(particle);
        }
        
        // Add CSS for particle animation
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0.6;
                }
                50% {
                    transform: translateY(-20px) translateX(10px);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
}

// Initialize all trading effects
document.addEventListener('DOMContentLoaded', () => {
    createPriceTicker();
    createTradingChart();
    addTradingIndicators();
    addGlowEffect();
    createParticles();
});

// Add sound effect for button clicks (optional)
function addClickSound() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Create a simple click sound effect
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        });
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    if (e.key === 'r' || e.key === 'R') {
        // Scroll to rewards section
        const rewardsSection = document.querySelector('#rewards');
        if (rewardsSection) {
            rewardsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

console.log('Boyka Trade Topluluğu websitesi yüklendi! 🚀');
console.log('Trading teması aktif - Siyah & Altın renk paleti kullanılıyor 💰'); 