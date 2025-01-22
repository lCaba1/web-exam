export function displayCatalog(data) {
    data.forEach(item => {
        const card = document.querySelector('#card-template').content.cloneNode(true);

        card.querySelector('.js_category').setAttribute('data-main_category', item.main_category);
        card.querySelector('.js_category').setAttribute('data-sub_category', item.sub_category);

        card.querySelector('.js_image_url').src = item.image_url;
        card.querySelector('.js_name').textContent = item.name;
        card.querySelector('.js_rating').textContent = item.rating;

        const stars = card.querySelector('.js_rating_stars').querySelectorAll('i');
        for (let i = 0; i < 5; i++) {
            if (i <= item.rating - 1)
                stars[i].classList.add('bi', 'bi-star-fill', 'text-warning');
            else if (i - item.rating + 1 <= 0.5)
                stars[i].classList.add('bi', 'bi-star-half', 'text-warning');
            else
                stars[i].classList.add('bi', 'bi-star');
        }

        card.querySelector('.js_discount_price').textContent = item.discount_price ?? item.actual_price;
        if (item.discount_price) {
            card.querySelector('.js_actual_price').textContent = item.actual_price;
            card.querySelector('.js_percent_off').textContent =
                '-' + ((1 - item.discount_price / item.actual_price) * 100).toPrecision(2) + '%';
        }

        document.querySelector('#catalog').appendChild(card);
    });
}

export function displayCategories(data) {
    for (let i = 0; i < data.length; i++) {
        const category = document.querySelector('#categoty-template').content.cloneNode(true);
        category.querySelector('label.js_category_label').textContent = data[i];
        category.querySelector('label.js_category_label').setAttribute('for', 'category' + i);
        category.querySelector('input.js_category_input').value = data[i];
        category.querySelector('input.js_category_input').id = 'category' + i;
        document.querySelector('#categories').appendChild(category);
    }
}

export function displayPriceRange(min, max) {
    document.querySelector('input.js_min').placeholder = min;
    document.querySelector('input.js_max').placeholder = max;
}

export function displayHide(data) {
    Array.from(document.querySelector('#catalog').children).forEach(item => {
        item.hidden = false
    });
    data.forEach(item => {
        item.hidden = true;
    });
}

export function displayReplace(data) {
    document.querySelector('#catalog').replaceChildren(...data);
}



