function createCard(item) {
    const card = document.getElementById('card-template').content.cloneNode(true);

    card.querySelector('img.js_image_url').src = item.image_url;
    card.querySelector('h6.js_name').textContent = item.name;
    card.querySelector('span.js_rating').textContent = item.rating;

    const stars = card.querySelector('span.js_rating_stars').querySelectorAll('i');
    for (let i = 0; i < 5; i++) {
        if (i <= item.rating - 1) stars[i].classList.add('bi', 'bi-star-fill', 'text-warning');
        else if (i - item.rating + 1 <= 0.5) stars[i].classList.add('bi', 'bi-star-half', 'text-warning');
        else stars[i].classList.add('bi', 'bi-star');
    }

    if (item.discount_price) {
        card.querySelector('span.js_discount_price').textContent = item.discount_price;
        card.querySelector('s.js_actual_price').textContent = item.actual_price;
        card.querySelector('strong.js_percent_off').textContent =
            '-' + ((1 - item.discount_price / item.actual_price) * 100).toPrecision(2) + '%';
    } else {
        card.querySelector('span.js_discount_price').textContent = item.actual_price;
    }

    document.getElementById('catalog').appendChild(card);
}

export function displayCatalog(data) {
    data.forEach(item => {
        createCard(item);
    });
}

export function cleanCatalog() { document.getElementById('catalog').replaceChildren(); }

export function displayCategories(data) {
    for (let i = 0; i < data.length; i++) {
        const category = document.getElementById('categoty-template').content.cloneNode(true);
        category.querySelector('label.js_category').textContent = data[i];
        document.getElementById('categories').appendChild(category);
    }
    
    // categoty-template    ok
    // category-template    ne ok
}