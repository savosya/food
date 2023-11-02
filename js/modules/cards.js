/*jshint esversion: 6 */
/*jshint esversion: 8 */

import {getResource} from '../services/services.js';

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...difClasses) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.difClasses = difClasses;
            
        }
    render() {
        const element = document.createElement('div');

        if (this.difClasses.length == 0) {
            this.difClasses = 'menu__item';
            element.classList.add(this.difClasses);
        }        
        else {
            this.difClasses.forEach((difClass) => {
                element.classList.add(difClass);
            });
        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> USD/день</div>
            </div> 
        `;

        this.parent.append(element);          
    }      
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;