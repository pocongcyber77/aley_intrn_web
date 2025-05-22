// Fungsi untuk tab
function opentab(tabname) {
    // Hapus class active dari semua tab
    document.querySelectorAll('.tab-links').forEach(tab => {
        tab.classList.remove('active-link');
    });
    
    // Tambah class active ke tab yang diklik
    event.currentTarget.classList.add('active-link');
    
    // Handle animasi tab content
    const allContents = document.querySelectorAll('.tab-contents');
    const targetContent = document.getElementById(tabname);
    
    // Hapus class active dari semua content
    allContents.forEach(content => {
        if (content !== targetContent) {
            content.classList.remove('active-tab');
        }
    });
    
    // Tambah class active ke content yang dituju
    setTimeout(() => {
        targetContent.classList.add('active-tab');
    }, 300); // Sesuaikan dengan durasi animasi rollOut
}

// Navigasi sederhana
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'auto' });
        }
    });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Function to close menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    // Function to open menu
    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    }

    // Toggle menu when hamburger is clicked
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});
