//function to get product page url
import { getProduct } from "./api.js";

//function for rendering to html 
const displayProduct = (product) => {
        //title of html page
        const pageTitle = document.getElementsByTagName('title');
        pageTitle[0].textContent = product.name;
        //image
        const imageContainer = document.getElementsByClassName('item__img');
        const img = document.createElement('img');
        imageContainer[0].appendChild(img);
        let productImage = product.imageUrl;
        img.src = productImage;
};

const product = await getProduct();
displayProduct(product);