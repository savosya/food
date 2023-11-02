/*jshint esversion: 6 */

function calc(genderSelector, ratioSelector, activeClass) {
    
    const result = document.querySelector('.calculating__result');

    let weight, height, age, res, sex, ratio;

    
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        sex = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function getInitLocal(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.classList.remove(activeClass);
            if (el.getAttribute('sex') === localStorage.getItem('sex')) {
                el.classList.add(activeClass);
            }
            if (el.getAttribute('ratio') === localStorage.getItem('ratio')) {
                el.classList.add(activeClass);
            }
        });
        
    }
    getInitLocal(genderSelector, activeClass);
    getInitLocal(ratioSelector, activeClass);



    function calc() {
        if (!weight || !height || !age || !sex || !ratio) {
            result.innerHTML = `
                <span>_____</span> ккал
            `;  
        } else {
            if (sex == 'male') {
                res = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
            } else {
                res = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
            }
    
            result.innerHTML = `
                <span>${parseInt(res)}</span> ккал
            `;          
        }      
    }

    function getStaticData(selector, activeClass) {

        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {

                
                if (element.parentElement.id == 'gender') {
                    sex = e.target.getAttribute('sex');
                    localStorage.setItem('sex', sex);  

                } else {
                    ratio = +e.target.getAttribute('ratio');
                    localStorage.setItem('ratio', ratio);
                }
                calc();
    
                elements.forEach((el) => {
                    el.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
            });        
        });
        
    }
    getStaticData('#gender div', 'calculating__choose-item_active');
    getStaticData('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function getDynamicData(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/i)) {
                input.style.border = 'solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case('height'): {
                    height = +input.value;
                    break;
                }
                case('weight'): {
                    weight = +input.value;
                    break;
                }
                case('age'): {
                    age = +input.value;
                    break;
                }
            }
            calc();
        });
        
    }
    getDynamicData('#height');
    getDynamicData('#weight');
    getDynamicData('#age');


}

export default calc;