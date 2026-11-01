
/* =========================================
   HOPE FOR EVERY CHILD FOUNDATION
   PART 3 - JAVASCRIPT FUNCTIONALITY
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. PROGRAMME SEARCH FUNCTION
       ===================================== */

    const programmeSearch = document.getElementById("programmeSearch");
    const programmeCards = document.querySelectorAll(".programme-card");
    const searchMessage = document.getElementById("searchMessage");

    if (programmeSearch) {

        programmeSearch.addEventListener("input", function () {

            const searchTerm = programmeSearch.value.toLowerCase().trim();
            let visibleCount = 0;

            programmeCards.forEach(function (card) {

                const cardText = card.textContent.toLowerCase();

                if (cardText.includes(searchTerm)) {
                    card.style.display = "";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }

            });

            if (searchMessage) {
                if (visibleCount === 0) {
                    searchMessage.textContent =
                        "No programmes found. Please try another search.";
                } else {
                    searchMessage.textContent =
                        visibleCount + " programme(s) found.";
                }
            }

        });

    }


    /* =====================================
       2. ENQUIRY FORM VALIDATION
       ===================================== */

    const enquiryForm = document.getElementById("enquiryForm");
    const enquiryMessage = document.getElementById("enquiryMessage");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            const fullName =
                document.getElementById("fullName").value.trim();

            const enquiryType =
                document.getElementById("enquiryType").value;

            const programme =
                document.getElementById("programme").value;

            let response = "";

            if (enquiryType.toLowerCase().includes("volunteer")) {

                response = "Thank you, " + fullName +
                    ". We appreciate your interest in volunteering. " +
                    "Our team will review your enquiry.";

            } else if (enquiryType.toLowerCase().includes("sponsor")) {

                response = "Thank you, " + fullName +
                    ". We appreciate your interest in sponsoring " +
                    "Hope for Every Child Foundation.";

            } else if (enquiryType.toLowerCase().includes("programme")) {

                response = "Thank you, " + fullName +
                    ". Your enquiry about " + programme +
                    " has been recorded for review.";

            } else {

                response = "Thank you, " + fullName +
                    ". Your enquiry has been received for review.";

            }

            if (enquiryMessage) {
                enquiryMessage.textContent = response;
            }

        });

    }


    /* =====================================
       3. CONTACT FORM VALIDATION
       AND EMAIL PREPARATION
       ===================================== */

    const contactForm = document.getElementById("contactForm");
    const contactMessageDisplay =
        document.getElementById("contactMessageDisplay");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name =
                document.getElementById("contactName").value.trim();

            const email =
                document.getElementById("contactEmail").value.trim();

            const messageType =
                document.getElementById("messageType").value;

            const message =
                document.getElementById("contactMessage").value.trim();

            const subject = encodeURIComponent(
                "Website enquiry: " + messageType
            );

            const body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Message type: " + messageType + "\n\n" +
                "Message:\n" + message
            );

            const emailLink =
                "mailto:info@hopeforeverychild.org" +
                "?subject=" + subject +
                "&body=" + body;

            if (contactMessageDisplay) {

                contactMessageDisplay.textContent =
                    "Thank you, " + name +
                    ". Your email draft is being prepared. " +
                    "Please send it using your email application.";

            }

            window.location.href = emailLink;

        });

    }


    /* =====================================
       4. INTERACTIVE LEAFLET MAP
       ===================================== */

    const mapElement = document.getElementById("foundationMap");

    if (mapElement && typeof L !== "undefined") {

        const pretoria = [-25.7479, 28.2293];
        const johannesburg = [-26.2041, 28.0473];

        const foundationMap = L.map("foundationMap");

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">' +
                'OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(foundationMap);

        const pretoriaMarker = L.marker(pretoria).addTo(foundationMap);

        pretoriaMarker.bindPopup(
            "<strong>Pretoria Office</strong><br>" +
            "Pretoria, Gauteng, South Africa"
        );

        const johannesburgMarker =
            L.marker(johannesburg).addTo(foundationMap);

        johannesburgMarker.bindPopup(
            "<strong>Johannesburg Office</strong><br>" +
            "Johannesburg, Gauteng, South Africa"
        );

        foundationMap.fitBounds([
            pretoria,
            johannesburg
        ], {
            padding: [30, 30]
        });

    }


    /* =====================================
       5. IMAGE GALLERY LIGHTBOX
       ===================================== */

    const galleryImages =
        document.querySelectorAll(".gallery-image");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");

    function closeLightbox() {

        if (lightbox) {
            lightbox.style.display = "none";
            lightbox.setAttribute("aria-hidden", "true");
        }

    }

    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {

            if (lightbox && lightboxImage) {

                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;

                lightbox.style.display = "flex";
                lightbox.setAttribute("aria-hidden", "false");

            }

        });

    });

    if (lightboxClose) {

        lightboxClose.addEventListener("click", closeLightbox);

    }

    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });


    /* =====================================
       6. FAQ ACCORDION
       ===================================== */

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer = question.nextElementSibling;

            if (!answer || !answer.classList.contains("faq-answer")) {
                return;
            }

            const isOpen = answer.style.display === "block";

            answer.style.display = isOpen ? "none" : "block";

            question.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

        });

    });


    /* =====================================
       END OF JAVASCRIPT FUNCTIONALITY
       ===================================== */

});
