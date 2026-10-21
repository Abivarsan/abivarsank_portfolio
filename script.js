const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if(!link.classList.contains('active')){
            activePage();
            link.classList.add('active');

            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if(!navLinks[0].classList.contains('active')){
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail=> {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});  

// --- PORTFOLIO & SCREENSHOT CONTROLLER ---
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const portfolioCarousel = document.querySelector('.portfolio-carousel');
const innerArrowLeft = document.querySelector('.inner-arrow-left');
const innerArrowRight = document.querySelector('.inner-arrow-right');
const counterCurrent = document.querySelector('.carousel-counter .current-slide');
const counterTotal = document.querySelector('.carousel-counter .total-slides');

let index = 0; // Current active project (0 to N-1)
let slideInterval = null;
let isHovered = false;

const getImgItems = () => document.querySelectorAll('.portfolio-carousel .img-item');
const innerSlideIndices = Array.from({ length: 20 }, () => 0);

const getActiveInnerSlider = () => {
    const items = getImgItems();
    const currentItem = items[index];
    return currentItem ? currentItem.querySelector('.inner-slider') : null;
};

const getActiveImages = () => {
    const slider = getActiveInnerSlider();
    return slider ? slider.querySelectorAll('img') : [];
};

const updateInnerSlideView = (resetTimer = false) => {
    const slider = getActiveInnerSlider();
    const images = getActiveImages();
    const total = images.length;

    if (!slider || total === 0) return;

    // Show/hide inner controls if project has only 1 image
    if (portfolioCarousel) {
        if (total <= 1) {
            portfolioCarousel.classList.add('single-image');
        } else {
            portfolioCarousel.classList.remove('single-image');
        }
    }

    const currentInner = innerSlideIndices[index] || 0;
    slider.style.transform = `translateX(-${currentInner * 100}%)`;

    if (counterCurrent && counterTotal) {
        counterCurrent.textContent = currentInner + 1;
        counterTotal.textContent = total;
    }

    if (resetTimer) {
        restartAutoSlide();
    }
};

const nextInnerSlide = () => {
    const images = getActiveImages();
    if (images.length <= 1) return;
    innerSlideIndices[index] = ((innerSlideIndices[index] || 0) + 1) % images.length;
    updateInnerSlideView();
};

const prevInnerSlide = () => {
    const images = getActiveImages();
    if (images.length <= 1) return;
    innerSlideIndices[index] = ((innerSlideIndices[index] || 0) - 1 + images.length) % images.length;
    updateInnerSlideView();
};

const startAutoSlide = () => {
    stopAutoSlide();
    const images = getActiveImages();
    if (images.length <= 1) return;

    slideInterval = setInterval(() => {
        if (!isHovered) {
            nextInnerSlide();
        }
    }, 3500);
};

const stopAutoSlide = () => {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
};

const restartAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
};

// Pause on hover
if (portfolioCarousel) {
    portfolioCarousel.addEventListener('mouseenter', () => {
        isHovered = true;
    });
    portfolioCarousel.addEventListener('mouseleave', () => {
        isHovered = false;
    });
}

// Inner arrow listeners
if (innerArrowRight) {
    innerArrowRight.addEventListener('click', (e) => {
        e.stopPropagation();
        nextInnerSlide();
        restartAutoSlide();
    });
}

if (innerArrowLeft) {
    innerArrowLeft.addEventListener('click', (e) => {
        e.stopPropagation();
        prevInnerSlide();
        restartAutoSlide();
    });
}

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');

    // Update inner slide view and restart timer
    updateInnerSlideView(true);
};

arrowRight.addEventListener('click', () => {
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    const maxIndex = portfolioDetails.length - 1;

    if (index < maxIndex) {
        index++;
        arrowLeft.classList.remove('disabled');
        if (index === maxIndex) {
            arrowRight.classList.add('disabled');
        }
        activePortfolio();
    }
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
        arrowRight.classList.remove('disabled');
        if (index === 0) {
            arrowLeft.classList.add('disabled');
        }
        activePortfolio();
    }
});

// Initial inner slide view & auto-slide startup
updateInnerSlideView(true);

// Initialize EmailJS with your public key
emailjs.init("z40CrSJ1g5HnvpJt8"); // Replace with your EmailJS public key

// Get the contact form
const form = document.getElementById('contact-form');

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Collect the form data
    const formData = {
        from_name: document.getElementById('full-name').value,
        from_email: document.getElementById('email').value,
        from_phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS
    emailjs.send('service_gl08djb', 'template_ov4hn1w', formData)
        .then(function(response) {
            // Display success message
            console.log('Message sent successfully:', response);
            alert("Your message has been sent!");
            form.reset(); // Reset form fields
        }, function(error) {
            // Display error message
            console.error('Failed to send message:', error);
            alert("Oops! Something went wrong, please try again.");
        });
});

// --- Dynamic Age Calculation ---
function updateDynamicAge() {
    const ageSpan = document.getElementById('user-age');
    if (!ageSpan) return;

    // Reads date of birth from the data-dob attribute on #user-age (format: YYYY-MM-DD)
    const dobString = ageSpan.getAttribute('data-dob') || "2000-01-01";
    const dob = new Date(dobString);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    // If birthday hasn't occurred yet this year, decrement age by 1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    ageSpan.textContent = `${age} Years Old`;
}

// Automatically calculate and update age on load
updateDynamicAge();
