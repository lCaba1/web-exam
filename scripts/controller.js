import { fetchCatalog } from "./api.js";
import { displayCatalog, cleanCatalog, displayCategories } from "./view.js";
import { getCatalog, getCategories, min_price, setCatalog, sortCatalog } from "./model.js";

function callback() {
    observer.disconnect();
    displayCatalog(getCatalog());
    observer.observe(document.getElementById('catalog'), { childList: true });
}

const observer = new MutationObserver(callback);

function clearnsort(type) {
    sortCatalog[type]();
    cleanCatalog();
}

(async () => {
    setCatalog(await fetchCatalog());

    displayCategories(getCategories());

    callback();

    //console.log(min_price().actual_price);
    //console.log(getCatalog());

    document.querySelector('button.js_rating_descending').addEventListener('click', () => clearnsort('ratingDescending'));
    document.querySelector('button.js_rating_ascending').addEventListener('click', () => clearnsort('ratingAscending'));
    document.querySelector('button.js_price_descending').addEventListener('click', () => clearnsort('priceDescending'));
    document.querySelector('button.js_price_ascending').addEventListener('click', () => clearnsort('priceAscending'));
})();



