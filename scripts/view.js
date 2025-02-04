export function displayCatalog(data) {
    const target = document.querySelector('#catalog') ?? document.querySelector('#cart');
    let goods = data;
    if (target.id == 'catalog') goods = data.goods;

    goods.forEach(item => {
        const card = document.querySelector('#card-template').content.cloneNode(true);

        card.querySelector('.js_meta').setAttribute('data-main_category', item.main_category);
        card.querySelector('.js_meta').setAttribute('data-id', item.id);

        card.querySelector('.js_image_url').src = item.image_url;
        card.querySelector('.js_name').textContent = item.name;
        card.querySelector('.js_rating').textContent = item.rating;

        const stars = card.querySelector('.js_rating_stars').querySelectorAll('.js_star');
        for (let i = 0; i < 5; i++) {
            if (i <= item.rating - 1)
                stars[i].classList.add('bi', 'bi-star-fill', 'text-warning');
            else if (i - item.rating + 1 <= 0.5)
                stars[i].classList.add('bi', 'bi-star-half', 'text-warning');
            else
                stars[i].classList.add('bi', 'bi-star');
        }

        card.querySelector('.js_discount_price').textContent = (item.discount_price ?? item.actual_price);
        if (item.discount_price) {
            card.querySelector('.js_actual_price').parentElement.removeAttribute('hidden');
            card.querySelector('.js_actual_price').textContent = item.actual_price;
            card.querySelector('.js_percent_off').textContent =
                '-' + ((1 - item.discount_price / item.actual_price) * 100).toFixed(0) + '%';
        }

        target.appendChild(card);
    });

    if (target.id == 'catalog') {
        if (data._pagination.current_page * data._pagination.per_page >= data._pagination.total_count) {
            document.querySelector('#download_button').parentElement.setAttribute('hidden', true);
        } else {
            document.querySelector('#download_button').parentElement.removeAttribute('hidden');
        }
    }

    return Array.from(target.children);
}

export function cleanCatalog(item) {
    const target = document.querySelector('#catalog') ?? document.querySelector('#cart');

    if (target.id == 'catalog') {
        document.querySelector('#catalog').replaceChildren();
    }

    if (target.id == 'cart') {
        document.querySelector('#cart').removeChild(item);
    }
}

let notifications_timeout;

export function displayNotification(message, color) {
    const notifications = document.querySelector('#notifications')
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
}

export function displayCategories(data) {
    data.forEach(item => {
        const category = document.querySelector('#categoty-template').content.cloneNode(true);
        category.querySelector('.js_category_label').textContent = item;
        category.querySelector('.js_category_label').setAttribute('for', 'category' +
            document.querySelector('#categories').children.length);
        category.querySelector('.js_category_input').value = item;
        category.querySelector('.js_category_input').id = 'category' +
            document.querySelector('#categories').children.length;
        document.querySelector('#categories').appendChild(category);
    });
}

export function cleanCategories() {
    document.querySelector('#categories').replaceChildren();
}

export function displayPriceRange(range) {
    document.querySelector('#min_price').placeholder = range[0];
    document.querySelector('#max_price').placeholder = range[1];
}

export function hideFiltered(data) {
    Array.from(document.querySelector('#catalog').children).forEach(item => {
        item.hidden = false
    });
    data.forEach(item => {
        item.hidden = true;
    });
}

export function emptyCartBanner() {
    if (document.querySelector('#cart').children.length)
        document.querySelector('#empty_cart_banner').setAttribute('hidden', true);
    else
        document.querySelector('#empty_cart_banner').removeAttribute('hidden');
}

export function displayTotalPrice(price) {
    document.querySelector('#total_price').textContent = price;
}

export function displayDeliveryPrice(price) {
    document.querySelector('#delivery_price').textContent = price;
}

/*  устанавливает начальные значения для полей 'дата доставки' 
    и 'временной интервал доставки' формы в cart.html
*/
export function setTimeDate() {
    const now = new Date();

    const time = now.getHours();
    let value;
    if (time < 12) value = '08:00-12:00';
    else if (time >= 12 && time < 14) value = '12:00-14:00';
    else if (time >= 14 && time < 18) value = '14:00-18:00';
    else if (time >= 18 && time < 22) value = '18:00-22:00';
    else value = '08:00-12:00';
    document.querySelector(`#time option[value='${value}']`).setAttribute('selected', true);

    if (time >= 22) now.setDate(now.getDate() + 1);
    const date = now.toISOString().split('T')[0];
    document.querySelector('#date').setAttribute('value', date);
    document.querySelector('#date').setAttribute('min', date);

    document.querySelector('#time').dispatchEvent(new Event('change'));
    document.querySelector('#date').dispatchEvent(new Event('change'));
}




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