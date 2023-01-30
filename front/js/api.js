//info to reach API
const indexUrl = 'http://localhost:3000/API/products/';

// fetch API
const request = async (path = '') => {
    return await fetch(indexUrl + path)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error ('Request failed!');
            }
    })
    .then(data => {
        console.log(data);
        return data;
    })
    .catch((error) => console.error("FETCH ERROR:", error));
};

//functions to get data from api

//homepage
export const getProducts = async () => {
    return await request();
};

//product page
export const getProduct = async () => {
    
    let params = new URL(document.location).searchParams;
    let id = params.get('id');
    return await request(id);
};

/*
//cart
export const getCart = async () => {
    let cart = 
    return await request();
};
*/