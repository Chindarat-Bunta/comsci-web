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
        // Spying sections should only run on the main landing page
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;

        // Skip scroll spy if a modal popup is currently open
        if (document.querySelector('.cs-modal-overlay.open')) return;

        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        let currentSectionId = 'home';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Offset matching css scroll-padding-top
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

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

    // 2. Hash-based Popup Modal Activator
    function handleHash() {
        const hash = window.location.hash;
        if (!hash) return;

        // Popup Modals: #curriculum, #study-plan, #faculty
        if (hash === '#curriculum' || hash === '#study-plan' || hash === '#faculty') {
            const modalId = hash.substring(1) + '-modal';
            const modal = document.getElementById(modalId);
            if (modal) {
                // Close other open modals
                document.querySelectorAll('.cs-modal-overlay').forEach(m => m.classList.remove('open'));
                
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';

                // Set navbar item active manually for popups
                navItems.forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector('a');
                    if (link && link.getAttribute('href') === hash) {
                        item.classList.add('active');
                    }
                });
            }
        }
        // Section Smooth Scrolling (for direct links/redirects)
        else if (hash === '#about' || hash === '#contact') {
            const targetSection = document.getElementById(hash.substring(1));
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }

    // 3. Interactive Card Popups (On Click)
    const cards = document.querySelectorAll('.cs-card[data-modal-target]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal-target');
            const targetHash = modalId.replace('-modal', '');
            
            // Setting hash will trigger hashchange event, opening the modal automatically
            window.location.hash = targetHash;
        });
    });

    // 4. Close Modal & Reset State
    const closeBtns = document.querySelectorAll('.cs-modal-close-btn, .btn-close-modal');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.cs-modal-overlay');
            if (modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
                
                // Clear the hash from URL without page reload
                history.replaceState(null, null, ' ');
                // Recalculate correct active navigation item
                scrollSpy();
            }
        });
    });

    const overlays = document.querySelectorAll('.cs-modal-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
                
                history.replaceState(null, null, ' ');
                scrollSpy();
            }
        });
    });

    // Attach Event Listeners
    window.addEventListener('scroll', scrollSpy);
    window.addEventListener('hashchange', handleHash);
    
    // Initialize state on page load
    scrollSpy();
    handleHash();
});
