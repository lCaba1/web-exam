export function displayCatalog(data) {
    data.goods.forEach(item => {
        const card = document.querySelector('#card-template').content.cloneNode(true);

        card.querySelector('.js_meta').setAttribute('data-main_category', item.main_category);
        card.querySelector('.js_meta').setAttribute('data-id', item.id);

        card.querySelector('.js_image_url').src = item.image_url;
        card.querySelector('.js_name').textContent = item.name;
        card.querySelector('.js_rating').textContent = item.rating;

        card.querySelector('.js_name').setAttribute('data-bs-title', item.name);

        const stars = card.querySelector('.js_rating_stars').querySelectorAll('.js_star');
        for (let i = 0; i < 5; i++) {
            if (i + 1 <= item.rating)
                stars[i].classList.add('bi', 'bi-star-fill', 'text-warning');
            else if (i + 0.5 <= item.rating)
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

        document.querySelector('#catalog').appendChild(card);
    });

    if (data._pagination.current_page * data._pagination.per_page >= data._pagination.total_count) {
        document.querySelector('#download_button').parentElement.setAttribute('hidden', true);
    } else {
        document.querySelector('#download_button').parentElement.removeAttribute('hidden');
    }

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    return Array.from(document.querySelector('#catalog').children);
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

export function displayPriceRange(range) {
    document.querySelector('#min_price').placeholder = range.min;
    document.querySelector('#max_price').placeholder = range.max;
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

export function hideFiltered(data) {
    Array.from(document.querySelector('#catalog').children).forEach(item => {
        item.hidden = false
    });
    data.forEach(item => {
        item.hidden = true;
    });
}

export function cleanCatalog() {
    document.querySelector('#catalog').replaceChildren();
}

export function cleanCategories() {
    document.querySelector('#categories').replaceChildren();
}

export function fillDropdown(list) {
    document.querySelector('#suggestions').replaceChildren();

    document.querySelector('.dropdown-menu').removeAttribute('hidden');
    if (!list.length) document.querySelector('.dropdown-menu').setAttribute('hidden', true);

    const search_str = document.querySelector('#search_input').value.trim().split(' ').slice(0, -1).join(' ');

    for (let i = 0; i < list.length; i++) {
        const suggestion = document.querySelector('#dropdown-template').content.cloneNode(true);
        suggestion.querySelector('.dropdown-item').textContent = search_str + (search_str ? ' ' : '') + list[i];
        document.querySelector('#suggestions').appendChild(suggestion);
        if (i == 8) break;
    };
}

export function fillSearch(event) {
    document.querySelector('#search_input').value = event.target.textContent;
}

export function emptyCatalog() {
    document.querySelector('#empty_catalog_banner_1').setAttribute('hidden', true);
    document.querySelector('#empty_catalog_banner_2').setAttribute('hidden', true);

    if (Array.from(document.querySelectorAll('.js_meta[hidden]')).length == document.querySelector('#catalog').children.length) {
        if (document.querySelector('#download_button').parentElement.getAttribute('hidden') == 'true')
            document.querySelector('#empty_catalog_banner_2').removeAttribute('hidden');
        else
            document.querySelector('#empty_catalog_banner_1').removeAttribute('hidden');
    }
}