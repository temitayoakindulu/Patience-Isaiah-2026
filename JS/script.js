
const preloader = document.getElementById("preloader");

const invitedText = document.querySelector(".invited-text");
const guestName = new URLSearchParams(window.location.search).get("to");

if (guestName && guestName.trim()) {
    invitedText.textContent = `${guestName.trim()}, YOU ARE INVITED`;
}

window.addEventListener("load", function () {
    setTimeout(function () {
        preloader.classList.add("hide");
        setTimeout(function () {
            document.body.classList.add("page-ready");
            startSectionReveal();
        }, 500);
    }, 2000);
});






// =========================
// NAVIGATION MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");


// Open / close menu
menuToggle.addEventListener("click", function () {

    menuToggle.classList.toggle("active");

    mobileMenu.classList.toggle("active");


    // Update accessibility state
    const isOpen = menuToggle.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});


// Close menu when a link is clicked
const menuLinks = document.querySelectorAll(".mobile-menu a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        menuToggle.classList.remove("active");

        mobileMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");

    });

});


// Wedding date
const weddingDate = new Date("2026-11-28T11:00:00+01:00").getTime();


// Update countdown every second
const countdown = setInterval(function () {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the difference between wedding date and now
    const distance = weddingDate - now;


    // Calculate days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );


    // Put the numbers into the HTML
    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent = hours;

    document.getElementById("minutes").textContent = minutes;

    document.getElementById("seconds").textContent = seconds;


    // When the countdown reaches zero
    if (distance < 0) {

        clearInterval(countdown);

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
    }

}, 1000);


/* =========================
   GALLERY DATA
========================= */

const galleryItems = [
    {
        type: "image",
        src: "images/gallery/photo-01.jpg",
        caption: "Our beautiful beginning."
    },

    {
        type: "image",
        src: "images/gallery/photo-02.jpg",
        caption: "A moment to remember."
    },

    {
        type: "image",
        src: "images/gallery/photo-03.jpg",
        caption: "Together is our favourite place."
    },

    {
        type: "image",
        src: "images/gallery/photo-04.jpg",
        caption: "Making beautiful memories."
    },

    {
        type: "image",
        src: "images/gallery/photo-05.jpg",
        caption: "A love worth celebrating."
    },

    {
        type: "image",
        src: "images/gallery/photo-06.jpg",
        caption: "Our journey continues."
    },

    {
        type: "image",
        src: "images/gallery/photo-07.jpg",
        caption: "Forever starts here."
    },

    {
        type: "image",
        src: "images/gallery/photo-08.jpg",
        caption: "Love, laughter and memories."
    },

    {
        type: "image",
        src: "images/gallery/photo-09.jpg",
        caption: "One beautiful chapter."
    },

    {
        type: "image",
        src: "images/gallery/photo-10.jpg",
        caption: "Two hearts, one journey."
    },

    {
        type: "image",
        src: "images/gallery/photo-11.jpg",
        caption: "Moments we treasure."
    },

    {
        type: "image",
        src: "images/gallery/photo-12.jpg",
        caption: "With love, always."
    },

    {
        type: "image",
        src: "images/gallery/photo-13.jpg",
        caption: "Our forever begins."
    }
];


/* =========================
   ELEMENTS
========================= */

const galleryProgress =
    document.getElementById("galleryProgress");

const galleryCurrent =
    document.getElementById("galleryCurrent");

const galleryTotal =
    document.getElementById("galleryTotal");

const galleryImage =
    document.getElementById("galleryImage");

const galleryVideo =
    document.getElementById("galleryVideo");

const galleryCaptionNumber =
    document.getElementById("galleryCaptionNumber");

const galleryCaption =
    document.getElementById("galleryCaption");

const galleryPlayPause =
    document.getElementById("galleryPlayPause");

const playingText =
    document.getElementById("playingText");

const galleryViewer =
    document.getElementById("galleryViewer");


/* =========================
   LIGHTBOX ELEMENTS
========================= */

const galleryLightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxVideo =
    document.getElementById("lightboxVideo");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const lightboxClose =
    document.getElementById("lightboxClose");


/* =========================
   VARIABLES
========================= */

let currentIndex = 0;

let isPlaying = false;

let galleryStarted = false;

let slideDuration = 5000;

let slideRemaining = slideDuration;

let slideStartedAt;

let slideTimer;

let progressTimer;


/* =========================
   TOTAL NUMBER
========================= */

galleryTotal.textContent =
    String(galleryItems.length).padStart(2, "0");


/* =========================
   CREATE PROGRESS BARS
========================= */

galleryItems.forEach((item, index) => {

    const bar =
        document.createElement("div");

    bar.className =
        "gallery-progress-bar";

    const fill =
        document.createElement("div");

    fill.className =
        "gallery-progress-bar-fill";

    bar.appendChild(fill);

    galleryProgress.appendChild(bar);

});


const progressBars =
    document.querySelectorAll(
        ".gallery-progress-bar-fill"
    );


/* =========================
   SHOW SLIDE
========================= */

