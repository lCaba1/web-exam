import {
    deliveryPrice,
    getCart,
    postOrder,
    removeFromCart,
    totalPrice,
} from "./model.js";

import {
    emptyCart,
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
            emptyCart();
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
    document.querySelector('#order_form').addEventListener('submit', async (event) => {
        try {
            const response = await postOrder(event);
            if (response.error) displayNotification(response.error, 'alert-danger');
            else {
                removeFromCart();
                window.location.href = './?order=1';
            }
        } catch (error) { displayNotification(error.message, 'alert-danger'); }
    });

    emptyCart();
    setTimeDate();

    displayTotalPrice(totalPrice());
})();