export function fillTable(data) {
    const table = document.querySelector('#table');

    data.forEach(item => {
        const row = document.querySelector('#order_template').content.cloneNode(true);

        console.log(item);

        row.querySelector('.js_number').textContent = table.children.length + 1;
        row.querySelector('.js_create').textContent = item.created_at;
        row.querySelector('.js_sostav').textContent = item.goods_ids;
        row.querySelector('.js_price').textContent = '???';
        row.querySelector('.js_delivery').textContent = item.delivery_date + '\n' + item.delivery_interval;
        row.querySelector('.js_edit');

        table.appendChild(row);
    });
}