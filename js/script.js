/*jshint esversion: 6 */

import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {

    const modalTimerId = setTimeout(() => {
        showModal('.modal', modalTimerId);
    }, 500000);

    calc('#gender div', '.calculating__choose_big div', 'calculating__choose-item_active');
    cards();
    forms(modalTimerId);
    modal('[open-modal]', '.modal', modalTimerId);
    slider({
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-field',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        currentCounter: '#current',
        totalCounter: '#total',
        container: '.offer__slider'
    });
    tabs('.tabcontent', '.tabheader__item', 'tabheader__item_active');
    timer();
        
});