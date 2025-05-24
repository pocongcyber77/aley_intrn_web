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
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
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

// Fungsi untuk membuat gelombang sinusoidal dengan parameter random
// Parameter:
// - amplitude: tinggi gelombang (default: 3)
// - frequency: frekuensi gelombang (default: 0.1)
// - phase: fase awal gelombang (default: 0)
function createSineWave(amplitude = 0.15, frequency = 2025, phase = 0) {
    // Mengambil semua container gelombang dari HTML
    const waveGroups = document.querySelectorAll('.audio-wave');
    
    // Memproses setiap grup gelombang
    waveGroups.forEach((group, groupIndex) => {
        // Mengambil semua path gelombang dalam grup
        const waves = group.querySelectorAll('.wave-path');
        
        waves.forEach((wave, index) => {
            // Membuat parameter random untuk setiap gelombang
            // Tinggi gelombang: 80-120% dari amplitude dasr
            const randomAmplitude = amplitude * (0.8 + Math.random() * 0.4);
            // Frekuensi gelombang: 80-120% dari frequency dasar
            const randomFrequency = frequency * (0.8 + Math.random() * 0.4);
            // Fase awal random: 0 sampai 2π
            const randomPhase = phase + (Math.random() * Math.PI * 2);
            // Kecepatan animasi: 0.01 sampai 0.03
            const randomSpeed = 0.001 + Math.random() * 0.02;
            // Arah gerakan berdasarkan grup: grup genap=kanan, grup ganjil=kiri
            const direction = groupIndex % 3 === 0 ? 1 : -1;
            
            // Menyimpan parameter di data attributes untuk digunakan dalam animasi
            wave.dataset.amplitude = randomAmplitude;    // Tinggi gelombang
            wave.dataset.frequency = randomFrequency;    // Frekuensi gelombang
            wave.dataset.phase = randomPhase;           // Fase awal
            wave.dataset.speed = randomSpeed;           // Kecepatan animasi
            wave.dataset.direction = direction;         // Arah gerakan
            wave.dataset.groupIndex = groupIndex;       // Indeks grup
            
            // Membuat path awal untuk gelombang
            let path = '';
            const points = 100;  // Jumlah titik untuk membuat gelombang
            const width = 200;   // Lebar gelombang dalam pixel
            
            // Membuat titik-titik untuk path gelombang
            for (let i = 0; i <= points; i++) {
                // Menghitung posisi x berdasarkan indeks
                const x = (i / points) * width;
                // Menghitung posisi y menggunakan kombinasi sin dan cos
                // 10 adalah posisi tengah gelombang
                const y = 10 + 
                         randomAmplitude * Math.sin(x * randomFrequency + randomPhase) +
                         (randomAmplitude * 0.5) * Math.cos(x * randomFrequency * 1.5 + randomPhase);
                
                // Menambahkan titik ke path SVG
                if (i === 0) {
                    path += `M ${x},${y}`;  // M: Move to (titik awal)
                } else {
                    path += ` L ${x},${y}`; // L: Line to (garis ke titik)
                }
            }
            
            // Memperbarui path SVG dengan nilai baru
            wave.setAttribute('d', path);
        });
    });
}

// Menunggu sampai DOM (struktur HTML) selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Memanggil fungsi createSineWave dengan parameter awal
    // amplitude=5: tinggi gelombang
    // frequency=0.1: frekuensi gelombang
    // phase=0: fase awal gelombang
    createSineWave(5, 0.1, 0);
    
    // Variabel untuk menyimpan fase gelombang saat ini
    let phase = 0;

    // Fungsi untuk menganimasikan gelombang
    function animate() {
        // Mengambil semua elemen path gelombang dari HTML
        const waves = document.querySelectorAll('.wave-path');
        
        // Memproses setiap gelombang satu per satu
        waves.forEach(wave => {
            // Mengambil parameter yang disimpan di data attributes
            const amplitude = parseFloat(wave.dataset.amplitude); // Tinggi gelombang
            const frequency = parseFloat(wave.dataset.frequency); // Frekuensi gelombang
            const speed = parseFloat(wave.dataset.speed);        // Kecepatan animasi
            const direction = parseFloat(wave.dataset.direction); // Arah gerakan (1=kanan, -1=kiri)
            
            // Memperbarui fase gelombang berdasarkan kecepatan dan arah
            // 0.5 adalah faktor untuk memperlambat animasi
            phase += speed * direction * 0.4;
            
            // Variabel untuk menyimpan path SVG
            let path = '';
            const points = 100;  // Jumlah titik untuk membuat gelombang
            const width = 200;   // Lebar gelombang dalam pixel
            
            // Membuat titik-titik untuk path gelombang
            for (let i = 0; i <= points; i++) {
                // Menghitung posisi x berdasarkan indeks
                const x = (i / points) * width;
                
                // Menghitung posisi y menggunakan kombinasi fungsi sin dan cos
                // 10 adalah posisi tengah gelombang
                // amplitude * Math.sin() membuat gelombang utama
                // (amplitude * 0.5) * Math.cos() menambahkan kompleksitas
                const y = 10 + 
                         amplitude * Math.sin(x * frequency + phase) +
                         (amplitude * 0.9) * Math.cos(x * frequency * 1.5 + phase);
                
                // Menambahkan titik ke path SVG
                if (i === 0) {
                    path += `M ${x},${y}`;  // M: Move to (titik awal)
                } else {
                    path += ` L ${x},${y}`; // L: Line to (garis ke titik)
                }
            }
            
            // Memperbarui path SVG dengan nilai baru
            wave.setAttribute('d', path);
        });
        
        // Meminta frame animasi berikutnya
        // Ini membuat animasi berjalan terus menerus
        requestAnimationFrame(animate);
    }
    
    // Memulai animasi
    animate();
});


