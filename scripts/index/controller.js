import {
    displayCatalog,
    displayNotification,
    cleanCatalog,
    displayPriceRange,
    displayCategories,
    cleanCategories,
    hideFiltered,
    fillDropdown,
    fillSearch,
    emptyCatalog
} from "./view.js";

import {
    addToCart,
    getCatalog,
    filter,
    findCategories,
    minMaxPrice,
    submitFilter,
    getSearch,
    search,
    submitSearch
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
    hideFiltered(filter().concat(search()));

    emptyCatalog();
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
    hideFiltered(filter().concat(search()));

    emptyCatalog();
});

document.querySelector('#search_input').addEventListener('input', async function (event) {
    fillDropdown(await getSearch(event));
    Array.from(document.querySelector('#suggestions').children).forEach(item => {
        item.addEventListener('click', (event) => {
            fillSearch(event);
            document.querySelector('#search_input').focus();
        });
    });
    new bootstrap.Dropdown(event.target).show();
});

document.querySelector('#search_input').addEventListener('click', (event) => {
    new bootstrap.Dropdown(event.target).show();
});

document.querySelector('#search_form').addEventListener('submit', (event) => {
    submitSearch(event);
    hideFiltered(search().concat(filter()));

    emptyCatalog();
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