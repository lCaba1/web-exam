const api_url = 'https://edu.std-900.ist.mospolytech.ru';
const goods_path = '/exam-2024-1/api/goods';
const auth = '?api_key=12fb475f-4ad1-4629-8a9b-1dbfd9e253dd';
const page = '&page=1&per_page=3' // &sort_order=

function fillGoodsCard(goods) {
    current_element = this;
    current_element.appendChild(
        Object.assign(document.createElement('img'), {
            src: goods.image_url,
            alt: goods.id + goods.name,
            className: 'overflow-hidden h-100 w-100 card-img-top',
            style: 'flex-basis: auto'
        })
    )
    current_element.appendChild(
        Object.assign(document.createElement('div'), {
            className: 'card-body',
        })
    );
    current_element = current_element.lastElementChild;
    current_element.appendChild(
        Object.assign(document.createElement('h6'), {
            className: 'card-title text-truncate',
            textContent: goods.name
        })
    );
    current_element.appendChild(
        Object.assign(document.createElement('div'), {
            className: 'd-flex gap-3 card-text text-muted'
        })
    );
    current_element = current_element.lastElementChild;
    current_element.appendChild(
        Object.assign(document.createElement('span'), {
            textContent: goods.rating.toFixed(1)
        })
    );
    current_element.appendChild(document.createElement('span'));
    current_element = current_element.lastElementChild;
    for (let i = 1; i <= 5; i++) {
        if (i <= goods.rating) {
            current_element.appendChild(
                Object.assign(document.createElement('i'), {
                    className: 'bi bi-star-fill text-warning'
                })
            );
        } else if (i - goods.rating <= 0.5) {
            current_element.appendChild(
                Object.assign(document.createElement('i'), {
                    className: 'bi bi-star-half text-warning'
                })
            );
        } else {
            current_element.appendChild(
                Object.assign(document.createElement('i'), {
                    className: 'bi bi-star'
                })
            );
        }
    }
    current_element = current_element.parentElement.parentElement;
    current_element.appendChild(
        Object.assign(document.createElement('div'), {
            className: 'card-text d-flex justify-content-between'
        })
    )
    current_element = current_element.lastElementChild;
    current_element.appendChild(
        Object.assign(document.createElement('span'), {
            textContent: goods.actual_price + '\u20BD'
        })
    )
    if (goods.discount_price != null) {
        current_element.appendChild(
            Object.assign(document.createElement('s'), {
                className: 'text-danger',
                textContent: goods.discount_price + '\u20BD'
            })
        )
        current_element.appendChild(
            Object.assign(document.createElement('strong'), {
                className: 'text-danger',
                textContent: '-' + ((goods.actual_price - goods.discount_price) / goods.actual_price * 100).toFixed(2) + '%'
            })
        )
    }
    current_element = current_element.parentElement;
    current_element.appendChild(
        Object.assign(document.createElement('button'), {
            className: 'btn btn-primary w-100 mt-1',
            textContent: 'Добавить'
        })
    )
}

function createCardsGrid(data) {
    const catalog = document.getElementById('catalog');
    data.forEach(goods => {
        let current_element = catalog;
        catalog.appendChild(
            Object.assign(document.createElement('div'), {
                className: 'col'
            })
        );
        current_element = current_element.lastElementChild;
        current_element.appendChild(
            Object.assign(document.createElement('div'), {
                className: 'ratio',
                style: '--bs-aspect-ratio: 165%'
            })
        );
        current_element = current_element.lastElementChild;
        current_element.appendChild(
            Object.assign(document.createElement('div'), {
                className: 'card d-flex flex-column overflow-hidden'
            })
        );
        current_element = current_element.lastElementChild;
        fillGoodsCard.call(current_element, goods);
    });
}

async function fetchGoodsCatalog() {
    const response = await fetch(api_url + goods_path + auth/* + page*/, { method: 'GET' });
    const data = await response.json();
    //console.log(data);
    createCardsGrid(data/*.goods*/);
}

fetchGoodsCatalog();