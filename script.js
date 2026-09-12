/* =====================================================
   RAJ PHARMA EXPORTS
   JAVASCRIPT
===================================================== */


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {

        loader.style.opacity = "0";

        setTimeout(function () {
            loader.style.display = "none";
        }, 600);

    }, 700);

});



/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});



/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    function (entries, observer) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;

            const target =
                parseInt(counter.getAttribute("data-target"));

            let current = 0;

            const duration = 1500;

            const increment = target / (duration / 20);

            const updateCounter = setInterval(function () {

                current += increment;

                if (current >= target) {

                    counter.innerText = target;

                    clearInterval(updateCounter);

                } else {

                    counter.innerText = Math.floor(current);

                }

            }, 20);

            observer.unobserve(counter);

        });

    },
    {
        threshold: 0.7
    }
);


counters.forEach(function (counter) {

    counterObserver.observe(counter);

});



/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});



/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const company =
        document.getElementById("company").value.trim();

    const product =
        document.getElementById("product").value;

    const message =
        document.getElementById("message").value.trim();


    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        formMessage.innerHTML =
            '<span style="color:#d93025;">Please fill all required fields.</span>';

        return;

    }


    const formData = new FormData(contactForm);


    formMessage.innerHTML =
        '<span style="color:#0876c2;">Sending your enquiry...</span>';


    try {

        const response = await fetch("backend/submit_inquiry.php", {
            method: "POST",
            body: formData
        });


        const result = await response.json();


        if (result.success) {

            formMessage.innerHTML =
                '<span style="color:#078d61;">' +
                result.message +
                '</span>';

            contactForm.reset();

        } else {

            formMessage.innerHTML =
                '<span style="color:#d93025;">' +
                result.message +
                '</span>';

        }

    } catch (error) {

        formMessage.innerHTML =
            '<span style="color:#d93025;">Unable to connect to the server. Please try again.</span>';

    }

});



/* =====================================================
   MOBILE NAVBAR CLOSE
===================================================== */

const navItems =
    document.querySelectorAll(".nav-link");


const navbarCollapse =
    document.getElementById("navbarNav");


navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        if (window.innerWidth < 992) {

            const bsCollapse =
                bootstrap.Collapse.getInstance(navbarCollapse);

            if (bsCollapse) {

                bsCollapse.hide();

            }

        }

    });

});



/* =====================================================
   SMOOTH BUTTON EFFECT
===================================================== */

const buttons =
    document.querySelectorAll(".primary-btn, .secondary-btn, .contact-btn");


buttons.forEach(function (button) {

    button.addEventListener("mouseenter", function () {

        button.style.transition = "0.3s ease";

    });

});