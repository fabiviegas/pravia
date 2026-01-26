// * DATA TABS V.4
// * Criado em 07/04/2025, Lyra Monteiro.
// * Features: Panes, Selectors, Pagination e Arrows.

const tabSelectors = document.querySelectorAll('.tab__selector');
const tabPanes = document.querySelectorAll('.tab__pane');
const tabArrowLeft = document.querySelector('.tab__arrow__left');
const tabArrowRight = document.querySelector('.tab__arrow__right');
const tabPagination = document.querySelector('.tab__pagination');

tabSelectors.forEach(button => {
    // * Pagination
    const paginationButton = document.createElement('button');
    paginationButton.classList.add('pagination__item');
    paginationButton.setAttribute('data-button-pane', button.getAttribute('data-button-pane'));
    tabPagination.appendChild(paginationButton);

    // * Click magic of the buttons
    button.addEventListener('click', () => {
        // * Buttons
        // ? 1. Remove .active from all buttons
        tabSelectors.forEach(btn => btn.classList.remove('is--active'));
        // ? 2. Add .active class to the button
        button.classList.add('is--active');

        // * Panes
        // ? Hide all panes
        tabPanes.forEach(pane => pane.classList.remove('show'));

        // * Show the right pane based on data-open attribute
        const targetPaneID = button.getAttribute('data-button-pane');
        const targetPane = document.querySelector(`[data-pane="${targetPaneID}"]`);
        if (targetPane) {
            targetPane.classList.add('show');
        }

        // * Pagination
        // ? Remove .is--active from all pagination buttons
        const paginationButtons = document.querySelectorAll('.pagination__item');
        paginationButtons.forEach(paginationButton => paginationButton.classList.remove('is--active'));
        // ? Add .is--active class to the pagination button
        const targetPaginationButton = document.querySelector(`.pagination__item[data-button-pane="${targetPaneID}"]`);
        if (targetPaginationButton) {
            targetPaginationButton.classList.add('is--active');
        }
    });
});

// * -------------
// * Pagination
const paginationButtons = document.querySelectorAll('.pagination__item');

// Initial first pagination button as active
paginationButtons[0].classList.add('is--active');

// * Click magic of the pagination buttons
paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // ? 1. Remove .active from all buttons
        paginationButtons.forEach(btn => btn.classList.remove('is--active'));

        // ? Add .is--active to the button
        button.classList.add('is--active');

        // ? Add .is--active to the corresponding tab selector
        const targetButtonID = button.getAttribute('data-button-pane');
        const targetButton = document.querySelector(`.tab__selector[data-button-pane="${targetButtonID}"]`);
        if (targetButton) {
            // ? Remove
            tabSelectors.forEach(btn => btn.classList.remove('is--active'));
            // ? Add
            targetButton.classList.add('is--active');
            // ? Slide into view
            targetButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }

        // * Show the right pane based on data-open attribute
        // ? Hide all panes
        tabPanes.forEach(pane => pane.classList.remove('show'));
        // ? Show the chosen one
        const targetPaneID = button.getAttribute('data-button-pane');
        const targetPane = document.querySelector(`[data-pane="${targetPaneID}"]`);
        if (targetPane) {
            targetPane.classList.add('show');
        }
    });
});

// * -------------
// * Arrows
tabArrowLeft.addEventListener('click', () => {
    let activeButton = document.querySelector('.tab__selector.is--active');
    let prevButton = activeButton.previousElementSibling;

    if (prevButton) {
        prevButton.click();
        tabArrowLeft.classList.remove('disabled');
        tabArrowRight.classList.remove('disabled');
    } else {
        tabArrowLeft.classList.add('disabled');
    }
});

tabArrowRight.addEventListener('click', () => {
    let activeButton = document.querySelector('.tab__selector.is--active');
    let nextButton = activeButton.nextElementSibling;

    if (nextButton) {
        nextButton.click();
        tabArrowRight.classList.remove('disabled');
        tabArrowLeft.classList.remove('disabled');
    } else {
        tabArrowRight.classList.add('disabled');
    }
});
