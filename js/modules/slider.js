/*jshint esversion: 6 */

function slider({wrapper, field, slide, prevArrow, nextArrow, currentCounter, totalCounter, container}) {
    const slideWraper = document.querySelector(wrapper),
          slideField = document.querySelector(field),
          slides = document.querySelectorAll(slide),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          width = window.getComputedStyle(slideWraper).width;

    let offset = 0,
        slideIndex = 1;

                            /// Slider navigation

    const slider = document.querySelector(container),
          slideNavigator = document.createElement('div');       

    slideNavigator.classList.add('carousel-indicators');

    slider.append(slideNavigator);

    for (let i = 1; i <= slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('to-slide', i); 
        if (i == 1) {
            dot.style.opacity = 1;
        }
        slideNavigator.append(dot);

    }

    const dots = document.querySelectorAll('.dot');

    function setOpacity(slideIndex) {
        dots.forEach((dot) => {
            dot.style.opacity = 0.5;
        });
        dots.forEach((dot) => {
            if (slideIndex == dot.getAttribute('to-slide')) {
                dot.style.opacity = 1;
            }
        });
    }

    slideField.style.width = (100 * slides.length) + '%';

    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    slideWraper.style.overflow = 'hidden';

    function onlyDigits(item) {
        return parseInt(item.replace(/\D/g, ''));
    }

    function checkCurrent(slideIndex) {
        if ( slideIndex< 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    next.addEventListener('click', () => {
        if (offset == onlyDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += onlyDigits(width);
        }
       
        slideField.style.transform = `translateX(${-offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setOpacity(slideIndex);

        checkCurrent(slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = onlyDigits(width) * (slides.length - 1);
        } else {
            offset -= onlyDigits(width);
        }

        slideField.style.transform = `translateX(${-offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        setOpacity(slideIndex);

        checkCurrent(slideIndex);
    });

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {

            offset = onlyDigits(width) * (dot.getAttribute('to-slide') - 1);

            slideField.style.transform = `translateX(${-offset}px)`;

            slideIndex = dot.getAttribute('to-slide');
            setOpacity(slideIndex);
            checkCurrent(slideIndex);
        });
    });
}

export default slider;