const api_url = 'https://edu.std-900.ist.mospolytech.ru';
const auth = '?api_key=12fb475f-4ad1-4629-8a9b-1dbfd9e253dd';
const order_path = '/exam-2024-1/api/orders';

export async function getOrders() {
    const request = api_url + order_path + auth;
    return await (await fetch(request, { method: 'GET' })).json();
}

export async function deleteOrder(id) {
    const request = api_url + order_path + '/' + id + auth;
    return await (await fetch(request, { method: 'DELETE' })).json();
}
