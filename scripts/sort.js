async function ratingDescending() {
    await fetch_promise;
    catalog.sort((l, r) => r.rating - l.rating);
    display();
}

async function ratingAscending() {
    await fetch_promise;
    catalog.sort((l, r) => l.rating - r.rating);
    display();
}

async function priceDescending() {
    await fetch_promise;
    catalog.sort((l, r) =>
        l.discount_price && r.discount_price ? r.discount_price - l.discount_price :
            l.discount_price ? r.actual_price - l.discount_price :
                r.discount_price ? r.discount_price - l.actual_price :
                    r.actual_price - l.actual_price
    );
    display();
}

async function priceAscending() {
    await fetch_promise;
    catalog.sort((l, r) =>
        l.discount_price && r.discount_price ? l.discount_price - r.discount_price :
            l.discount_price ? l.discount_price - r.actual_price :
                r.discount_price ? l.actual_price - r.discount_price :
                    l.actual_price - r.actual_price
    );
    display();
}


// separate