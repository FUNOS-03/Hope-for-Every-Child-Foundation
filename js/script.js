// Hope for Every Child Foundation
// Part 2 - Form functionality

document.addEventListener("DOMContentLoaded", function () {

    // Enquiry form
    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert("Thank you for your enquiry! We will get back to you soon.");

            enquiryForm.reset();

        });

    }


    // Contact form
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert("Thank you for contacting Hope for Every Child Foundation!");

            contactForm.reset();

        });

    }

});