function showSlide(index) {

    currentIndex = index;
    slideRemaining = slideDuration;

    const item =
        galleryItems[currentIndex];

    clearTimeout(slideTimer);
    clearInterval(progressTimer);


    /* Reset progress bars */

    progressBars.forEach((bar, i) => {

        bar.style.width =
            i < currentIndex ? "100%" : "0%";

    });


    /* Update number */

    const number =
        String(currentIndex + 1).padStart(2, "0");

    galleryCurrent.textContent = number;

    galleryCaptionNumber.textContent = number;


    /* Update caption */

    galleryCaption.textContent =
        item.caption;


    /* IMAGE */

    if (item.type === "image") {

        galleryImage.src =
            item.src;

        galleryImage.style.display =
            "block";

        galleryVideo.style.display =
            "none";

        galleryVideo.pause();

    }


    /* VIDEO */

    if (item.type === "video") {

        galleryVideo.src =
            item.src;

        galleryVideo.style.display =
            "block";

        galleryImage.style.display =
            "none";

        galleryVideo.currentTime = 0;

        if (isPlaying) {

            galleryVideo.play().catch(() => {});

        }

    }


    /* Start progress */

    if (isPlaying) {

        startProgress();

    }

}


/* =========================
   PROGRESS
========================= */

function startProgress() {

    clearTimeout(slideTimer);
    clearInterval(progressTimer);
    slideStartedAt = Date.now();

    progressTimer =
        setInterval(() => {

            const elapsed =
                slideDuration - slideRemaining +
                Date.now() - slideStartedAt;

            const percentage =
                Math.min(
                    (elapsed / slideDuration) * 100,
                    100
                );

            progressBars[currentIndex]
                .style.width =
                `${percentage}%`;

        }, 30);


    slideTimer =
        setTimeout(() => {

            nextSlide();

        }, slideRemaining);

}


/* =========================
   NEXT SLIDE
========================= */

function nextSlide() {

    currentIndex++;

    if (currentIndex >= galleryItems.length) {

        currentIndex = 0;

    }

    showSlide(currentIndex);
}


/* =========================
   PREVIOUS SLIDE
========================= */

function previousSlide() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            galleryItems.length - 1;

    }

    showSlide(currentIndex);
}


/* =========================
   PLAY / PAUSE
========================= */

galleryPlayPause.addEventListener(
    "click",
    function () {

        if (!galleryStarted) {
            return;
        }

        isPlaying = !isPlaying;

        if (isPlaying) {

            galleryPlayPause.innerHTML = `
                <i class="fa-solid fa-pause"></i>
                <span>Pause</span>
            `;

            playingText.textContent =
                "PLAYING MEMORIES";

            startProgress();

        } else {

            clearTimeout(slideTimer);
            clearInterval(progressTimer);
            slideRemaining = Math.max(
                0,
                slideRemaining - (Date.now() - slideStartedAt)
            );

            galleryPlayPause.innerHTML = `
                <i class="fa-solid fa-play"></i>
                <span>Play</span>
            `;

            playingText.textContent =
                "PAUSED";

            galleryVideo.pause();

        }

    }
);


/* =========================
   CLICK IMAGE
========================= */

galleryViewer.addEventListener(
    "click",
    function () {

        const item =
            galleryItems[currentIndex];

        galleryLightbox.classList.add(
            "active"
        );

        lightboxCaption.textContent =
            `${String(currentIndex + 1).padStart(2, "0")} — ${item.caption}`;


        if (item.type === "image") {

            lightboxImage.src =
                item.src;

            lightboxImage.style.display =
                "block";

            lightboxVideo.style.display =
                "none";

        }


        if (item.type === "video") {

            lightboxVideo.src =
                item.src;

            lightboxVideo.style.display =
                "block";

            lightboxImage.style.display =
                "none";

            lightboxVideo.play().catch(() => {});

        }

    }
);


/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {

    galleryLightbox.classList.remove(
        "active"
    );

    lightboxVideo.pause();

    lightboxVideo.src = "";

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


/* Close when clicking background */

galleryLightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target === galleryLightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================
   KEYBOARD ESC
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);


/* =========================
   TOUCH SWIPE
========================= */

let touchStartX = 0;

let touchEndX = 0;


galleryViewer.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


galleryViewer.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    }
);


function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;


    if (Math.abs(swipeDistance) < 50) {

        return;

    }


    if (swipeDistance < 0) {

        nextSlide();

    } else {

        previousSlide();

    }

}


/* =========================
   START GALLERY
========================= */

const gallerySection = document.getElementById("gallery");

const galleryStartObserver = new IntersectionObserver(
    entries => {
        if (entries.some(entry => entry.isIntersecting)) {
            galleryStarted = true;
            isPlaying = true;
            galleryPlayPause.disabled = false;
            galleryPlayPause.innerHTML = `
                <i class="fa-solid fa-pause"></i>
                <span>Pause</span>
            `;
            playingText.textContent = "PLAYING MEMORIES";
            showSlide(0);
            galleryStartObserver.disconnect();
        }
    },
    { threshold: 0.2 }
);

galleryStartObserver.observe(gallerySection);

function startSectionReveal() {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle(
                    "in-view",
                    entry.isIntersecting
                );
            });
        },
        {
            threshold: 0.15
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
}



document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       ALWAYS START AT TOP
    ========================= */

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

});


document.getElementById("calendarBtn").addEventListener("click", function () {
    const calendarUrl =
        "https://patienceisaiah-2026.infinityfree.me/calendar/wedding.ics";

    window.location.href = calendarUrl;
});