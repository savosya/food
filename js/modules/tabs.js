/*jshint esversion: 6 */

function tabs(contentTab, tabItem, activeClass) {
    const tabContent = document.querySelectorAll(contentTab),
          tabs = document.querySelectorAll(tabItem);

    function hideTabContent() {
        tabContent.forEach((content) => {
            content.classList.add('hide');
            content.classList.remove('show');
            content.classList.add('fade');
        });
    }

    function showTabContent(i = 0) {
        hideTabContent();
        tabContent[i].classList.add('show');
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('fade');
    }

    showTabContent();


    function activeTab(i) {
        tabs.forEach((tab) => {
            tab.classList.remove(activeClass);          
        });
        tabs[i].classList.add(activeClass);
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', (event) => {
            const target = event.target;

            for (let i = 0; i < tabs.length; i ++) {
                if (target && target === tabs[i]) {
                    activeTab(i);
                    showTabContent(i);
                }
            }   
        });
    });
}

export default tabs;