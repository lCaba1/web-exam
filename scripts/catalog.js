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

async function display() {
    await fetch_promise;
    //console.log(fetch_promise);
    //console.log(catalog);
    document.getElementById('catalog').replaceChildren();

    catalog.forEach(item => {
        createCard(item);
    });
}

display();

