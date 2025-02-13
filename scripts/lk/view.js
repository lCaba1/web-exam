export function fillTable(data) {
    const table = document.querySelector('#table');

    data.forEach(item => {
        const row = document.querySelector('#order_template').content.cloneNode(true);

        //console.log(item);

        row.querySelector('.js_meta').dataset.comment = item.comment;
        row.querySelector('.js_meta').dataset.created_at = item.created_at;
        row.querySelector('.js_meta').dataset.delivery_address = item.delivery_address;
        row.querySelector('.js_meta').dataset.delivery_date = item.delivery_date;
        row.querySelector('.js_meta').dataset.delivery_interval = item.delivery_interval;
        row.querySelector('.js_meta').dataset.email = item.email;
        row.querySelector('.js_meta').dataset.full_name = item.full_name;
        row.querySelector('.js_meta').dataset.good_names = item.good_names;
        row.querySelector('.js_meta').dataset.id = item.id;
        row.querySelector('.js_meta').dataset.phone = item.phone;
        row.querySelector('.js_meta').dataset.total_price = item.total_price;

        row.querySelector('.js_create').textContent = item.created_at;
        row.querySelector('.js_sostav').textContent = item.good_names;
        row.querySelector('.js_price').textContent = item.total_price + ' \u20BD';
        row.querySelector('.js_delivery').textContent =
            new Date(item.delivery_date).toLocaleDateString('ru-RU') + ' ' + item.delivery_interval;

        table.appendChild(row);
    });

    numirateRows();
}

export function cleanOrder(id) {
    document.querySelector(`[data-id="${id}"]`).parentElement.remove();
    numirateRows();
}

function numirateRows() {
    Array.from(document.querySelector('#table').children).forEach((row, index) => {
        row.querySelector('.js_number').textContent = index + 1;
    });
}

export function viewModal(id) {
    const meta = document.querySelector(`[data-id="${id}"]`).dataset;

    document.querySelector('#created_at').firstElementChild.textContent = meta.created_at;
    document.querySelector('#full_name').firstElementChild.textContent = meta.full_name;
    document.querySelector('#phone').firstElementChild.textContent = meta.phone;
    document.querySelector('#email').firstElementChild.textContent = meta.email;
    document.querySelector('#delivery_address').firstElementChild.textContent = meta.delivery_address;
    document.querySelector('#delivery_date').firstElementChild.textContent = new Date(meta.delivery_date).toLocaleDateString('ru-RU');
    document.querySelector('#delivery_interval').firstElementChild.textContent = meta.delivery_interval;
    document.querySelector('#good_names').firstElementChild.textContent = meta.good_names;
    document.querySelector('#total_price').firstElementChild.textContent = meta.total_price + ' \u20BD';
    if (meta.comment) document.querySelector('#comment').firstElementChild.textContent = meta.comment;
}

export function editModal(id) {
    const meta = document.querySelector(`[data-id="${id}"]`).dataset;

    document.querySelector('#created_at').firstElementChild.textContent = meta.created_at;
    document.querySelector('#full_name').firstElementChild.textContent = meta.full_name;
    document.querySelector('#phone').firstElementChild.textContent = meta.phone;
    document.querySelector('#email').firstElementChild.textContent = meta.email;
    document.querySelector('#delivery_address').firstElementChild.textContent = meta.delivery_address;
    document.querySelector('#delivery_date').firstElementChild.textContent = new Date(meta.delivery_date).toLocaleDateString('ru-RU');
    document.querySelector('#delivery_interval').firstElementChild.textContent = meta.delivery_interval;
    document.querySelector('#good_names').firstElementChild.textContent = meta.good_names;
    document.querySelector('#total_price').firstElementChild.textContent = meta.total_price;
    if (meta.comment) document.querySelector('#comment').firstElementChild.textContent = meta.comment;
}



