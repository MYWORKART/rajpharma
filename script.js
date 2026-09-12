/* =====================================================
   RAJ PHARMA EXPORTS
   JAVASCRIPT
   VERCEL + MONGODB VERSION
===================================================== */


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(function () {

            loader.style.opacity = "0";

            setTimeout(function () {

                loader.style.display = "none";

            }, 600);

        }, 700);

    }

});


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar =
    document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (navbar) {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(
                            entry.target
                        );

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

} else {

    revealElements.forEach(function (element) {

        element.classList.add("active");

    });

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll(".counter");

if ("IntersectionObserver" in window) {

    const counterObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {

                        return;

                    }

                    const counter =
                        entry.target;

                    const target =
                        parseInt(
                            counter.getAttribute(
                                "data-target"
                            )
                        ) || 0;

                    let current = 0;

                    const duration = 1500;

                    const increment =
                        target /
                        (duration / 20);

                    const updateCounter =
                        setInterval(function () {

                            current += increment;

                            if (current >= target) {

                                counter.innerText =
                                    target;

                                clearInterval(
                                    updateCounter
                                );

                            } else {

                                counter.innerText =
                                    Math.floor(current);

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

}


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (backToTop) {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

});


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =====================================================
   CONTACT FORM
   VERCEL API + MONGODB
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =========================================
               GET FORM VALUES
            ========================================= */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const company =
                document
                    .getElementById("company")
                    .value
                    .trim();


            const product =
                document
                    .getElementById("product")
                    .value;


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /* =========================================
               REQUIRED FIELD VALIDATION
            ========================================= */

            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                formMessage.innerHTML =
                    '<span style="color:#d93025;">Please fill all required fields.</span>';

                return;

            }


            /* =========================================
               EMAIL VALIDATION
            ========================================= */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.innerHTML =
                    '<span style="color:#d93025;">Please enter a valid email address.</span>';

                return;

            }


            /* =========================================
               SENDING MESSAGE
            ========================================= */

            formMessage.innerHTML =
                '<span style="color:#0876c2;">Sending your enquiry...</span>';


            /* =========================================
               DATA
            ========================================= */

            const inquiryData = {

                name: name,

                email: email,

                company_name: company,

                product: product,

                message: message

            };


            /* =========================================
               SEND TO VERCEL API
            ========================================= */

            try {

                const response =
                    await fetch(
                        "/api/inquiries",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    inquiryData
                                )

                        }
                    );


                /* =====================================
                   READ RESPONSE
                ===================================== */

                const result =
                    await response.json();


                /* =====================================
                   SERVER ERROR
                ===================================== */

                if (!response.ok) {

                    formMessage.innerHTML =
                        '<span style="color:#d93025;">' +
                        (
                            result.message ||
                            "Server error. Please try again."
                        ) +
                        "</span>";

                    return;

                }


                /* =====================================
                   SUCCESS
                ===================================== */

                if (result.success) {

                    formMessage.innerHTML =
                        '<span style="color:#078d61;">' +
                        result.message +
                        "</span>";


                    contactForm.reset();

                } else {

                    formMessage.innerHTML =
                        '<span style="color:#d93025;">' +
                        (
                            result.message ||
                            "Unable to save your enquiry."
                        ) +
                        "</span>";

                }


            } catch (error) {

                console.error(
                    "API ERROR:",
                    error
                );


                formMessage.innerHTML =
                    '<span style="color:#d93025;">' +
                    "Unable to connect to the server. Please try again." +
                    "</span>";

            }

        }
    );

}


/* =====================================================
   MOBILE NAVBAR CLOSE
===================================================== */

const navItems =
    document.querySelectorAll(".nav-link");

const navbarCollapse =
    document.getElementById("navbarNav");


navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            if (
                window.innerWidth < 992 &&
                navbarCollapse &&
                typeof bootstrap !== "undefined"
            ) {

                const bsCollapse =
                    bootstrap.Collapse.getInstance(
                        navbarCollapse
                    );

                if (bsCollapse) {

                    bsCollapse.hide();

                }

            }

        }
    );

});


/* =====================================================
   BUTTON EFFECT
===================================================== */

const buttons =
    document.querySelectorAll(
        ".primary-btn, .secondary-btn, .contact-btn"
    );


buttons.forEach(function (button) {

    button.addEventListener(
        "mouseenter",
        function () {

            button.style.transition =
                "0.3s ease";

        }
    );

});