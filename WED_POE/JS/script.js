document.addEventListener('DOMContentLoaded', () => {
    // We target the main header element
    const header = document.querySelector('header');
    // We assume the <ul> element is inside a <nav> inside the <header>
    const navList = header ? header.querySelector('nav ul') : null;

    if (header && navList) {
        // --- A. Create and Handle Mobile Menu Toggle Button ---
        const menuButton = document.createElement('button');
        menuButton.classList.add('menu-toggle');
        menuButton.setAttribute('aria-controls', 'main-navigation');
        
        // Find the navigation element and insert the button
        const nav = header.querySelector('nav'); 
        if (nav) {
            nav.prepend(menuButton); 
        } else {
            // Fallback: prepend to header
            header.prepend(menuButton); 
        }

        const setMenuIcon = () => {
            if (navList.classList.contains('active')) {
                menuButton.innerHTML = '✕'; // X symbol
                menuButton.setAttribute('aria-expanded', 'true');
            } else {
                menuButton.innerHTML = '☰'; // Hamburger symbol
                menuButton.setAttribute('aria-expanded', 'false');
            }
        };

        menuButton.addEventListener('click', () => {
            navList.classList.toggle('active');
            setMenuIcon();
        });
        
        // Initialize icon
        setMenuIcon();

        // --- B. Dynamic 'scrolled' Header Class ---
        // Adds a class to the header after scrolling down 50px
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }
    
    // 2. Product Card Reveal Animation
    initScrollReveal();

    // 3. Shop Page Filter Interactivity
    initShopFilters();

});

/**
 * Implements a "Scroll Reveal" effect using the Intersection Observer API 
 * to animate elements as they enter the viewport.
 */
const initScrollReveal = () => {
    // Select all elements designated for animation
    const revealElements = document.querySelectorAll('.product-card, .blog-post, .hero-section, .footer-content, aside, section > h2'); 
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing once the element has appeared
                observer.unobserve(entry.target); 
            }
        });
    }, {
        // Start revealing when 10% of the element is visible
        threshold: 0.1 
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });
};

/**
 * Updates the display span next to the range input fields on the Shop page 
 * dynamically as the user moves the slider.
 */
const initShopFilters = () => {
    // The HTML input IDs are 'Size' and 'Price'
    const sizeRangeInput = document.getElementById('Size'); 
    const priceRangeInput = document.getElementById('Price');

    // 1. Size Filter
    if (sizeRangeInput) {
        // Target the span by its new ID (as updated in the HTML)
        const sizeValueSpan = document.getElementById('size-display');
        
        if (sizeValueSpan) {
            const updateSizeDisplay = () => {
                sizeValueSpan.textContent = sizeRangeInput.value;
            };
            sizeRangeInput.addEventListener('input', updateSizeDisplay);
            updateSizeDisplay();
        }
    }

    // 2. Price Filter
    if (priceRangeInput) {
        // Target the span by its new ID (as updated in the HTML)
        const priceValueSpan = document.getElementById('price-display');
        
        if (priceValueSpan) {
            const updatePriceDisplay = () => {
                // Formats the value for display (Rands)
                priceValueSpan.textContent = `R${priceRangeInput.value}.00`;
            };
            priceRangeInput.addEventListener('input', updatePriceDisplay);
            updatePriceDisplay();
        }
    }
};