import Glide from '@glidejs/glide';
import { Fancybox } from "@fancyapps/ui";

if (document.querySelector('.js--tour-gallery')) {
    const tourSliders = Array.from(document.querySelectorAll('.js--tour-gallery'));

    tourSliders.forEach((slider) => {
        new Glide(slider, {
            bound: true,
            gap: 0,
            perView: 1,
        }).mount();
    })
}

if (document.querySelector('.js--tour-modal')) {
    Fancybox.bind("[data-fancybox='tour-group']", {
        preload: 0,
        groupAll : true,
        dragToClose: false,
        Toolbar: false,
        closeButton: "top",
    });
}