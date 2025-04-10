/* W5 Site - w5.js
* Version: 1.0.1
* Author: skoki
* GitHub: https://github.com/skokivPr
*/

function updateDateTime() {
    const now = new Date();

    // Format time: HH:MM:SS with leading zeros
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    document.getElementById('current-time').textContent = time;

    // Format date: Weekday, Month Day, Year
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = now.toLocaleDateString(undefined, options);
    document.getElementById('current-date').textContent = date;
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Tab navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.nav-tab');
    const contentSections = document.querySelectorAll('.content-section');

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior
            const tabId = this.getAttribute('data-tab');

            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update active content section
            contentSections.forEach(section => section.classList.remove('active'));
            document.getElementById(tabId + '-section').classList.add('active');

            // Reset animation for link items in the newly active section
            const linkItems = document.querySelectorAll(`#${tabId}-section .link-item`);
            linkItems.forEach(item => {
                item.style.opacity = 0;
                // Trigger reflow using a safer approach than void operator
                item.offsetWidth; // Reading this property causes a reflow
                // Remove and re-add the style to restart animation
                const itemIndex = item.style.getPropertyValue('--item-index');
                item.style.animationDelay = `calc(${itemIndex} * 0.1s)`;
            });
        });
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');

    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light-theme');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-theme');
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');

        // Save preference to localStorage
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // Modal functionality
    const modal = document.getElementById('add-ons-modal');
    const modalBtn = document.getElementById('add-ons-btn');
    const closeBtn = document.querySelector('.close-modal');

    // Open modal
    modalBtn.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close modal when clicking X
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });

    // Add animation to link items
    document.querySelectorAll('.modal .link-item').forEach(item => {
        // Reset opacity to allow animation
        item.style.opacity = 0;
        // Trigger reflow using a safer approach than void operator
        item.offsetWidth; // Reading this property causes a reflow
    });
});
// Create circuit animation
function createCircuitAnimation() {
    const container = document.querySelector('.container');
    const nodeCount = 15;

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'circuit-node';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        node.style.left = `${x}%`;
        node.style.top = `${y}%`;

        // Random size
        const size = 2 + Math.random() * 13;
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;

        container.appendChild(node);
    }

    // Create paths between some nodes
    const nodes = document.querySelectorAll('.circuit-node');
    for (let i = 0; i < nodes.length - 1; i++) {
        if (Math.random() > 0.3) { // 70% chance to create a path
            const path = document.createElement('div');
            path.className = 'circuit-path';

            const node1 = nodes[i];
            const node2 = nodes[i + 1];

            // Get positions
            const x1 = parseFloat(node1.style.left);
            const y1 = parseFloat(node1.style.top);
            const x2 = parseFloat(node2.style.left);
            const y2 = parseFloat(node2.style.top);

            // Calculate path properties
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

            // Set path style
            path.style.width = `${length}%`;
            path.style.left = `${x1}%`;
            path.style.top = `${y1}%`;
            path.style.transform = `rotate(${angle}deg)`;
            path.style.transformOrigin = '0 0';

            container.appendChild(path);
        }
    }
}

// Interactive link effects
function setupLinkEffects() {
    const links = document.querySelectorAll('.link-item');

    links.forEach(link => {
        // Create data pulse effect on hover
        link.addEventListener('mouseenter', function () {
            // Get accent color from icon background
            const iconBg = this.querySelector('.link-icon');
            const computedStyle = getComputedStyle(iconBg);
            const accentColor = computedStyle.getPropertyValue('--card-accent') || ('--card-accent');

            // Add a more subtle effect
            this.style.backgroundColor = 'rgba(40, 40, 40, 0.8)';
            this.style.borderColor = accentColor;
        });

        link.addEventListener('mouseleave', function () {
            // Reset styles
            this.style.backgroundColor = '';
            this.style.borderColor = '';
        });

        // Click effect
        link.addEventListener('click', function (e) {
            // Prevent default if it's just a demo
            e.preventDefault();

            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';

            // Position ripple at click coordinates
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Add to link
            this.appendChild(ripple);

            // Show loading state
            this.classList.add('loading');

            // Simulate loading and then navigate
            setTimeout(() => {
                ripple.remove();
                this.classList.remove('loading');

                // Show toast notification
                showToast(`Navigating to ${this.querySelector('.link-text').textContent}...`);
            }, 800);
        });
    });
}

// Toast notification
function showToast(message) {
    // Create toast if not exists
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }

    // Set message and show
    toast.textContent = message;
    toast.className = 'show-toast';

    // Hide after 3 seconds
    setTimeout(() => {
        toast.className = '';
    }, 3000);
}




