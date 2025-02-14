const api_url = 'https://edu.std-900.ist.mospolytech.ru';
const auth = '?api_key=12fb475f-4ad1-4629-8a9b-1dbfd9e253dd';
const order_path = '/exam-2024-1/api/orders';
const goods_path = '/exam-2024-1/api/goods/';

export async function getOrders() {
    const request = api_url + order_path + auth;
    return await createMeta(await (await fetch(request, { method: 'GET' })).json());
}

export async function deleteOrder(id) {
    const request = api_url + order_path + '/' + id + auth;
    await fetch(request, { method: 'DELETE' });
}

export async function createMeta(orders) {
    await Promise.all(
        orders.map(async item => {
            if (!item.comment || item.comment == 'null') item.comment = '';

            let to_format = new Date(item.created_at);
            const day = String(to_format.getDate()).padStart(2, '0');
            const month = String(to_format.getMonth() + 1).padStart(2, '0');
            const year = to_format.getFullYear();
            const hour = String(to_format.getHours()).padStart(2, '0');
            const minute = String(to_format.getMinutes()).padStart(2, '0');
            to_format = `${day}.${month}.${year} ${hour}:${minute}`;
            item.created_at = to_format;

            let goods_data = await Promise.all(
                item.good_ids.map(async id => {
                    const request = api_url + goods_path + id + auth;
                    return await (await fetch(request, { method: 'GET' })).json();
                })
            );
            delete item.good_ids;

            item.good_names = '';
            item.total_price = 0;
            goods_data.forEach((data, i) => {
                if (i) item.good_names += '; ';
                item.good_names += data.name;
                item.total_price += data.discount_price ?? data.actual_price;
            });

            item.delivery_price = 0;
            if (new Date(item.delivery_date).getDay() == 0 ||
                new Date(item.delivery_date).getDay() == 6) item.delivery_price += 500;
            else if (item.delivery_interval == '18:00-22:00') item.delivery_price += 400;
            else item.delivery_price += 200;
            item.total_price += item.delivery_price;

            delete item.student_id;
            delete item.subscribe;
            delete item.updated_at;
        })
    );
    return orders;
}

export async function putOrder(event, id) {
    event.preventDefault();

    const form = new FormData(event.target);

    const date = form.get('delivery_date');
    form.set('delivery_date', new Date(date).toLocaleDateString('ru-RU'));

    const time = parseInt(document.querySelector('#edit_delivery_interval').value.split(':')[0], 10);

    let valid = new Date();
    if (valid.getHours() >= 22) {
        valid.setDate(valid.getDate() + 1);
        valid.setHours(8);
    } else if (valid.getHours() >= 18) valid.setHours(18);
    else if (valid.getHours() >= 14) valid.setHours(14);
    else if (valid.getHours() >= 12) valid.setHours(12);
    else valid.setHours(8);

    if (date == valid.toISOString().split('T')[0] && time < valid.getHours()) throw new Error('Выберите корректное время!');
    if (date < valid.toISOString().split('T')[0]) throw new Error('Выберите корректную дату!');

    if (!form.get('comment')) form.set('comment', null);

    return await (await fetch(api_url + order_path + '/' + id + auth, {
        method: "PUT",
        body: form
    })).json();
}

export function modalPriceUpdate() {
    const last_delivery_day = new Date(document.querySelector('#modal_edit').dataset.delivery_date);
    const last_delivery_time = document.querySelector('#modal_edit').dataset.delivery_interval;
    const new_delivery_day = new Date(document.querySelector('#edit_delivery_date').value);
    const new_delivery_time = document.querySelector('#edit_delivery_interval').value;
    let total_price = document.querySelector('#edit_total_price');

    if (last_delivery_day.getDay() == 0 || last_delivery_day.getDay() == 6)
        total_price.textContent = Number(total_price.textContent) - 500;
    else if (last_delivery_time == '18:00-22:00')
        total_price.textContent = Number(total_price.textContent) - 400;
    else
        total_price.textContent = Number(total_price.textContent) - 200;

    if (new_delivery_day.getDay() == 0 || new_delivery_day.getDay() == 6)
        total_price.textContent = Number(total_price.textContent) + 500;
    else if (new_delivery_time == '18:00-22:00')
        total_price.textContent = Number(total_price.textContent) + 400;
    else
        total_price.textContent = Number(total_price.textContent) + 200;

    document.querySelector('#modal_edit').dataset.delivery_date = new_delivery_day;
    document.querySelector('#modal_edit').dataset.delivery_interval = new_delivery_time;
}
