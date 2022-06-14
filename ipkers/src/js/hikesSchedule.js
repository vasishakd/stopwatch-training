const infoButtons = Array.from(document.querySelectorAll('.js--month-info-button'));

infoButtons.forEach(button => {
    button.addEventListener('click', (evt) => {
        evt.currentTarget.classList.toggle('active');
    });
});

const activityButtons = Array.from(document.querySelectorAll('.js--activity-type-button'));
const activityCalendars = Array.from(document.querySelectorAll('.js--activity-calendar'));
const showMonthsButton = document.querySelector('.js--show-months-button');

const onActivityTypeSelect = (evt, activityButtonIndex) => {
    activityButtons.forEach(button => button.classList.remove('active'));
    evt.target.classList.add('active');

    activityCalendars.forEach(button => button.classList.remove('active'));
    activityCalendars[activityButtonIndex].classList.add('active');

    if (window.innerWidth <= 601) {
        showMonthsButton.classList.remove('hidden');

        activityCalendars.forEach(calendar => {
                calendar.classList.remove('show-full');
        });
    }
}

activityButtons.forEach((button, index) => {
    button.addEventListener('click', (evt) => onActivityTypeSelect(evt, index));
});

showMonthsButton?.addEventListener('click', () => {
    activityCalendars.forEach(calendar => {
        if (calendar.classList.contains('active')) {
            calendar.classList.add('show-full');
        }
    });
    showMonthsButton.classList.add('hidden');
})