let catalog;
let categories = new Set();

export function setCatalog(data) {
    catalog = data;
    setCategories();
}

export function getCatalog() { return catalog; }

export function getCategories() { return categories; }

export const sortCatalog = { ratingDescending, ratingAscending, priceDescending, priceAscending }

export function min_price() {
    const min_item = [...catalog].reduce((min, current) =>
        (current.discount_price ?? current.actual_price) < (min.discount_price ?? min.actual_price) ?
            current : min
    );
    return min_item.discount_price ?? min_item.actual_price;
}

export function max_price() {
    const max_item = [...catalog].reduce((max, current) =>
        (current.discount_price ?? current.actual_price) > (max.discount_price ?? max.actual_price) ?
            current : max
    );
    return max_item.discount_price ?? max_item.actual_price;
}

function setCategories() {
    catalog.forEach(item => {
        categories.add(item.main_category);
        //categories.add(item.sub_category);
    });

    categories = [...categories].sort();
}

function ratingDescending() { catalog.sort((l, r) => r.rating - l.rating); }

function ratingAscending() { catalog.sort((l, r) => l.rating - r.rating); }

function priceDescending() {
    catalog.sort((l, r) =>
        (r.discount_price ?? r.actual_price) - (l.discount_price ?? l.actual_price)
    );
}

function priceAscending() {
    catalog.sort((l, r) =>
        (l.discount_price ?? l.actual_price) - (r.discount_price ?? r.actual_price)
    );
}