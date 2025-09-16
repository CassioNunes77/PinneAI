// PINEE.AI Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeHeroAnimations();
    initializeDemoChat();
    initializeScrollAnimations();
    initializePricingCards();
    initializeTypingAnimation();
});

// Navigation functionality
function initializeNavigation() {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Smooth scroll for navigation links
    const navLinksElements = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinksElements.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero section animations
function initializeHeroAnimations() {
    const heroStats = document.querySelectorAll('.stat-number');
    const heroButtons = document.querySelectorAll('.hero-actions button');

    // Animate statistics counter
    const animateCounter = (element, target) => {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            
            let currentValue;
            if (target.includes('K+')) {
                currentValue = Math.floor(easeOutCubic * 50) + 'K+';
            } else if (target.includes('B+')) {
                currentValue = 'R$ ' + Math.floor(easeOutCubic * 2) + 'B+';
            } else if (target.includes('%')) {
                currentValue = (easeOutCubic * 99.9).toFixed(1) + '%';
            }
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    };

    // Intersection Observer for hero stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.textContent;
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    heroStats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Button hover effects
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Demo chat functionality
function initializeDemoChat() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    const demoMessages = document.getElementById('demo-messages');
    const demoInput = document.getElementById('demo-input');

    // Demo scenarios
    const demoScenarios = {
        investment: [
            {
                type: 'user',
                content: 'Quais são os melhores investimentos para 2024?'
            },
            {
                type: 'ai',
                content: 'Com base na análise atual do mercado, recomendo:<br><br>📊 <strong>Fundos Imobiliários (25%)</strong><br>📈 <strong>Ações de dividendos (30%)</strong><br>💎 <strong>Tesouro IPCA+ (25%)</strong><br>🌱 <strong>Criptomoedas (20%)</strong><br><br>Diversificação é fundamental para reduzir riscos!'
            }
        ],
        budget: [
            {
                type: 'user',
                content: 'Como posso organizar melhor meu orçamento mensal?'
            },
            {
                type: 'ai',
                content: 'Aqui está um plano personalizado para seu orçamento:<br><br>💰 <strong>Regra 50/30/20:</strong><br>• 50% - Gastos essenciais<br>• 30% - Gastos pessoais<br>• 20% - Poupança e investimentos<br><br>📱 Use nosso app para rastrear gastos automaticamente!'
            }
        ],
        analysis: [
            {
                type: 'user',
                content: 'Analise meu portfólio de investimentos atual'
            },
            {
                type: 'ai',
                content: '📊 <strong>Análise do seu portfólio:</strong><br><br>✅ Diversificação: Boa (8/10)<br>⚠️ Risco: Moderado-Alto<br>📈 Performance: +12.5% (ano)<br>🎯 Recomendação: Aumentar posição em renda fixa para equilibrar o risco.<br><br>Quer um relatório detalhado?'
            }
        ]
    };

    // Switch demo scenarios
    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            demoButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Load scenario
            const scenario = button.dataset.demo;
            loadDemoScenario(demoMessages, demoScenarios[scenario]);
        });
    });

    // Load initial scenario
    loadDemoScenario(demoMessages, demoScenarios.investment);

    // Demo input functionality
    if (demoInput) {
        const demoSendButton = demoInput.nextElementSibling;
        
        const sendDemoMessage = () => {
            const message = demoInput.value.trim();
            if (message) {
                addDemoMessage(demoMessages, 'user', message);
                demoInput.value = '';
                
                // Simulate AI response
                setTimeout(() => {
                    const responses = [
                        'Excelente pergunta! Com base nos dados atuais do mercado, posso te ajudar com uma análise detalhada...',
                        'Analisando sua situação financeira... Aqui estão algumas recomendações personalizadas para você.',
                        'Baseado no seu perfil de investidor, identifiquei algumas oportunidades interessantes no mercado atual.'
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addDemoMessage(demoMessages, 'ai', randomResponse);
                }, 1000);
            }
        };

        demoSendButton.addEventListener('click', sendDemoMessage);
        demoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendDemoMessage();
            }
        });
    }
}

// Load demo scenario
function loadDemoScenario(container, messages) {
    container.innerHTML = '';
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            addDemoMessage(container, message.type, message.content);
        }, index * 1000);
    });
}

// Add demo message
function addDemoMessage(container, type, content) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}-message`;
    
    if (type === 'user') {
        messageElement.innerHTML = `
            <div class="message-content">${content}</div>
        `;
    } else {
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${content}</div>
            </div>
        `;
    }
    
    container.appendChild(messageElement);
    container.scrollTop = container.scrollHeight;
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
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special handling for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Pricing cards interactivity
function initializePricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        const button = card.querySelector('button');
        
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--primary-color)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.borderColor = 'var(--gray-200)';
            }
        });
        
        // Button click effects
        if (button) {
            button.addEventListener('click', () => {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Simulate action
                console.log('Pricing plan selected:', card.querySelector('h3').textContent);
            });
        }
    });
}

// Typing animation for hero chat
function initializeTypingAnimation() {
    const messageText = document.querySelector('.hero-visual .message-text');
    const typingIndicator = document.querySelector('.hero-visual .typing-indicator');
    
    if (messageText && typingIndicator) {
        // Hide message text initially
        messageText.style.display = 'none';
        
        // Show typing indicator for 2 seconds, then show message
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            messageText.style.display = 'block';
            messageText.style.opacity = '0';
            
            // Fade in the message
            setTimeout(() => {
                messageText.style.transition = 'opacity 0.5s ease-in';
                messageText.style.opacity = '1';
            }, 100);
        }, 2000);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global function for demo message sending (called from HTML)
window.sendDemoMessage = function() {
    const demoInput = document.getElementById('demo-input');
    const demoMessages = document.getElementById('demo-messages');
    
    if (demoInput && demoMessages) {
        const message = demoInput.value.trim();
        if (message) {
            addDemoMessage(demoMessages, 'user', message);
            demoInput.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                const responses = [
                    'Baseado na análise de mercado atual, aqui estão minhas recomendações personalizadas para você...',
                    'Excelente pergunta! Vou analisar os dados financeiros mais recentes para te dar a melhor resposta.',
                    'Com minha IA avançada, identifiquei algumas oportunidades que se alinham perfeitamente ao seu perfil.'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addDemoMessage(demoMessages, 'ai', randomResponse);
            }, 1500);
        }
    }
};

// Particle animation for background
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Add particle CSS animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particle effect
setTimeout(createParticleEffect, 1000);

// Feature cards hover effect with tilt
function initializeFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Initialize enhanced effects after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeFeatureCardEffects, 500);
});

// Add CSS for enhanced mobile menu
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-links.mobile-active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            border-top: 1px solid var(--gray-200);
            gap: 0.5rem;
        }
        
        .nav-links.mobile-active a {
            padding: 0.75rem;
            border-radius: var(--border-radius);
            transition: background-color var(--transition-fast);
        }
        
        .nav-links.mobile-active a:hover {
            background-color: var(--gray-100);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);
