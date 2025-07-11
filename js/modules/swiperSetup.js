// js/modules/swiperSetup.js

export function initSwiper() {
    if (typeof Swiper === 'undefined') {
        console.error('Swiper library is not loaded.');
        return;
    }

    const swiperWrapper = document.querySelector('.testimonials-swiper-wrapper');
    const prevButton = document.querySelector('.testimonial-prev-btn');
    const nextButton = document.querySelector('.testimonial-next-btn');
    const errorMessageContainer = document.querySelector('.testimonial-error-message');
    const swiperContainer = document.querySelector('.swiper-testimonials-reworked');

    if (!swiperWrapper || !prevButton || !nextButton || !errorMessageContainer || !swiperContainer) {
        return; 
    }

    const staticReviewsData = [
      {
        _id: "static1", 
        avatar_url: "img/placeholder/testimonials_men.png", 
        author: "Max Sokur",
        review: "Die Zusammenarbeit war äußerst professionell und das Ergebnis übertrifft unsere Erwartungen. Die Webseite ist modern, schnell und benutzerfreundlich. Sehr zu empfehlen!"
      },
      {
        _id: "static2",
        avatar_url: "img/placeholder/testimonials_girl.png",
        author: "Erika Podriz",
        review: "Ein sehr kompetenter Entwickler mit einem Auge fürs Detail. Die Kommunikation war stets klar und transparent. Unsere Vorstellungen wurden perfekt umgesetzt."
      },
      {
        _id: "static3",
        avatar_url: "img/placeholder/image.png",
        author: "Agentur Kreativ GmbH",
        review: "Schnelle Umsetzung, kreative Lösungsansätze und ein tolles Endprodukt. Wir sind mit der neuen Webseite sehr zufrieden und haben bereits positives Feedback von unseren Kunden erhalten."
      },
      {
        _id: "static4",
        avatar_url: "img/placeholder/sturtup.png",
        author: "Start-Up Visionär",
        review: "Vom ersten Gespräch bis zum Launch fühlten wir uns bestens betreut. Technische Kompetenz gepaart mit kreativem Input – genau das, что wir gesucht haben." // Опечатка в примере, должно быть: was wir gesucht haben.
      }
    ];

    function renderReviews(reviews) {
        if (errorMessageContainer) {
             errorMessageContainer.style.display = 'none';
             errorMessageContainer.textContent = '';
        }

        if (!reviews || reviews.length === 0) {
            swiperWrapper.innerHTML = '<li class="swiper-slide" style="text-align: center; color: var(--text-secondary); padding: 2rem; display: flex; align-items: center; justify-content: center;">Keine Referenzen verfügbar.</li>';
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            return false; 
        }

        if (prevButton) prevButton.style.display = 'inline-flex';
        if (nextButton) nextButton.style.display = 'inline-flex';

        const reviewsMarkup = reviews
            .map(
                review => `
                <div class="swiper-slide testimonial-reworked-slide">
                    <div class="testimonial-reworked-text-content scrollable-text">
                        <p>${review.review}</p>
                    </div>
                    <div class="testimonial-reworked-author-info">
                        <img src="${review.avatar_url}"
                             alt="Avatar von ${review.author}"
                             class="testimonial-reworked-avatar"
                             loading="lazy"
                             onerror="this.style.display='none'; this.nextElementSibling.style.marginLeft='0';">
                        <h4 class="testimonial-reworked-author-name">${review.author}</h4>
                    </div>
                </div>
                `
            )
            .join('');
        swiperWrapper.innerHTML = reviewsMarkup;
        return true; 
    }

    function initializeSwiper() {
        if (swiperContainer.swiper) {
            swiperContainer.swiper.destroy(true, true);
        }

        new Swiper(swiperContainer, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false, 
            grabCursor: true,
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            a11y: {
                prevSlideMessage: 'Vorherige Folie',
                nextSlideMessage: 'Nächste Folie',
            },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 25, },
                1024: { slidesPerView: 2, spaceBetween: 30, },
                1280: { slidesPerView: 2, spaceBetween: 32, }
            },
        });
    }

    function loadAndInit() {
        const reviewsAvailable = renderReviews(staticReviewsData); 
        if (reviewsAvailable) { 
            initializeSwiper();
        }
    }

    loadAndInit(); 
}

