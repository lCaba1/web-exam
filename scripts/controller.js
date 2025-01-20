import { fetchCatalog } from "./api.js";
import { display } from "./display.js";
import { getCatalog, setCatalog, sortCatalog } from "./model.js";

function callback() {
    observer.disconnect();
    display(getCatalog());
    observer.observe(document.getElementById('catalog'), { childList: true });
}

const observer = new MutationObserver(callback);

(async () => {
    setCatalog(await fetchCatalog());

    document.getElementById('catalog').addEventListener('DOMContentLoaded', callback());

    document.querySelector('button.js_rating_descending').addEventListener('click', sortCatalog.ratingDescending);
    document.querySelector('button.js_rating_ascending').addEventListener('click', sortCatalog.ratingAscending);
    document.querySelector('button.js_price_descending').addEventListener('click', sortCatalog.priceDescending);
    document.querySelector('button.js_price_ascending').addEventListener('click', sortCatalog.priceAscending);
})();



