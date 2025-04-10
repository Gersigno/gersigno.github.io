const track = document.querySelector('.gwin_carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.gwin_carousel_button.right');
const prevButton = document.querySelector('.gwin_carousel_button.left');
let slideWidth = 0;

function autoScroll() {
    setTimeout(() => {
        if( window.getComputedStyle(nextButton).opacity == 0) {
            switchToNextSlide();
        }
        autoScroll();
    }, 5000);
}

/**
 * Rezise/re-init each slide left property on page load/resize
 * @param {*} e message event
 */
window.top.onmessage = function(e) {
    if(e.data === 'gwin_pageupdate' || e.data === 'gwin_pageresize') {
        const pages = document.querySelectorAll('nav-view-page');
        pages.forEach((page) => {
            if(page.style.display === 'flex') {
                const parent = page.parentElement.parentElement;
                parent.tagName === 'MAIN' && page.id != "home_page" ? parent.children[0].style.display = 'none' : parent.children[0].style.display = 'block';
            }
        });
        
        slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
        switchToNextSlide();
        switchToPreviousSlide();
    }
}

/**
 * Move to a new slide
 * @param {*} track Target carousel track
 * @param {*} currentSlide Current displayed slide
 * @param {*} targetSlide Target slide/slide to move to
 */
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('gwin_carousel_slide_current');
    targetSlide.classList.add('gwin_carousel_slide_current');
};

nextButton.addEventListener('click', () => {
    switchToNextSlide();
});

function switchToNextSlide() {
    const currentSlide = track.querySelector('.gwin_carousel_slide_current');
    const nextSlide = currentSlide.nextElementSibling;
    const list = track.querySelectorAll('.gwin_carousel_slide');

    if (nextSlide) {
        moveToSlide(track, currentSlide, nextSlide);
    } else {
        moveToSlide(track, currentSlide, list[0]);
    }
}

function switchToPreviousSlide() {
    const currentSlide = track.querySelector('.gwin_carousel_slide_current');
    const prevSlide = currentSlide.previousElementSibling;
    const list = track.querySelectorAll('.gwin_carousel_slide');

    if (prevSlide) {
        moveToSlide(track, currentSlide, prevSlide);
    } else {
        moveToSlide(track, currentSlide, list[list.length - 1]);
    }
}

prevButton.addEventListener('click', () => {
    switchToPreviousSlide();
});

autoScroll();

function startApp(app) {
    console.log(window.top.system);
    Application.start(app);
}