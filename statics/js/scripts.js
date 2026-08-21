window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation (if any)
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.liquid-nav ul li.list');

    // 1. Dynamic Scroll Spy for One-Page Layout
    function scrollSpy() {
        // Skip scroll spy if any modal overlay is active
        if (document.querySelector('.modal-overlay.active')) return;

        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        
        let currentSectionId = 'home';

        // Check if scrolled near the bottom of the page (within 60px)
        if (scrollPosition + clientHeight >= scrollHeight - 60) {
            if (sections.length > 0) {
                currentSectionId = sections[sections.length - 1].getAttribute('id');
            }
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150; // Offset matching css scroll-padding-top
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });
        }

        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                if (href === `#${currentSectionId}`) {
                    item.classList.add('active');
                }
            }
        });
    }

    // 2. Hash Change Handler for smooth scrolls
    function handleHash() {
        const hash = window.location.hash;
        if (!hash) return;

        const targetSection = document.getElementById(hash.substring(1));
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }

    // 3. Global Modal Functions (Exposed to window)
    window.openModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background page scroll
        }
    };

    window.closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore background page scroll
        }
    };

    // Close modal when clicking on the overlay background
    window.addEventListener('click', event => {
        if (event.target.classList.contains('modal-overlay')) {
            event.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Attach Event Listeners
    window.addEventListener('scroll', scrollSpy);
    window.addEventListener('hashchange', handleHash);
    
    // Initialize spy on page load
    scrollSpy();
    handleHash();
});
