const api_url = 'https://edu.std-900.ist.mospolytech.ru';
const catalog_path = '/exam-2024-1/api/goods';
const auth = '?api_key=12fb475f-4ad1-4629-8a9b-1dbfd9e253dd';
const page_param = '&page=';
const per_page_param = '&per_page=';
const sort_order_param = '&sort_order=';
const order_path = '/exam-2024-1/api/orders';

let current_page;

export async function fetchCatalog() {
    const target = document.querySelector('#catalog') ?? document.querySelector('#cart');
    let request;

    if (target.id == 'catalog') {
        if (!document.querySelector('#catalog').children.length) current_page = 1;

        request = api_url + catalog_path + auth;
        request += page_param + current_page;
        request += sort_order_param + document.querySelector('#sort_select').value;;

        if (current_page == 1) {
            current_categories.clear();
            min = 1000000;
            max = 0;
        }
        current_page++;

        return await (await fetch(request, { method: 'GET' })).json();
    }

    if (target.id == 'cart') {
        const response = await Promise.all(
            Object.keys(localStorage).map(async id => {
                request = api_url + catalog_path + '/' + id + auth;
                return await (await fetch(request, { method: 'GET' })).json();
            })
        )

        return response;
    }
}

export function addToCart(item) {
    if (localStorage.getItem(item.dataset.id)) return false;

    localStorage.setItem(item.dataset.id, item.querySelector('.js_name').textContent);
    return true;
}

export function removeFromCart(item) {
    localStorage.removeItem(item.dataset.id);
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

    return [min, max];
}

let formState = {
    'types': [],
    'min': '',
    'max': '',
    'discount': null
};

export function submitFilter(event) {
    event.preventDefault();

    formState.types = new FormData(document.querySelector('#filter')).getAll('category');
    formState.min = document.querySelector('#min_price').value;
    formState.max = document.querySelector('#max_price').value;
    formState.discount = new FormData(document.querySelector('#filter')).get('discount');
}

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

let total_price = 0;
let delivery_price;

export function totalPrice(removed) {
    if (removed) total_price -= Number(removed.querySelector('.js_discount_price').textContent);
    else if (total_price == 0)
        document.querySelectorAll('.js_discount_price').forEach(price => total_price += Number(price.textContent));

    if (total_price) return total_price + delivery_price;
    else return total_price;
}

export function deliveryPrice() {
    const day_number = new Date(document.querySelector('#date').value).getDay();
    const hours_range = document.querySelector('#time').value;

    if (day_number == 6 || day_number == 0) delivery_price = 500;
    else if (hours_range == '18:00-22:00') delivery_price = 400;
    else delivery_price = 200;

    return delivery_price;
}

export function makeOrder(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    const date = form.get('delivery_date');
    form.set('delivery_date', new Date(date).toLocaleDateString('ru-RU'));

    const time = parseInt(document.querySelector('#time').value.split(':')[0], 10);

    let valid = new Date();
    if (valid.getHours() >= 22) {
        valid.setDate(valid.getDate() + 1);
        valid.setHours(8);
    } else if (valid.getHours() >= 18) valid.setHours(18);
    else if (valid.getHours() >= 14) valid.setHours(14);
    else if (valid.getHours() >= 12) valid.setHours(12);
    else valid.setHours(8);

    //console.log(date, valid.toISOString().split('T')[0], time, valid.getHours());

    if (date == valid.toISOString().split('T')[0] && time < valid.getHours()) throw new Error('time problem');
    if (date < valid.toISOString().split('T')[0]) throw new Error('date problem');

    //console.log(Object.fromEntries(form.entries()));

    return true;

    /*fetch(api_url + order_path + auth, {
        method: "POST",
        body: form
    })*/
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
