//info to reach API
const indexUrl = 'http://localhost:3000/API/products';

// fetch API
fetch(indexUrl)
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error ('Request failed!');
    }
})
.then(data => {
    console.log(data);
    getProduct(data);
    displayProduct(data);
})
.catch((error) => console.error("FETCH ERROR:", error));

//searchParams

/*
let params = (new URL(document.location)).searchParams;
let productId = params.get('id');
*/

//function to get product page url
const getProduct = (data) => {
    data.forEach(product => {
        let baseUrl = window.location.href;
        let productUrl = baseUrl + '/product.html?id=' + product._id;
        let url = new URL(productUrl);
        let productUrl = url.searchParams.get(productUrl);
        console.log(productUrl);
    })
};

//function for rendering to html 
const displayProduct = (data) => {
    data.forEach(product => {
        //title of html page
        const pageTitle = document.getElementsByTagName('title');
        pageTitle[0].textContent = product.name;
        //image
        const imageContainer = document.getElementsByClassName('item__img');
        const img = document.createElement('img');
        imageContainer[0].appendChild(img);
        productImage = product.imageUrl;
        img.src = productImage;
    })
};