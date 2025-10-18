// Main JavaScript for Airavat Overseas Website - FIXED VERSION

document.addEventListener('DOMContentLoaded', function() {
    // Product Image Gallery Functionality
    initProductGalleries();
    
    // Mobile Navigation Toggle - FIXED
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('#navbar');

    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            this.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Close mobile menu when clicking on links - NEW FIX
    const navLinks = document.querySelectorAll('#navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Smooth Scrolling for Navigation Links - FIXED
    const allNavLinks = document.querySelectorAll('#navbar a, .hero-content a');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (navbar && navbar.classList.contains('active')) {
                        navbar.classList.remove('active');
                        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active Navigation Link on Scroll - FIXED
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('#navbar a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize active nav link on load
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Header Scroll Effect - FIXED
    const header = document.querySelector('#header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Testimonials Slider (Simple Version) - FIXED
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;
    
    if (totalTestimonials > 0) {
        // Initially hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Function to show next testimonial
        function showNextTestimonial() {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            testimonials[currentTestimonial].style.display = 'block';
        }
        
        // Auto-rotate testimonials every 5 seconds only if more than 1
        if (totalTestimonials > 1) {
            setInterval(showNextTestimonial, 5000);
        }
    }

    // Enhanced Animation on Scroll - COMPLETELY FIXED
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Trigger animation when element is 100px from viewport top
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
                
                // Add specific animation classes based on data attributes
                if (element.dataset.animation) {
                    element.classList.add(element.dataset.animation);
                }
                
                // Add staggered animation delays for child elements
                const childElements = element.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in');
                childElements.forEach((child, index) => {
                    if (!child.style.animationDelay) {
                        child.style.animationDelay = `${0.1 * index}s`;
                    }
                });
            }
        });
    }
    
    // Add animate-on-scroll class to elements that should animate - FIXED
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (section.id !== 'hero' && !section.classList.contains('animate-on-scroll')) {
            section.classList.add('animate-on-scroll');
            
            // Alternate between left and right animations for sections
            if (index % 2 === 0) {
                section.dataset.animation = 'fade-in-left';
            } else {
                section.dataset.animation = 'fade-in-right';
            }
        }
    });
    
    // Add animations to product items - FIXED
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item, index) => {
        if (!item.classList.contains('animate-on-scroll')) {
            item.classList.add('animate-on-scroll');
            item.dataset.animation = 'scale-in';
            item.style.animationDelay = `${0.1 * index}s`;
        }
    });
    
    // Add animations to buttons - FIXED
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        button.addEventListener('animationend', function() {
            this.classList.remove('pulse');
        });
        button.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });
    
    // Add hover animations to navigation items - FIXED
    const navItems = document.querySelectorAll('#navbar ul li a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('shake');
        });
        item.addEventListener('animationend', function() {
            this.classList.remove('shake');
        });
        item.addEventListener('mouseleave', function() {
            this.classList.remove('shake');
        });
    });
    
    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load
    
    // Add animated background to CTA sections
    const ctaSections = document.querySelectorAll('#supply-chain, #quality-assurance, #process-cta');
    ctaSections.forEach(section => {
        section.classList.add('cta-section');
    });
    
    // Enhanced hover effects for brochure categories - FIXED
    const brochureCategories = document.querySelectorAll('.brochure-category');
    brochureCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enhanced download button interactions - FIXED
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Parallax effect for hero section - FIXED
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('#hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Smooth reveal animation for timeline items - FIXED
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${0.2 * index}s`;
    });
    
    // Enhanced FAQ interactions - FIXED
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.toggle-icon i');
        
        if (question && answer && icon) {
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.toggle-icon i');
                        if (otherAnswer && otherIcon) {
                            otherAnswer.style.display = 'none';
                            otherAnswer.style.opacity = '0';
                            otherAnswer.style.transform = 'translateY(-10px)';
                            otherIcon.classList.remove('fa-minus');
                            otherIcon.classList.add('fa-plus');
                        }
                    }
                });
                
                // Toggle current item
                answer.style.display = isOpen ? 'none' : 'block';
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
                
                // Add animation to answer
                if (!isOpen) {
                    setTimeout(() => {
                        answer.style.transition = 'all 0.3s ease';
                        answer.style.opacity = '1';
                        answer.style.transform = 'translateY(0)';
                    }, 10);
                }
            });
        }
    });

    // Initialize Single Image Sliders and Modal
    initializeSingleImageSliders();
    initializeImageModal();
});

// MISSING FUNCTION ADDED - Product Image Gallery Functionality
function initProductGalleries() {
    console.log('Product galleries initialized');
    // Add any product gallery initialization logic here
}

// Single Image Auto-Swipe Functionality - FIXED
function initializeSingleImageSliders() {
    const singleImageContainers = document.querySelectorAll('.single-image-container');
    
    singleImageContainers.forEach(container => {
        const slides = container.querySelectorAll('.single-image-slide');
        const imageCounter = container.querySelector('.image-counter');
        
        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 5000; // 5 seconds between slides
        
        // Function to show a specific slide
        function showSlide(index) {
            // Remove active class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Add active class to current slide
            slides[index].classList.add('active');
            
            // Update image counter
            if (imageCounter) {
                imageCounter.textContent = `${index + 1} / ${slides.length}`;
            }
            
            currentSlide = index;
        }
        
        // Function to show next slide
        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        // Start auto-slide
        function startAutoSlide() {
            // Clear any existing interval first
            stopAutoSlide();
            // Start new interval only if there are multiple slides
            if (slides.length > 1) {
                slideInterval = setInterval(nextSlide, slideDuration);
            }
        }
        
        // Stop auto-slide
        function stopAutoSlide() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }
        
        // Pause on hover - only pause when cursor is directly over the image container
        container.addEventListener('mouseenter', function() {
            stopAutoSlide();
        });
        
        container.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoSlide();
        });
        
        container.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });
        
        container.addEventListener('touchend', () => {
            const diffX = startX - endX;
            const swipeThreshold = 50;
            
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(prevIndex);
                }
            }
            
            // Restart auto-slide after swipe
            startAutoSlide();
        });
        
        // Click to open modal
        container.addEventListener('click', function() {
            const activeSlide = this.querySelector('.single-image-slide.active');
            if (activeSlide) {
                const img = activeSlide.querySelector('img');
                if (img) {
                    const imgSrc = img.src;
                    const modal = document.getElementById('imageModal');
                    const modalImg = document.getElementById('modalImage');
                    
                    if (modal && modalImg) {
                        modalImg.src = imgSrc;
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        stopAutoSlide();
                    }
                }
            }
        });
        
        // Initialize the slider
        if (slides.length > 0) {
            showSlide(0);
            startAutoSlide();
        }
    });
}

// Image Modal Functionality - FIXED
function initializeImageModal() {
    const modal = document.getElementById('imageModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Restart all sliders
                initializeSingleImageSliders();
            }
        });
    }
    
    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Restart all sliders
                initializeSingleImageSliders();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('imageModal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Restart all sliders
                initializeSingleImageSliders();
            }
        }
    });
}

// Add window load event for final initialization
window.addEventListener('load', function() {
    // Final animation check after all resources are loaded
    setTimeout(() => {
        const animateOnScroll = () => {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.classList.add('animated');
                }
            });
        };
        
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }, 100);
});