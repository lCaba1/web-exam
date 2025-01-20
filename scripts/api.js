const api_url = 'https://edu.std-900.ist.mospolytech.ru';
const catalog_path = '/exam-2024-1/api/goods';
const auth = '?api_key=12fb475f-4ad1-4629-8a9b-1dbfd9e253dd';
const page = '&page=1&per_page=3' // &sort_order=

export async function fetchCatalog() {
    const response = await fetch(api_url + catalog_path + auth/* + page*/, { method: 'GET' });
    return await response.json();
}