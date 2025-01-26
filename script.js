// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuBars = menuToggle.querySelectorAll('span');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Animate hamburger to X
    menuBars[0].classList.toggle('rotate-45');
    menuBars[0].classList.toggle('translate-y-2.5');
    menuBars[1].classList.toggle('opacity-0');
    menuBars[2].classList.toggle('-rotate-45');
    menuBars[2].classList.toggle('-translate-y-2.5');
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hanya menangani hide/show navbar berdasarkan scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Active link indicator
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add smooth reveal for coffee cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add parallax effect for coffee images
window.addEventListener('scroll', () => {
    const parallaxImages = document.querySelectorAll('.parallax');
    parallaxImages.forEach(image => {
        const speed = image.getAttribute('data-speed') || 0.5;
        const yPos = -(window.pageYOffset * speed);
        image.style.transform = `translateY(${yPos}px)`;
    });
});

// Menu filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('.menu-filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Update active button
            menuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

// Table booking form validation
const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your booking form submission logic here
        alert('Thank you for your booking request! We will contact you shortly.');
    });
}

// Promo countdown timer
function updatePromoTimer() {
    const promoEndDate = new Date('2024-12-31T23:59:59').getTime();
    const now = new Date().getTime();
    const distance = promoEndDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const promoTimers = document.querySelectorAll('.promo-timer');
    promoTimers.forEach(timer => {
        timer.textContent = `${days}d ${hours}h ${minutes}m`;
    });
}

// Update timer every minute
if (document.querySelector('.promo-timer')) {
    updatePromoTimer();
    setInterval(updatePromoTimer, 60000);
}

// Gallery Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.gallery-carousel + .flex');

    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth;
    const itemsPerView = Math.floor(track.offsetWidth / itemWidth);
    const maxIndex = items.length - itemsPerView;

    // Create pagination dots
    items.forEach((_, index) => {
        if (index <= maxIndex) {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'bg-[#2C1810]', 'opacity-40', 'transition-opacity');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        }
    });

    const dots = dotsContainer.querySelectorAll('button');
    updateDots();

    // Navigation functions
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('opacity-100', index === currentIndex);
            dot.classList.toggle('opacity-40', index !== currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        updateDots();
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Touch/Swipe functionality
    let startX;
    let isDragging = false;
    let startPos;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        startPos = currentIndex * itemWidth;
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        track.style.transform = `translateX(-${startPos + diff}px)`;
    });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const currentX = e.changedTouches[0].clientX;
        const diff = startX - currentX;
        
        if (Math.abs(diff) > itemWidth / 3) {
            if (diff > 0) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex - 1);
            }
        } else {
            goToSlide(currentIndex);
        }
    });
});

// Menu Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuTrack = document.querySelector('.menu-track');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuPrevBtn = document.querySelector('.menu-prev-btn');
    const menuNextBtn = document.querySelector('.menu-next-btn');
    const menuDotsContainer = document.querySelector('.menu-dots');

    let menuCurrentIndex = 0;
    const menuItemWidth = menuItems[0].offsetWidth;
    const menuItemsPerView = Math.floor(menuTrack.offsetWidth / menuItemWidth);
    const menuMaxIndex = menuItems.length - menuItemsPerView;

    // Create pagination dots
    menuItems.forEach((_, index) => {
        if (index <= menuMaxIndex) {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'bg-[#2C1810]', 'opacity-40', 'transition-opacity');
            dot.addEventListener('click', () => goToMenuSlide(index));
            menuDotsContainer.appendChild(dot);
        }
    });

    const menuDots = menuDotsContainer.querySelectorAll('button');
    updateMenuDots();

    function updateMenuDots() {
        menuDots.forEach((dot, index) => {
            dot.classList.toggle('opacity-100', index === menuCurrentIndex);
            dot.classList.toggle('opacity-40', index !== menuCurrentIndex);
        });
    }

    function goToMenuSlide(index) {
        menuCurrentIndex = Math.max(0, Math.min(index, menuMaxIndex));
        menuTrack.style.transform = `translateX(-${menuCurrentIndex * menuItemWidth}px)`;
        updateMenuDots();
    }

    menuPrevBtn.addEventListener('click', () => {
        goToMenuSlide(menuCurrentIndex - 1);
    });

    menuNextBtn.addEventListener('click', () => {
        goToMenuSlide(menuCurrentIndex + 1);
    });

    // Menu filter functionality
    const menuFilterBtns = document.querySelectorAll('.menu-filter-btn');
    
    menuFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            menuFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Reset carousel position
            menuCurrentIndex = 0;
            goToMenuSlide(0);
        });
    });
});

// Promo functions
function claimPromo(promoCode) {
    alert(`Promo code ${promoCode} has been copied to your clipboard!`);
    navigator.clipboard.writeText(promoCode);
}

function registerWorkshop() {
    window.location.href = "https://wa.me/62895343061397?text=Hi,%20I%20would%20like%20to%20register%20for%20the%20coffee%20workshop";
}

function joinMembership() {
    window.location.href = "https://wa.me/62895343061397?text=Hi,%20I%20would%20like%20to%20join%20the%20membership%20program";
}

// Contact form submission
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Construct WhatsApp message
    const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/62895343061397?text=${whatsappMessage}`, '_blank');
    
    // Reset form
    event.target.reset();
    
    // Show success message
    alert('Thank you for your message! We will contact you soon.');
}

// Optimasi scroll event dengan throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Aplikasikan throttling pada scroll event
window.addEventListener('scroll', throttle(() => {
    // Existing scroll logic
}, 100));

// Load AOS hanya ketika dibutuhkan
document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.min.js';
    script.onload = function() {
        AOS.init({
            duration: 1000,
            once: true,
            disable: 'mobile'
        });
    };
    document.body.appendChild(script);
});
