const api_url = 'https://edu.std-900.ist.mospolytech.ru';
const catalog_path = '/exam-2024-1/api/goods';
const auth = '?api_key=12fb475f-4ad1-4629-8a9b-1dbfd9e253dd';
const order_path = '/exam-2024-1/api/orders';

export async function getCart() {
    return await Promise.all(
        Object.keys(localStorage).map(async id => {
            const request = api_url + catalog_path + '/' + id + auth;
            return await (await fetch(request, { method: 'GET' })).json();
        })
    )
}

let total_price = 0;
let delivery_price;

export function totalPrice(removed = null) {
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

export function removeFromCart(item = null) {
    if (item) localStorage.removeItem(item.dataset.id);
    else localStorage.clear();
}

export async function postOrder(event) {
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

    if (date == valid.toISOString().split('T')[0] && time < valid.getHours()) throw new Error('time problem');
    if (date < valid.toISOString().split('T')[0]) throw new Error('date problem');

    if (form.get('subscribe')) form.set('subscribe', 1);
    else form.set('subscribe', 0);

    const data = Object.fromEntries(form.entries());
    data.good_ids = Object.keys(localStorage).map(Number);

    return await (await fetch(api_url + order_path + auth, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })).json();
}


