let catalog;

export function setCatalog(data) {
    catalog = data;
    setCategories();
}

export function getCatalog() { return catalog; }

function ratingDescending() { catalog.sort((l, r) => r.rating - l.rating); }

function ratingAscending() { catalog.sort((l, r) => l.rating - r.rating); }

function priceDescending() {
    catalog.sort((l, r) =>
        l.discount_price && r.discount_price ? r.discount_price - l.discount_price :
            l.discount_price ? r.actual_price - l.discount_price :
                r.discount_price ? r.discount_price - l.actual_price :
                    r.actual_price - l.actual_price
    );
}

function priceAscending() {
    catalog.sort((l, r) =>
        l.discount_price && r.discount_price ? l.discount_price - r.discount_price :
            l.discount_price ? l.discount_price - r.actual_price :
                r.discount_price ? l.actual_price - r.discount_price :
                    l.actual_price - r.actual_price
    );
}

export const sortCatalog = { ratingDescending, ratingAscending, priceDescending, priceAscending }

let categories = new Set();

function setCategories() {
    catalog.forEach(item => {
        categories.add(item.main_category);
        //categories.add(item.sub_category);
    });

    categories = [...categories].sort();
}

export function getCategories() { return categories; }

/*export const min_price = () => Object.values(catalog).reduce((min, current) => {
    return current.discount_price && min.discount_price ?
        current.discount_price < min.discount_price ? current : min :
        current.discount_price ?
            current.discount_price < min.actual_price ? current : min :
            min.discount_price ?
                current.actual_price < min.discount_price ? current : min :
                current.actual_price < min.actual_price ? current : min;
}, catalog[0]);*/



//
export function min_price() {
    return [...catalog].reduce((min, current) =>
        min.discount_price && current.discount_price && min.discount_price > current.discount_price ? current :
            min.discount_price && min.discount_price > current.actual_price ? current :
                current.discount_price && min.actual_price > current.discount_price ? current :
                    min
    );
} 