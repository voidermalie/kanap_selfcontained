// Base URL to reach API
const apiUrl = 'http://localhost:3000/API/products/';

// Fetch API
const request = async (path = '') => {
    return await fetch(apiUrl + path)                    //fetch method
        .then(response => {
            if (response.ok) {                           //vérifier HTTP OK (200)
                return response.json();                  //récupère les données au format json
            } else {
                throw new Error ('Request failed!');
            }
        })
        .then(data => {                                  //convertit le json en objet JS
            return data;  //console.log(data);
        })
        .catch((error) => console.error("FETCH ERROR:", error));
};

// Functions to get products from the API

// index => fetching all products
export const getProducts = async () => {
    return await request();
};

// product page => fetching a single product from the API based on the 'id' query parameter)
//this happens when url is already generated in index.js
export const getProduct = async () => {
    const params = new URL(document.location).searchParams;
    const id = params.get('id');
    return await request(id);
};