import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';


const modal = document.querySelector('.js--callback-modal');
const openModalButtons = Array.from(document.querySelectorAll('.js--open-callback-modal'));

if (modal) {
    openModalButtons.forEach(button => {
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            disableBodyScroll(modal);
            modal.style.display = 'flex';
        });
    });

    modal.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            enableBodyScroll(modal);
            modal.style.display = 'none';
        }
    });
}