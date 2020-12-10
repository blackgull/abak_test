'use strict';

window.addEventListener('load', function () {

    const products = API.products;

    renderProductList(products);

    const popUpBackground = document.createElement('div');
    popUpBackground.className = "pop-up-background";

    /**
     * обработчик событий click
     */
    document.addEventListener('click', (event) => {
        switch (event.target.name) {
            case 'orderBtn':
                renderPopUpOrder(event.target);
                break;
            case 'cartBtn':
                renderPopUpCart(event.target);
                break;
            default:
                break;
        }
    });

    /**
     * функция renderProductList() рендерит список продуктов
     * @param products
     */
    function renderProductList(products) {

        let template = '';

        products.map(product => {
            template += `<div class="product" id="${product.id}">
                            <div class="product__img-box">
                                <img src="${product.img}" alt="${product.title}">
                            </div>
                            <div class="product__info">
                                <p class="product__title">${product.title}</p>
                                <p class="product__price">${getDischarges(product.price)} руб.</p>
                            </div>
                            <div class="product__button">
                                <button class="button__order" type="button" name="orderBtn" value="${product.id}">Заказать</button>
                                <button class="button__cart" type="button" name="cartBtn" value="${product.id}">В корзину</button>
                            </div>
                        </div>`
        });

        document.querySelector('.product-listing-wrapper').innerHTML = template;

    }

    /**
     * функция renderPopUpOrder() рендерит попап окно заказа
     * @param item
     */
    function renderPopUpOrder(item) {

        const newArr = products.filter(p => p.id === parseInt(item.value));

        newArr.map(product => {
            popUpBackground.innerHTML = `<div class="order-product">
                                            <span class="pop-up-close">&#10006;</span>
                                            <p class="order-product__title">${product.title}</p>
                                            <div class="order-product__box">
                                                <div class="order-product__right">
                                                    <div class="order-product__img-box">
                                                        <img src="${product.img}" alt="${product.title}">
                                                    </div>
                                                    <p class="order-product__price">${getDischarges(product.price)} руб.</p>
                                                </div>
                                                <div class="order-product__left">
                                                    <label for="comment">Комментарий к заказу:</label>
                                                    <textarea name="" id="comment"></textarea>
                                                </div>
                                            </div>
                                            <div class="order-product__phone">
                                                <label for="phone">Ваш телефон *:</label>
                                                <input type="text" id="phone">
                                            </div>
                                            <button class="order-product__button button__order" type="button" name="">Отправить</button>
                                        </div>`;
        });

        document.querySelector('.product-listing-wrapper').append(popUpBackground);
        removePopUp();

    }

    /**
     * функция renderPopUpCart() рендерит попап окно корзины
     * @param item
     */
    function renderPopUpCart(item) {

        const newArr = products.filter(p => p.id === parseInt(item.value));

        newArr.map(product => {
            popUpBackground.innerHTML = `<div class="cart-product">
                                            <span class="pop-up-close">&#10006;</span>
                                            <p class="cart-product__label">Вы добавили в корзину:</p>
                                            <div class="cart-product__box">
                                                <div class="cart-product__img-box">
                                                    <img src="${product.img}" alt="${product.title}">
                                                </div>
                                                <div class="cart-product__info">
                                                    <span class="cart-product__remove">&#10006;</span>
                                                    <p class="cart-product__title">${product.title}</p>
                                                    <p class="cart-product__price">${getDischarges(product.price)} руб.</p>
                                                </div>
                                            </div>
                                            <button class="cart-product__button button__order" type="button" name="">Перейти в корзину</button>
                                        </div>`;
        });

        document.querySelector('.product-listing-wrapper').append(popUpBackground);
        removePopUp();

    }

    /**
     * функция removePopUp() удаляет модальное всплывающее окно
     */
    function removePopUp() {
        const popUpClose = document.querySelector('.pop-up-close');
        if (popUpClose) {
            popUpClose.addEventListener('click', () => {
                document.querySelector('.pop-up-background').remove();
            });
        }
    }

    /**
     * функция getDischarges() возвращает форматированную по разрядам стоимость
     * @param number
     */
    function getDischarges(number) {
        return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }

});