// Add hover effect to service items
const serviceItems = document.querySelectorAll('.services-list div');

serviceItems.forEach(item => {
    let popupContainer = null; // Variable to hold the created popup container
    let hideTimeout = null; // To manage the timeout for hiding the popup
    let expandAnimation = null; // To hold the expand animation object
    let collapseAnimation = null; // To hold the collapse animation object

    // Function to hide the popup after a delay
    const hidePopup = () => {
        // Set a timeout to hide the popup
        hideTimeout = setTimeout(() => {
            // Check if the popup container still exists before trying to remove it
            if (popupContainer) {
                // Stop any ongoing animation before starting a new one
                if (expandAnimation) expandAnimation.cancel();
                if (collapseAnimation) collapseAnimation.cancel();

                // Get the current height (with popup)
                const initialHeight = item.offsetHeight;

                // Remove the popup from the DOM
                popupContainer.remove();
                popupContainer = null;

                // Get the final height (without popup)
                const finalHeight = item.offsetHeight;
                
                // If heights are different, animate the collapse
                if (initialHeight !== finalHeight) {
                    // Set the height back to the initial height to start animation
                    // Store original overflow
                    const originalOverflow = item.style.overflow;
                    item.style.overflow = 'hidden'; // Hide overflow during animation
                    item.style.height = `${initialHeight}px`;

                    collapseAnimation = item.animate([
                        { height: `${initialHeight}px` },
                        { height: `${finalHeight}px` }
                    ], {
                        duration: 600, // Animation duration in milliseconds (Increased for smoother collapse)
                        easing: 'ease-out' // Easing function
                    });

                    // After the animation finishes, reset height and overflow
                    collapseAnimation.onfinish = () => {
                        item.style.height = ''; // Remove explicit height style
                        item.style.overflow = originalOverflow; // Restore original overflow
                        collapseAnimation = null;
                    };
                } else {
                    // If heights are the same, just ensure height style is removed
                     item.style.height = '';
                     item.style.overflow = ''; // Also restore overflow if needed
                }
            }
            hideTimeout = null; // Clear the timeout variable after execution
        }, 100); // Small delay (100ms) before hiding/collapsing
    };

    // Function to clear the hide timeout
    const cancelHide = () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        // Also cancel any ongoing collapse animation if mouse re-enters
        if (collapseAnimation) {
            collapseAnimation.cancel();
            collapseAnimation = null;
            // When canceling collapse, we should restore the height to its final state (with popup) if the popup was already added
            // This might require a bit more complex state management, but for now, let's just clear the explicit height set for animation
             item.style.height = ''; // Let CSS determine height
             item.style.overflow = ''; // Let CSS determine overflow
        }
    };

    item.addEventListener('mouseenter', () => {
        cancelHide(); // Cancel any pending hide or collapse animation

        // Remove any existing popups within this item to avoid duplicates on re-hover
        item.querySelectorAll('.service-popup-container').forEach(popup => popup.remove());

        // Stop any ongoing expand animation
        if (expandAnimation) {
            expandAnimation.cancel();
        }

        // Get the initial height before adding the popup and setting overflow
        const initialHeight = item.offsetHeight;

        // Create the container for the popup boxes
        popupContainer = document.createElement('div');
        popupContainer.classList.add('service-popup-container');

        // Get service type from the item's heading
        const serviceType = item.querySelector('h2').textContent.toLowerCase();
        
        // Define content for each service type
        const serviceContents = {
            'opus': [
                { title: 'Pre-Production & Arrangement Support' },
                { title: 'Professional Tracking Session' },
                { title: 'Vocal Coaching & Session Directing' }
            ],
            'aural': [
                { title: 'Audio Editing & Comping' },
                { title: 'Precision Mixing' },
                { title: 'Mastering for Distribution' }
            ],
           
        };

        // Get content based on service type for prestige
        const contents = serviceContents[serviceType] || [
            { title: 'Comprehensive Tracking Session' },
            { title: 'Advanced Post-Production' },
            { title: 'Digital Release & Technical Publishing Support' }
        ];

        // Create and add the boxes with custom content
        contents.forEach((content, index) => {
            const box = document.createElement('div');
            box.classList.add('service-popup-box');
            box.innerHTML = `
                <strong>${index + 1}.</strong>
                <p><span>${content.title}</span></p>
            `;
            popupContainer.appendChild(box);
        });

        // Temporarily set overflow to hidden and set height to initial height for animation setup
        // Store original overflow
        const originalOverflow = item.style.overflow;
        item.style.overflow = 'hidden'; // Hide overflow during animation
        item.style.height = `${initialHeight}px`;

        // Append the popup container to the hovered item
        item.appendChild(popupContainer);

        // Calculate the final height after adding the popup
        // Temporarily set height to auto to measure the needed height
        item.style.height = 'auto';
        const finalHeight = item.offsetHeight;

        // Set height back to initial for animation start
        // Store original overflow before setting
        // const originalOverflow = item.style.overflow; // Already stored above
        // item.style.overflow = 'hidden'; // Already set above
        item.style.height = `${initialHeight}px`; // Ensure it's set back to initial

        // Animate the height change
        expandAnimation = item.animate([
            { height: `${initialHeight}px` },
            { height: `${finalHeight}px` }
        ], {
            duration: 600, // Animation duration in milliseconds (Increased for smoother expand)
            easing: 'ease-out' // Easing function
        });

        // After the animation finishes, reset height and overflow
        expandAnimation.onfinish = () => {
            item.style.height = ''; // Remove explicit height style
            item.style.overflow = originalOverflow; // Restore original overflow
            expandAnimation = null;
        };

        // Add mouseleave/mouseenter listeners to the popup container
        popupContainer.addEventListener('mouseleave', hidePopup);
        popupContainer.addEventListener('mouseenter', cancelHide);
    });

    // Add mouseleave listener to the item
    item.addEventListener('mouseleave', hidePopup);
});

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqMoreBtn = document.querySelector('.faq-more-btn');
    const faqHideBtn = document.querySelector('.faq-hide-btn');
    const hiddenFaqs = document.querySelectorAll('.hidden-faq');
    const faqContainer = document.querySelector('.faq-container');
    
    // Toggle FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                    otherAnswer.style.transform = 'translateY(-10px)';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.transform = 'translateY(0)';
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.transform = 'translateY(-10px)';
            }
        });
    });

    // Show More FAQ functionality
    if (faqMoreBtn) {
        faqMoreBtn.addEventListener('click', () => {
            // Show hidden FAQs with staggered animation
            hiddenFaqs.forEach((faq, index) => {
                setTimeout(() => {
                    faq.classList.add('show');
                    // Trigger reflow to ensure smooth animation
                    faq.offsetHeight;
                }, index * 100); // Stagger the animations by 100ms
            });
            
            // Animate buttons
            faqMoreBtn.classList.add('hide');
            setTimeout(() => {
                faqMoreBtn.style.display = 'none';
                faqHideBtn.style.display = 'inline-block';
                // Trigger reflow
                faqHideBtn.offsetHeight;
                faqHideBtn.classList.remove('hide');
            }, 300);
            
            // Smooth scroll to the newly revealed content
            const lastHiddenFaq = hiddenFaqs[hiddenFaqs.length - 1];
            lastHiddenFaq.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Hide FAQ functionality
    if (faqHideBtn) {
        faqHideBtn.addEventListener('click', () => {
            // Animate buttons
            faqHideBtn.classList.add('hide');
            setTimeout(() => {
                faqHideBtn.style.display = 'none';
                faqMoreBtn.style.display = 'inline-block';
                // Trigger reflow
                faqMoreBtn.offsetHeight;
                faqMoreBtn.classList.remove('hide');
            }, 300);
            
            // Hide hidden FAQs with staggered animation
            hiddenFaqs.forEach((faq, index) => {
                setTimeout(() => {
                    faq.classList.remove('show');
                }, index * 50); // Stagger the animations by 50ms
            });
            
            // Smooth scroll to the top of the FAQ section
            document.querySelector('#faq').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});

// Animate all radar circles
document.querySelectorAll('.radar-circle').forEach((circle, index) => {
    const circles = circle.querySelectorAll('circle');
    const timeline = gsap.timeline({
        repeat: -1,
        delay: Math.random() * 2 // Random delay for each radar group
    });

    circles.forEach((c, i) => {
        timeline.to(c, {
            scale: 1.5,
            opacity: 0,
            duration: 2 + (i * 0.5), // Longer duration for outer circles
            ease: "power2.out",
            repeat: -1,
            yoyo: true
        }, 0);
    });
});

