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

async function createMeta(orders) {
    await Promise.all(
        orders.map(async item => {
            if (!item.comment) item.comment = '';

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

            if (new Date(item.delivery_date).getDay() == 0 ||
                new Date(item.delivery_date).getDay() == 6) item.total_price += 500;
            else if (item.delivery_interval == '18:00-22:00') item.total_price += 400;
            else item.total_price += 200;

            delete item.student_id;
            delete item.subscribe;
            delete item.updated_at;
        })
    );
    return orders;
}
