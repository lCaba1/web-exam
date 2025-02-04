import {
    deliveryPrice,
    getCart,
    makeOrder,
    removeFromCart,
    totalPrice,
} from "./model.js";

import {
    emptyCartBanner,
    displayNotification,
    displayTotalPrice,
    setTimeDate,
    displayDeliveryPrice,
    displayCart,
    cleanCart
} from "./view.js";

(async () => {
    displayCart(await getCart());

    Array.from(document.querySelector('#cart').children).forEach(card => {
        card.querySelector('.js_delete_button').addEventListener('click', () => {
            displayTotalPrice(totalPrice(card));
            removeFromCart(card);
            cleanCart(card);
            displayNotification('Товар успешно удален из корзины', 'alert-success');
            emptyCartBanner();
        });
    });

    document.querySelector('#date').addEventListener('change', () => {
        displayDeliveryPrice(deliveryPrice());
        displayTotalPrice(totalPrice());
    });
    document.querySelector('#time').addEventListener('change', () => {
        displayDeliveryPrice(deliveryPrice());
        displayTotalPrice(totalPrice());
    });
    document.querySelector('#order_form').addEventListener('submit', (event) => {
        try { if (makeOrder(event)) displayNotification('ok', 'alert-success'); }
        catch (error) { displayNotification(error.message, 'alert-danger'); }
    });

    emptyCartBanner();
    setTimeDate();

    displayTotalPrice(totalPrice());
})();