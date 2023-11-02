/*jshint esversion: 6 */
/*jshint esversion: 8 */

import {postData} from '../services/services.js';

import {hideModal, showModal} from './modal';

function forms(modalTimerId) {
    const forms = document.querySelectorAll('form');
          
    const message = {
        loading: './icons/spinner.svg',
        success: 'Ваши данные успешно отправлены!',
        failure: 'Произошла ошибка.'
    };

    forms.forEach(form => {
        bindingPostData(form);
    });

    function bindingPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const spinner = document.createElement('img');
            spinner.classList.add('status');
            spinner.setAttribute('src', message.loading);
            form.appendChild(spinner);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data); 
                spinner.remove();
                showThanksModal(message.success); 
            })
            .catch(() => {
                spinner.remove();
                showThanksModal(message.failure);
            })
            .finally(() => form.reset());
        });
    }

    function showThanksModal(message) {
        const prevDialogModal = document.querySelector('.modal__dialog');
        prevDialogModal.classList.add('hide');                
        showModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <form action="#">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </form>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevDialogModal.classList.remove('hide'); 
            hideModal('.modal');
        }, 2000);         
    }
}

export default forms;