let isNavigating = false;

const allRevealElements = document.querySelectorAll('.scroll-reveal');

const handleReveal = (entries) => {
    entries.forEach(entry => {
        const target = entry.target;

        if (isNavigating) return;

        if (entry.isIntersecting) {
            target.classList.add('visible');

            if (target.classList.contains('popProduct')) {
                const productCards = target.querySelectorAll('.product-card');

                productCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100); 
                });
            }
            
            // --- FIX: Add Visit Us specific child animations here for Intersection Observer and checkVisibleElements ---
            if (target.classList.contains('pop4')) {
                const textContent = target.querySelector('.visit-text-content');
                const mapContainer = target.querySelector('.visit-map-container');

                if (textContent) {
                    // Use a slight delay to allow the parent 'pop4' to become visible first
                    setTimeout(() => { textContent.classList.add('visible'); }, 100); 
                }
                if (mapContainer) {
                    setTimeout(() => { mapContainer.classList.add('visible'); }, 300); 
                }
            }
            // --- END OF FIX ---

        } else {
            target.classList.remove('visible');

            if (target.classList.contains('popProduct')) {
                target.querySelectorAll('.product-card').forEach((card) => {
                    card.classList.remove('visible');
                });
            }
            
            // --- FIX: Remove Visit Us specific child animations here when scrolling out of view ---
            if (target.classList.contains('pop4')) {
                const textContent = target.querySelector('.visit-text-content');
                const mapContainer = target.querySelector('.visit-map-container');

                if (textContent) {
                    textContent.classList.remove('visible'); 
                }
                if (mapContainer) {
                    mapContainer.classList.remove('visible'); 
                }
            }
            // --- END OF FIX ---
        }
    });
};

const observer = new IntersectionObserver(handleReveal, {
    rootMargin: "10% 0px 10% 0px", 
    threshold: 0 
});

allRevealElements.forEach(el => {
    observer.observe(el);
});

const checkVisibleElements = () => {
    allRevealElements.forEach(el => {
        const rect = el.getBoundingClientRect();

        if (rect.top > window.innerHeight * 0.9 || rect.bottom < 0) {
            handleReveal([{ target: el, isIntersecting: false }]);
        } 

        else if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
            handleReveal([{ target: el, isIntersecting: true }]);
        }
    });
};


const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach (link=>{
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            isNavigating = true;

            // Ensure all animations are reset before the scroll
            document.querySelectorAll('.scroll-reveal, .product-card, .visit-text-content, .visit-map-container').forEach(el => {
                el.classList.remove('visible');
            });

            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });

            const scrollDuration = 400; 

            setTimeout(() => {
                const elementsToReveal = targetSection.querySelectorAll('.scroll-reveal');

                elementsToReveal.forEach((targetReveal, index) => {
                    // Apply 'visible' to the main scroll-reveal element
                    setTimeout(() => {
                        targetReveal.classList.add('visible');
                    }, index * 50); 
                    
                    // --- REMOVED REDUNDANT/BUGGY 'VISIT US' LOGIC FROM HERE ---
                    
                    if (targetReveal.classList.contains('popProduct')) {
                        const productCards = targetReveal.querySelectorAll('.product-card');
                        productCards.forEach((card, cardIndex) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, cardIndex * 100); 
                        });
                    }
                });

                isNavigating = false;

                // This call will now trigger the correct handleReveal logic for any visible element,
                // including the nested 'Visit Us' animations if the section is on screen.
                checkVisibleElements();

            }, scrollDuration); 
        }
    });
});
const productSection = document.querySelector('#product.hover-product-section');
const productCards = document.querySelectorAll('.product-card');

if (productSection) {
    productCards.forEach(card => {
        const bgUrl = `url('${card.getAttribute('data-bg-img')}')`;

        card.addEventListener('mouseenter', () => {
            productSection.style.setProperty('--hover-bg-url', bgUrl);
            productSection.classList.add('is-hovering'); 
        });
    });

    productSection.addEventListener('mouseleave', () => {
        productSection.classList.remove('is-hovering');
    });
}

document.addEventListener('DOMContentLoaded', checkVisibleElements);

document.addEventListener('DOMContentLoaded', checkVisibleElements);