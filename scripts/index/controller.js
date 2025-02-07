import {
    displayCatalog,
    displayNotification,
    cleanCatalog,
    displayPriceRange,
    displayCategories,
    cleanCategories,
    hideFiltered,
} from "./view.js";

import {
    addToCart,
    getCatalog,
    filter,
    findCategories,
    minMaxPrice,
    submitFilter
} from "./model.js";

async function updateCatalog() {
    const response = await getCatalog();

    displayCategories(findCategories(response));
    displayPriceRange(minMaxPrice(response));

    displayCatalog(response).forEach(card => {
        card.querySelector('.js_add_button').addEventListener('click', () => {
            try {
                addToCart(card);
                displayNotification('Товар успешно добавлен в корзину', 'alert-success');
            } catch (error) {
                displayNotification(error.message, 'alert-danger');
            }
        });
    });
}

document.querySelector('#download_button').addEventListener('click', async () => {
    await updateCatalog();
    hideFiltered(filter());
});

document.querySelector('#sort_form').addEventListener('change', async () => {
    cleanCategories();
    cleanCatalog();
    await updateCatalog();
    document.querySelector('#filter').reset();
    document.querySelector('#filter').dispatchEvent(new Event('submit'));
});

document.querySelector('#filter').addEventListener('submit', (event) => {
    submitFilter(event);
    hideFiltered(filter());
});

document.querySelector('#download_button').click();

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get('order')) {
        displayNotification('Заказ успешно оформлен', 'alert-success');
        const new_url = new URL(window.location);
        new_url.searchParams.delete('order');
        history.replaceState(null, "", new_url);
    }
}

/*(async () => {
    document.querySelector('#js_search').addEventListener('submit',
        function (event) { displayHide(search(event)) });
})();*/
