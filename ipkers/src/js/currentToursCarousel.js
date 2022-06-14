import Glide from '@glidejs/glide';

if (document.querySelector('.js--current-tours-carousel')) {
    const carousel = new Glide('.js--current-tours-carousel', {
        bound: true,
        gap: 50,
        perView: 4,
        breakpoints: {
            690: { perView: 1 },
            920: {
                perView: 2,
                gap: 30
            },
            1240: { perView: 3 }
        }
    }).mount();
    const carouselProgress = document.querySelector('.js--current-tours-carousel-progress');

    const setCarouselProgress = () => {
        const currentIndex = carousel.index;
        const itemsPerView = carousel.settings.perView;
        const itemsCount = document.querySelectorAll(carousel.selector + ' .glide__slide').length;
        const progressPercent = (itemsPerView + currentIndex) / itemsCount;
        carouselProgress.style.transform = `scaleX(${progressPercent})`;
    }

    setCarouselProgress();

    carousel.on('move', setCarouselProgress);
}