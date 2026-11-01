
// Hope for Every Child Foundation
// Part 3 - JavaScript functionality, forms, map, gallery and FAQ accordion

document.addEventListener("DOMContentLoaded", function () {

    // 1. PROGRAMME SEARCH
    const programmeSearch = document.getElementById("programmeSearch");
    const programmeCards = document.querySelectorAll(".programme-card");
    const searchMessage = document.getElementById("searchMessage");

    if (programmeSearch) {
        programmeSearch.addEventListener("input", function () {
            const searchText = programmeSearch.value.toLowerCase().trim();
            let visibleCount = 0;

            programmeCards.forEach(function (card) {
                if (card.textContent.toLowerCase().includes(searchText)) {
                    card.style.display = "";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            if (searchMessage) {
                searchMessage.textContent = visibleCount + " programme(s) found.";
            }
        });
    }

    // 2. ENQUIRY FORM
    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            const name = document.getElementById("fullName").value.trim();
            const enquiryType = document.getElementById("enquiryType").value;
            const programme = document.getElementById("programme").value;

            let response = "";

            if (enquiryType === "Volunteering") {
                response = "Thank you for your interest in volunteering. Our team will share information about opportunities.";
            } else if (enquiryType === "Sponsorship") {
                response = "Thank you for your interest in sponsorship. Our team will contact you about opportunities.";
            } else if (programme === "Education Support") {
                response = "Our team will provide more information about our Education Support programme.";
            } else if (programme === "Nutrition Support") {
                response = "Our team will provide more information about our Nutrition Support programme.";
            } else if (programme === "Community Support") {
                response = "Our team will provide more information about our Community Support programme.";
            } else {
                response = "Our team will review your enquiry and get back to you.";
            }

            const personalisedMessage = "Thank you, " + name + "! " +
                response + " Programme availability and any costs will be confirmed by our team.";

            alert(personalisedMessage);

            const messageArea = document.getElementById("enquiryMessage");

            if (messageArea) {
                messageArea.textContent = personalisedMessage;
                messageArea.style.display = "block";
                messageArea.style.visibility = "visible";
                messageArea.style.color = "green";
                messageArea.style.fontWeight = "bold";
                messageArea.style.padding = "15px";
            }
        });
    }

    // 3. CONTACT FORM - PREPARE EMAIL
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const messageType = document.getElementById("messageType").value;
            const message = document.getElementById("contactMessage").value.trim();

            const recipient = "info@hopeforeverychild.org";
            const subject = encodeURIComponent("Website Contact - " + messageType);

            const body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Message Type: " + messageType + "\n\n" +
                "Message:\n" + message
            );

            const emailLink = "mailto:" + recipient +
                "?subject=" + subject + "&body=" + body;

            const confirmation = document.getElementById("contactMessageDisplay");

            if (confirmation) {
                confirmation.textContent = "Your email draft is being prepared. Please review it in your email application and click Send to submit your message.";
                confirmation.style.display = "block";
                confirmation.style.color = "green";
                confirmation.style.fontWeight = "bold";
                confirmation.style.padding = "15px";
            }

            window.location.href = emailLink;
        });
    }

    // 4. INTERACTIVE LEAFLET MAP
    const mapElement = document.getElementById("foundationMap");

    if (mapElement && typeof L !== "undefined") {

        const foundationMap = L.map("foundationMap");

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(foundationMap);

        const pretoria = [-25.7479, 28.2293];
        const johannesburg = [-26.2041, 28.0473];

        L.marker(pretoria).addTo(foundationMap)
            .bindPopup("<strong>Pretoria</strong><br>Approximate city-centre location.");

        L.marker(johannesburg).addTo(foundationMap)
            .bindPopup("<strong>Johannesburg</strong><br>Approximate city-centre location.");

        foundationMap.fitBounds([pretoria, johannesburg], {
            padding: [30, 30]
        });
    }

    // 5. INTERACTIVE IMAGE GALLERY AND LIGHTBOX
    const galleryImages = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");

    if (galleryImages.length > 0 && lightbox && lightboxImage && lightboxClose) {

        galleryImages.forEach(function (image) {
            image.addEventListener("click", function () {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
                lightbox.style.display = "flex";
            });
        });

        lightboxClose.addEventListener("click", function () {
            lightbox.style.display = "none";
            lightboxImage.src = "";
        });

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.style.display = "none";
                lightboxImage.src = "";
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                lightbox.style.display = "none";
                lightboxImage.src = "";
            }
        });
    }

    // 6. FAQ ACCORDION
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer = question.nextElementSibling;
            const isOpen = question.getAttribute("aria-expanded") === "true";

            question.setAttribute("aria-expanded", String(!isOpen));

            if (isOpen) {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }

        });

    });

});

