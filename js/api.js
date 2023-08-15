//const PRODUCTS_URL =  "../api.json";
//url for gh pages:
const PRODUCTS_URL =  "/kanap_selfcontained/api.json";


export const getProducts = async () => {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return await response.json();
};

export const getProduct = async (id) => {
    const products = await getProducts();
    return products.find(product => (product._id) === id);
};