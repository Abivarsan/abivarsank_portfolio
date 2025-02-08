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



const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
}

arrowRight.addEventListener('click', () => {
    if(index < 3){
        index++;
        arrowLeft.classList.remove('disabled');
    } else {
        index = 4;
        arrowRight.classList.add('disabled');
    }

    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if(index > 1){
        index--;
        arrowRight.classList.remove('disabled');
    } else {
        index = 0;
        arrowLeft.classList.add('disabled');
    }

    activePortfolio();
});


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
