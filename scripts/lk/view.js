export function fillMeta(data) {
    const table = document.querySelector('#table');

    data.forEach(item => {
        const row = document.querySelector('#order_template').content.cloneNode(true);

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
        row.querySelector('.js_meta').dataset.delivery_price = item.delivery_price;

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

    document.querySelector('#created_at').textContent = meta.created_at;
    document.querySelector('#full_name').textContent = meta.full_name;
    document.querySelector('#phone').textContent = meta.phone;
    document.querySelector('#email').textContent = meta.email;
    document.querySelector('#delivery_address').textContent = meta.delivery_address;
    document.querySelector('#delivery_date').textContent = new Date(meta.delivery_date).toLocaleDateString('ru-RU');
    document.querySelector('#delivery_interval').textContent = meta.delivery_interval;
    document.querySelector('#good_names').textContent = meta.good_names;
    document.querySelector('#total_price').textContent = meta.total_price + ' \u20BD';
    document.querySelector('#comment').textContent = meta.comment;
}

export function editModal(id) {
    document.querySelector('#modal_edit').dataset.processing_id = id;
    const meta = document.querySelector(`[data-id="${id}"]`).dataset;

    document.querySelector('#edit_created_at').textContent = meta.created_at;
    document.querySelector('#edit_full_name').value = meta.full_name;
    document.querySelector('#edit_phone').value = meta.phone;
    document.querySelector('#edit_email').value = meta.email;
    document.querySelector('#edit_delivery_address').value = meta.delivery_address;
    document.querySelector('#edit_delivery_date').value = meta.delivery_date;
    document.querySelector('#edit_delivery_interval').value = meta.delivery_interval;
    document.querySelector('#edit_good_names').textContent = meta.good_names;
    document.querySelector('#edit_total_price').textContent = meta.total_price;
    document.querySelector('#edit_comment').value = meta.comment;

    document.querySelector('#modal_edit').dataset.delivery_price = meta.delivery_price;
    document.querySelector('#modal_edit').dataset.delivery_date = meta.delivery_date;
    document.querySelector('#modal_edit').dataset.delivery_interval = meta.delivery_interval;

    const now = new Date();
    if (now.getHours() >= 22 || now.getHours() < 3) now.setDate(now.getDate() + 1);
    document.querySelector('#edit_delivery_date').setAttribute('min', now.toISOString().split('T')[0]);
}

let notifications_timeout;

export function displayNotification(message, color) {
    let notifications;
    if (document.body.classList.contains('modal-open'))
        notifications = document.querySelector('#modal_notifications');
    else
        notifications = document.querySelector('#notifications');

    const alert = document.querySelector('#alert-template').content.cloneNode(true);

    alert.querySelector('.js_alert_color').classList.add(color);
    alert.querySelector('.js_alert_message').textContent = message;

    if (notifications.children.length) {
        notifications.firstElementChild.remove();
    }

    notifications.appendChild(alert);
    setTimeout(() => notifications.querySelector('.js_alert_color').classList.add('show'), 100);

    clearTimeout(notifications_timeout);
    notifications_timeout = setTimeout(() => {
        if (notifications.children.length) notifications.querySelector('.js_close_alert').click();
    }, 10000);

    if (color == 'alert-danger') {
        if (document.body.classList.contains('modal-open'))
            document.querySelector('#modal_notifications').scrollIntoView();
        else
            document.querySelector('#notifications').scrollIntoView();
    }
}

export function updateRow(response) {
    const meta = document.querySelector(`[data-id="${response.id}"]`).dataset;

    meta.comment = response.comment;
    meta.created_at = response.created_at;
    meta.delivery_address = response.delivery_address;
    meta.delivery_date = response.delivery_date;
    meta.delivery_interval = response.delivery_interval;
    meta.delivery_price = response.delivery_price;
    meta.email = response.email;
    meta.full_name = response.full_name;
    meta.good_names = response.good_names;
    meta.id = response.id;
    meta.phone = response.phone;
    meta.total_price = response.total_price;
}

export function fillRow(meta) {
    const row = meta.parentElement;

    row.querySelector('.js_create').textContent = meta.dataset.created_at;
    row.querySelector('.js_sostav').textContent = meta.dataset.good_names;
    row.querySelector('.js_price').textContent = meta.dataset.total_price + ' \u20BD';
    row.querySelector('.js_delivery').textContent =
        new Date(meta.dataset.delivery_date).toLocaleDateString('ru-RU') + ' ' + meta.dataset.delivery_interval;
}