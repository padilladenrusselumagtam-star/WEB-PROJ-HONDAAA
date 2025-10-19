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

                } else {
                    target.classList.remove('visible');

                    if (target.classList.contains('popProduct')) {
                        target.querySelectorAll('.product-card').forEach((card) => {
                            card.classList.remove('visible');
                        });
                    }
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
                            setTimeout(() => {
                                targetReveal.classList.add('visible');
                            }, index * 50); 

                            if (targetSection.id === 'visit') {
                                const textContent = targetReveal.querySelector('.visit-text-content');
                                const mapContainer = targetReveal.querySelector('.visit-map-container');

                                if (textContent) {
                                    setTimeout(() => { textContent.classList.add('visible'); }, 100); 
                                }
                                if (mapContainer) {
                                    setTimeout(() => { mapContainer.classList.add('visible'); }, 300); 
                                }
                            }

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

    // --- NEW: Horizontal Slide Logic for Big Bikes Section (#product2) ---
    
const slider = document.getElementById('big-bike-slider');
    const navLinksContainer = document.getElementById('big-bike-nav');

    if (slider && navLinksContainer) {
        // Function to update active link styling
        function updateActiveLink(activeTargetId) {
            navLinksContainer.querySelectorAll('.category-link').forEach(link => {
                link.classList.remove('active-category');
                if (link.getAttribute('data-target') === activeTargetId) {
                    link.classList.add('active-category');
                }
            });
        }

        /**
         * Moves the content slider horizontally based on the target panel ID.
         * @param {string} targetId - The target panel's ID ('view-1', 'view-2', 'view-3', or 'view-4').
         */
        function showPanel(targetId) {
            let translateValue = 'translateX(0%)'; // Default to view-1

            /* **CHANGE 3: Updated translation logic for 4 panels (25% each)** */
            if (targetId === 'view-2') {
                // Shift the container to show the second panel (25% * 1)
                translateValue = 'translateX(-25%)'; 
            } else if (targetId === 'view-3') {
                // Shift the container to show the third panel (25% * 2)
                translateValue = 'translateX(-50%)'; 
            } else if (targetId === 'view-4') {
                // Shift the container to show the fourth panel (25% * 3)
                translateValue = 'translateX(-75%)'; 
            }
            /* **END CHANGE 3** */


            // Apply the horizontal slide
            slider.style.transform = translateValue;

            // Update button styles
            updateActiveLink(targetId);
        }

        // Add event listeners to the category links
        navLinksContainer.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                showPanel(targetId);
            });
        });

        // Initialize by showing the first panel
        showPanel('view-1');
    }

    // --- END NEW: Horizontal Slide Logic ---

    // Ensure checkVisibleElements runs on load, merging the duplicated listener call
    document.addEventListener('DOMContentLoaded', checkVisibleElements);