let catalog;
let categories = new Set();



export function setCatalog(data) {
    catalog = data;
    setCategories();
}

function setCategories() {
    catalog.forEach(item => {
        categories.add(item.main_category);
        //categories.add(item.sub_category);
    });
    categories = [...categories].sort();
}



export function getCatalog() {
    return catalog;
}

export function getCategories() {
    return categories;
}



export function min_price() {
    const min_item = [...catalog].reduce((min, current) =>
        (current.discount_price ?? current.actual_price) < (min.discount_price ?? min.actual_price) ?
            current : min
    );
    return min_item.discount_price ?? min_item.actual_price;
}

export function max_price() {
    const max_item = [...catalog].reduce((max, current) =>
        (current.discount_price ?? current.actual_price) > (max.discount_price ?? max.actual_price) ?
            current : max
    );
    return max_item.discount_price ?? max_item.actual_price;
}



export function filter(event) {
    event.preventDefault();

    const types = new FormData(document.querySelector('#js_filter')).getAll('category');
    const min = document.querySelector('input.js_min').value;
    const max = document.querySelector('input.js_max').value;
    const discount = new FormData(document.querySelector('#js_filter')).get('discount');

    const filtered = [];

    Array.from(document.querySelector('#catalog').children).forEach(item => {
        if (!types.includes(item.dataset.main_category) && types.length != 0 ||
            max && Number(item.querySelector('span.js_discount_price').textContent) > Number(max) ||
            min && Number(item.querySelector('span.js_discount_price').textContent) < Number(min) ||
            !item.querySelector('s.js_actual_price').textContent && discount == 'on'
        ) {
            filtered.push(item);
        }
    });

    return filtered;
}



export function search(event) {
    event.preventDefault();
    const substr = document.querySelector('input.js_search_input').value.toLowerCase();
    const filtered = [];

    Array.from(document.querySelector('#catalog').children).forEach(item => {
        if (!item.querySelector('h6.js_name').textContent.toLowerCase().includes(substr)) {
            filtered.push(item);
        }
    });

    return filtered;
}



export const sort = {
    ratingDescending,
    ratingAscending,
    priceDescending,
    priceAscending
}

function ratingDescending() {
    return Array.from(document.querySelector('#catalog').children).sort((l, r) =>
        r.querySelector('span.js_rating').textContent - l.querySelector('span.js_rating').textContent);
}

function ratingAscending() {
    return Array.from(document.querySelector('#catalog').children).sort((l, r) =>
        l.querySelector('span.js_rating').textContent - r.querySelector('span.js_rating').textContent);
}

function priceDescending() {
    return Array.from(document.querySelector('#catalog').children).sort((l, r) =>
        r.querySelector('span.js_discount_price').textContent - l.querySelector('span.js_discount_price').textContent);
}

function priceAscending() {
    return Array.from(document.querySelector('#catalog').children).sort((l, r) =>
        l.querySelector('span.js_discount_price').textContent - r.querySelector('span.js_discount_price').textContent);
}
