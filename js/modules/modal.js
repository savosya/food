/*jshint esversion: 6 */

function hideModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }    
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector),
          modalOpenButton = document.querySelectorAll(triggerSelector);

    window.addEventListener('keydown', (event) => {

        if (event.target && event.code === 'Escape') {
            hideModal(modalSelector);
        }

    });

    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target == modal || target.getAttribute('data-close') == '') {
            hideModal(modalSelector);
        }
    });

    modalOpenButton.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal(modalSelector, modalTimerId);
        });
    });

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1) {
        showModal(modalSelector, modalTimerId);
        }
    });
}

export default modal;

export {hideModal};
export {showModal};