// Dynamic card hover effects
function setupCardEffects() {
    const cards = document.querySelectorAll('.tool-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            // Get position relative to card
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            // Apply 3D effect
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

            // Dynamic highlight effect
            const icon = this.querySelector('.tool-icon');
            icon.style.boxShadow = `${(x - centerX) / 5}px ${(y - centerY) / 5}px 15px rgba(255, 255, 255, 0.3)`;
        });

        // Reset on mouse leave
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            const icon = this.querySelector('.tool-icon');
            icon.style.boxShadow = '';
        });
    });
}

// Create terminal typing effect
function createTypingEffect() {
    const h1 = document.querySelector('.header h1');
    const paragraph = document.querySelector('.header p');

    // Store original text
    const h1Text = h1.textContent;
    const pText = paragraph.textContent;

    // Clear text initially
    h1.textContent = '';
    paragraph.textContent = '';

    // Typing function
    function typeText(element, text, i, callback) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(function () {
                typeText(element, text, i + 1, callback);
            }, 50); // typing speed
        } else if (callback) {
            // Add blinking cursor temporarily
            element.insertAdjacentHTML('beforeend', '<span class="cursor">|</span>');

            // Remove cursor after delay and start callback
            setTimeout(() => {
                element.querySelector('.cursor').remove();
                callback();
            }, 500);
        }
    }

    // Start typing animation sequence
    setTimeout(() => {
        typeText(h1, h1Text, 0, function () {
            typeText(paragraph, pText, 0, null);
        });
    }, 300);
}

// Add interactivity to section title
function setupSectionTitleEffect() {
    const sectionTitle = document.querySelector('.section-title');

    sectionTitle.addEventListener('mouseenter', function () {
        this.style.textShadow = '0 0 10px rgba(255, 140, 0, 0.7)';
        this.style.color = '#fff';
    });

    sectionTitle.addEventListener('mouseleave', function () {
        this.style.textShadow = '';
        this.style.color = '';
    });
}

// Add CSS for new effects
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
                .data-pulse {
                    position: absolute;
                    top: 0; 
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 12px;
                    opacity: 0;
                    z-index: 0;
                    transition: all 0.3s ease;
                }

                .data-pulse:hover {
                    opacity: 0.5;
                    transform: scale(1.05);
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .click-ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    width: 100px;
                    height: 100px;
                    margin-left: -50px;
                    margin-top: -50px;
                    animation: ripple 0.8s ease-out;
                    z-index: 0;
                }
                
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                
                .link-item.loading {
                    background: rgba(60, 60, 60, 0.7);
                }
                
                #toast {
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%) translateY(100px);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 30px;
                    z-index: 1000;
                    transition: transform 0.3s ease;
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    font-size: 14px;
                }
                
                #toast.show-toast {
                    transform: translateX(-50%) translateY(0);
                }
                
                .container {
                    transition: transform 0.2s ease-out;
                }
                
               
                
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    100% { opacity: 1; }
                }
                
                .circuit-path {
                    animation: pathPulse 1s infinite linear;
                    background: linear-gradient(90deg, rgba(255, 140, 0, 0.1), rgba(0, 150, 255, 0.2));
                }
                
                @keyframes pathPulse {
                    0% { 
                        background-position: 0% 50%;
                        opacity: 0.2;
                    }
                    50% { 
                        background-position: 100% 50%;
                        opacity: 0.4;
                    }
                    100% { 
                        background-position: 0% 50%;
                        opacity: 0.2;
                    }
                }
                
                .cursor {
                    animation: blink 1s infinite;
                    font-weight: 100;
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                .hover-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 2;
                    animation: particle-fade 0.8s ease-out forwards;
                }
                
                @keyframes particle-fade {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    20% {
                        transform: scale(1.5);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(0.5) translateY(10px);
                        opacity: 0;
                    }
                }
            `;
    document.head.appendChild(style);
}

// Run after page loads
window.addEventListener('load', function () {
    addDynamicStyles();
    createCircuitAnimation();
    setupLinkEffects();
    setupCardEffects();
    createTypingEffect();
    setupSectionTitleEffect();

    // Show welcome toast
    setTimeout(() => {
        showToast('Dashboard loaded. Welcome!');
    }, 2000);

    // Sequentially reveal elements
    const categories = document.querySelectorAll('.category');
    categories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });

    // Add pulsing effect to circuit nodes
    setInterval(() => {
        const randomNode = document.querySelector(`.circuit-node:nth-child(${Math.floor(Math.random() * 10) + 1})`);
        if (randomNode) {
            randomNode.style.transform = 'scale(1.5)';
            randomNode.style.opacity = '1';

            setTimeout(() => {
                randomNode.style.transform = '';
                randomNode.style.opacity = '';
            }, 500);
        }
    }, 2000);
});
