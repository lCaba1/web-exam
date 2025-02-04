const api_url = 'https://edu.std-900.ist.mospolytech.ru';
const catalog_path = '/exam-2024-1/api/goods';
const auth = '?api_key=12fb475f-4ad1-4629-8a9b-1dbfd9e253dd';
const page_param = '&page=';
const per_page_param = '&per_page=';
const sort_order_param = '&sort_order=';

let current_page;

export async function getCatalog() {
    if (!document.querySelector('#catalog').children.length) current_page = 1;

    let request = api_url + catalog_path + auth
        + page_param + current_page
        + sort_order_param + document.querySelector('#sort_select').value;;

    if (current_page == 1) {
        current_categories.clear();
        min = 1000000;
        max = 0;
    }
    current_page++;

    return await (await fetch(request, { method: 'GET' })).json();
}

export function addToCart(item) {
    if (localStorage.getItem(item.dataset.id)) throw new Error('Товар уже был добавлен в корзину');
    localStorage.setItem(item.dataset.id, item.querySelector('.js_name').textContent);
}

const current_categories = new Set();

export function findCategories(response) {
    const new_categories = new Set();

    response.goods.forEach(item => {
        if (current_categories.size != current_categories.add(item.main_category).size)
            new_categories.add(item.main_category);
    });

    return [...new_categories].sort();
}

let min;
let max;

export function minMaxPrice(response) {
    response.goods.forEach(item => {
        const price = item.discount_price ?? item.actual_price;
        if (price < min) min = price;
        if (price > max) max = price;
    });

    return { 'min': min, 'max': max };
}

let formState = {
    'types': [],
    'min': '',
    'max': '',
    'discount': null
};

export function filter() {
    const filtered = [];

    Array.from(document.querySelector('#catalog').children).forEach(item => {
        if (!formState.types.includes(item.dataset.main_category) && formState.types.length != 0 ||
            formState.max && Number(item.querySelector('.js_discount_price').textContent) > Number(formState.max) ||
            formState.min && Number(item.querySelector('.js_discount_price').textContent) < Number(formState.min) ||
            !item.querySelector('.js_actual_price').textContent && formState.discount == 'on'
        ) {
            filtered.push(item);
        }
    });

    return filtered;
}

export function submitFilter(event) {
    event.preventDefault();

    formState.types = new FormData(document.querySelector('#filter')).getAll('category');
    formState.min = document.querySelector('#min_price').value;
    formState.max = document.querySelector('#max_price').value;
    formState.discount = new FormData(document.querySelector('#filter')).get('discount');
}

/*export function search(event) {
    event.preventDefault();
    const substr = document.querySelector('#js_search_input').value.toLowerCase();
    const filtered = [];

    Array.from(document.querySelector('#catalog').children).forEach(item => {
        if (!item.querySelector('.js_name').textContent.toLowerCase().includes(substr)) {
            filtered.push(item);
        }
    });

    return filtered;
}*/
