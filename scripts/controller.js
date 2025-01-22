import { fetchCatalog } from "./api.js";

import {
    displayCatalog, displayCategories, displayPriceRange,
    displayReplace, displayHide
} from "./view.js";

import {
    setCatalogCatigories, getCatalog, getCategories, max_price, min_price,
    ratingAscending, ratingDescending, priceAscending, priceDescending, filter
} from "./model.js";

(async () => {
    setCatalogCatigories(await fetchCatalog());

    displayCategories(getCategories());
    displayPriceRange(min_price(), max_price())
    displayCatalog(getCatalog());

    document.querySelector('button.js_rating_descending').addEventListener('click',
        () => displayReplace(ratingDescending()));
    document.querySelector('button.js_rating_ascending').addEventListener('click',
        () => displayReplace(ratingAscending()));
    document.querySelector('button.js_price_descending').addEventListener('click',
        () => displayReplace(priceDescending()));
    document.querySelector('button.js_price_ascending').addEventListener('click',
        () => displayReplace(priceAscending()));

    document.querySelector('#js_filter').addEventListener('submit',
        function (event) { displayHide(filter(event)) });
})();


// отображать вид сортировки в placeholder выпадающего списка
// сделать кнопку reset для фильтров
