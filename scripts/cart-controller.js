import {
    deliveryPrice,
    fetchCatalog,
    makeOrder,
    removeFromCart,
    totalPrice,
} from "./model.js";

import {
    emptyCartBanner,
    cleanCatalog,
    displayCatalog,
    displayNotification,
    displayTotalPrice,
    setTimeDate,
    displayDeliveryPrice
} from "./view.js";

(async () => {
    const response = await fetchCatalog();

    displayCatalog(response).forEach(card => {
        card.querySelector('.js_delete_button').addEventListener('click', () => {
            displayTotalPrice(totalPrice(card));
            removeFromCart(card);
            cleanCatalog(card);
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