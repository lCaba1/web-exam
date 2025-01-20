let catalog;

export function setCatalog(data) {
    catalog = data;
}

export function getCatalog() {
    return catalog;
}

function ratingDescending() {
    document.getElementById('catalog').replaceChildren();

    catalog.sort((l, r) => r.rating - l.rating);
    //console.log(catalog);
}

function ratingAscending() {
    document.getElementById('catalog').replaceChildren();

    catalog.sort((l, r) => l.rating - r.rating);
}

function priceDescending() {
    document.getElementById('catalog').replaceChildren();

    catalog.sort((l, r) =>
        l.discount_price && r.discount_price ? r.discount_price - l.discount_price :
            l.discount_price ? r.actual_price - l.discount_price :
                r.discount_price ? r.discount_price - l.actual_price :
                    r.actual_price - l.actual_price
    );
}

function priceAscending() {
    document.getElementById('catalog').replaceChildren();

    catalog.sort((l, r) =>
        l.discount_price && r.discount_price ? l.discount_price - r.discount_price :
            l.discount_price ? l.discount_price - r.actual_price :
                r.discount_price ? l.actual_price - r.discount_price :
                    l.actual_price - r.actual_price
    );
}

export const sortCatalog = {
    ratingDescending,
    ratingAscending,
    priceDescending,
    priceAscending
}


