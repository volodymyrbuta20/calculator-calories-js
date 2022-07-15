document.addEventListener ("DOMContentLoaded", function () {

    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
    age, weight, height,
    ratio = 1.375;

    function calcKkal () {
        if (!sex || !age || !weight || !height || !ratio) {
            result.textContent = "0.0";
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((655.1 + (9.56 * weight) + (1.85 * height) - (4.68 * age)) * ratio);
        } else {
            result.textContent = Math.round((66.5 + (13.75 * weight) + (5 * height) - (6.77 * age)) * ratio);
        } //by Harris-Benedict formula
    }

    calcKkal();

    function getStaticInfo (parent, activeClass) {
        const elements = document.querySelectorAll(`${parent} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }

                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcKkal();
            });
        });
    }

    getStaticInfo('#gender', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInfo (selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcKkal();
        });

    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');

});