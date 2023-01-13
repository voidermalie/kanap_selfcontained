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

//function to get product page url
export const getProduct = async () => {
    
    let params = new URL(document.location).searchParams;
    let id = params.get('id');
    return await request(id);
};

export const getProducts = async () => {
    return await request();
};

