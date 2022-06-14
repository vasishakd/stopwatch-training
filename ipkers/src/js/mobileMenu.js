const burgerButton = document.querySelector('.js--burger-button');
const mobileMenu = document.querySelector('.js--mobile-menu');

burgerButton.addEventListener('click', (evt) => {
    evt.currentTarget.classList.toggle('active');
    mobileMenu.classList.toggle('active');
})