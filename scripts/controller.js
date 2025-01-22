import { fetchCatalog } from "./api.js";

import {
    displayCatalog, displayCategories, displayPriceRange,
    displayReplace, displayHide
} from "./view.js";

import {
    setCatalog, getCatalog, getCategories,
    max_price, min_price,
    filter, search, sort
} from "./model.js";

(async () => {
    setCatalog(await fetchCatalog());

    displayCategories(getCategories());
    displayPriceRange(min_price(), max_price())
    displayCatalog(getCatalog());

    document.querySelector('#js_filter').addEventListener('submit',
        function (event) { displayHide(filter(event)) });
    document.querySelector('#js_search').addEventListener('submit',
        function (event) { displayHide(search(event)) });
    document.querySelector('#js_sort').addEventListener('change', () =>
        displayReplace(sort[document.querySelector('select.js_sort_select').value]()));
})();


// отображать вид сортировки в placeholder выпадающего списка
// сделать кнопку reset для фильтров
