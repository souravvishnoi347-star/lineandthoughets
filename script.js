// --- Force Page to Top on Refresh ---
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    
    // ========================================
    // 1. MOBILE MENU LOGIC (Runs on ALL Pages)
    // ========================================
    const hamburgerHome = document.getElementById('hamburger');
    const navLinksHome = document.getElementById('nav-links');
    if (hamburgerHome && navLinksHome) {
        hamburgerHome.addEventListener('click', () => {
            navLinksHome.classList.toggle('nav-active');
            hamburgerHome.classList.toggle('toggle');
        });
    }

    const mobileMenuInner = document.getElementById('mobile-menu');
    const navLinksInner = document.querySelector('.static-nav .nav-links');
    if (mobileMenuInner && navLinksInner) {
        mobileMenuInner.addEventListener('click', () => {
            mobileMenuInner.classList.toggle('is-active');
            navLinksInner.classList.toggle('active');
        });
    }

    // ========================================
    // 2. HOMEPAGE ANIMATIONS (Only runs if on Homepage)
    // ========================================
    const logoImg = document.getElementById('logo-img');
    
    if (logoImg) {
        const textLinesEl = document.getElementById('text-lines');
        const textThoughtsEl = document.getElementById('text-thoughts');
        const subTextEl = document.getElementById('logo-sub-text');
        const logoContainer = document.getElementById('logo-container');
        const introOverlay = document.getElementById('intro-overlay');
        const mainNav = document.getElementById('main-nav');
        
        const slides = document.querySelectorAll('.slide');
        const progressContainer = document.querySelector('.progress-container');
        const progressBar = document.getElementById('progress-bar');

        const text1 = "LINES ";
        const text2 = "& THOUGHTS";
        const subText = "BY KARTIK | AKSHAY";

        setTimeout(() => {
            logoImg.classList.add('wipe-in');
            setTimeout(() => {
                typeWriter(textLinesEl, text1, 80, () => {
                    typeWriter(textThoughtsEl, text2, 80, () => {
                        typeWriter(subTextEl, subText, 50, () => {
                            const isMobile = window.innerWidth <= 768;
                            const moveDelay = isMobile ? 800 : 1500;
                            const swapDelay = isMobile ? 1800 : 1200;
                            
                            setTimeout(() => {
                                // This section hides the white screen and moves the logo
                                logoContainer.classList.remove('center-position');
                                logoContainer.classList.add('top-left-position');
                                introOverlay.classList.add('hidden'); 
                                logoContainer.classList.remove('intro-text-black'); 
                                
                                setTimeout(() => {
                                    progressContainer.classList.add('show');
                                    mainNav.classList.add('show');
                                    
                                    // Swap the animated logo for the static clickable one
                                    logoContainer.classList.add('fade-out');
                                    setTimeout(() => {
                                        document.querySelector('.brand').classList.add('show');
                                    }, 200);

                                    startCarousel();
                                }, swapDelay); 
                            }, moveDelay);
                        });
                    });
                });
            }, 600); 
        }, 300);

        function typeWriter(element, text, speed, callback) {
            element.classList.add('typing-cursor');
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i); 
                    i++;
                    setTimeout(type, speed);
                } else {
                    element.classList.remove('typing-cursor'); 
                    if (callback) callback();
                }
            }
            type();
        }

        let currentSlide = 0;
        const slideDuration = 2000; 
        let slideInterval;

        function updateProgressBar() {
            const percentage = ((currentSlide + 1) / slides.length) * 100;
            progressBar.style.width = percentage + '%';
        }

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            updateProgressBar();
            
            // Reset auto-timer so it doesn't jump immediately after manual swipe
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, slideDuration);
        }

        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }

        function startCarousel() {
            slides[0].classList.add('active'); 
            updateProgressBar();
            slideInterval = setInterval(nextSlide, slideDuration);
        }

        // --- NEW: Keyboard Arrow Controls ---
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // --- NEW: Mobile Touch / Swipe Controls ---
        const heroSection = document.getElementById('hero');
        let touchStartX = 0;
        let touchEndX = 0;

        if (heroSection) {
            heroSection.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});

            heroSection.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                // If swiped left (next)
                if (touchStartX - touchEndX > 50) nextSlide();
                // If swiped right (previous)
                if (touchEndX - touchStartX > 50) prevSlide();
            }, {passive: true});
        }

        const counters = document.querySelectorAll('.counter');
        let hasCounted = false;
        const metricsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const targetText = counter.getAttribute('data-target');
                    const target = parseFloat(targetText);
                    const isFloat = targetText.includes('.');
                    const duration = 2000; 
                    let startTime = null;

                    const step = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const easeProgress = 1 - Math.pow(1 - progress, 4);
                        const currentCount = easeProgress * target;
                        if (isFloat) counter.innerText = currentCount.toFixed(1);
                        else counter.innerText = Math.floor(currentCount);
                        if (progress < 1) window.requestAnimationFrame(step);
                        else counter.innerText = targetText; 
                    };
                    window.requestAnimationFrame(step);
                });
            }
        }, { threshold: 0.5 }); 

        const metricsContainer = document.getElementById('metrics-container');
        if(metricsContainer) metricsObserver.observe(metricsContainer);

        const worksSection = document.getElementById('signature-works');
        const worksLine = document.getElementById('works-line');
        const typeCraftedEl = document.getElementById('type-crafted');
        const typeSpacesEl = document.getElementById('type-spaces');
        let worksAnimated = false;

        const worksObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !worksAnimated) {
                worksAnimated = true;
                worksLine.classList.add('expand');
               setTimeout(() => {
                    if (typeCraftedEl && typeSpacesEl) {
                        typeWriter(typeCraftedEl, "CRAFTED ", 40, () => {
                            typeWriter(typeSpacesEl, "spaces", 40);
                        });
                    }
                }, 0);
            }
        }, { threshold: 0.1 }); 
        if(worksSection) worksObserver.observe(worksSection);
    } 

    // ========================================
    // 3. CONTACT PAGE ANIMATION
    // ========================================
    const contactSection = document.getElementById('contact');
    const contactLine = document.getElementById('contact-line');
    let contactAnimated = false;

    const contactObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !contactAnimated) {
            contactAnimated = true;
            if(contactLine) contactLine.classList.add('expand');
        }
    }, { threshold: 0.3 }); 
    if(contactSection) contactObserver.observe(contactSection);
});