const api_url = 'https://edu.std-900.ist.mospolytech.ru';
const catalog_path = '/exam-2024-1/api/goods';
const auth = '?api_key=12fb475f-4ad1-4629-8a9b-1dbfd9e253dd';
const page = '&page=1&per_page=3' // &sort_order=

function createCard(goods) {
    const card = document.getElementById('card-template').content.cloneNode(true);

    card.querySelector('img.js_image_url').src = goods.image_url;
    card.querySelector('h6.js_name').textContent = goods.name;
    card.querySelector('span.js_rating').textContent = goods.rating;

    const stars = card.querySelector('span.js_rating_stars').querySelectorAll('i');
    for (let i = 0; i < 5; i++) {
        if (i <= goods.rating - 1) stars[i].classList.add('bi', 'bi-star-fill', 'text-warning');
        else if (i - goods.rating + 1 <= 0.5) stars[i].classList.add('bi', 'bi-star-half', 'text-warning');
        else stars[i].classList.add('bi', 'bi-star');
    }

    if (goods.discount_price) {
        card.querySelector('span.js_discount_price').textContent = goods.discount_price;
        card.querySelector('s.js_actual_price').textContent = goods.actual_price;
        card.querySelector('strong.js_percent_off').textContent =
            '-' + ((1 - goods.discount_price / goods.actual_price) * 100).toPrecision(2) + '%';
    } else {
        card.querySelector('span.js_discount_price').textContent = goods.actual_price;
    }

    document.getElementById('catalog').appendChild(card);
}

async function fetchCatalog() {
    const response = await fetch(api_url + catalog_path + auth/* + page*/, { method: 'GET' });
    const data = await response.json();
    //console.log(data);
    data.forEach(goods => {
        createCard(goods);
    });
}

fetchCatalog();

