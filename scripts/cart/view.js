export function displayCart(data) {
    data.forEach(item => {
        const card = document.querySelector('#card-template').content.cloneNode(true);

        card.querySelector('.js_meta').setAttribute('data-main_category', item.main_category);
        card.querySelector('.js_meta').setAttribute('data-id', item.id);

        card.querySelector('.js_image_url').src = item.image_url;
        card.querySelector('.js_name').textContent = item.name;
        card.querySelector('.js_rating').textContent = item.rating;

        card.querySelector('.js_name').setAttribute('data-bs-title', item.name);

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

        document.querySelector('#cart').appendChild(card);
    });

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

export function displayTotalPrice(price) {
    document.querySelector('#total_price').textContent = price;
}

export function displayDeliveryPrice(price) {
    document.querySelector('#delivery_price').textContent = price;
}

export function cleanCart(item) {
    document.querySelector('#cart').removeChild(item);
}

export function emptyCart() {
    if (document.querySelector('#cart').children.length) {
        document.querySelector('#empty_cart_banner').setAttribute('hidden', true);
        document.querySelector('#submit_order_button').removeAttribute('disabled');
    }
    else {
        document.querySelector('#empty_cart_banner').removeAttribute('hidden');
        document.querySelector('#submit_order_button').setAttribute('disabled', true);
    }
}

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

    if (time >= 22 || time < 3) now.setDate(now.getDate() + 1);
    const date = now.toISOString().split('T')[0];
    document.querySelector('#date').setAttribute('value', date);
    document.querySelector('#date').setAttribute('min', date);

    document.querySelector('#time').dispatchEvent(new Event('change'));
    document.querySelector('#date').dispatchEvent(new Event('change'));
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

    if (color == 'alert-danger') document.querySelector('body').scrollIntoView();
}

