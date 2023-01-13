//function to get product page url
import { getProduct } from "./api.js";
const product = await getProduct();

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
        img.alt = product.altTxt;        
        //price
        const price = document.getElementById('price');
        price.textContent = product.price;
        //description
        const description = document.getElementById('description');
        description.textContent = product.description;
        //colors
        const colorContainer = document.getElementById('colors');
        const colorOptions = product.colors;
        const getColors = (colors) => {
                colors.forEach(color => {
                        const colorOption = document.createElement('option');
                        colorOption.text = color;
                        colorContainer.add(colorOption);

                });
        }
        getColors(colorOptions);
};
//SIKERUUUUUUUUUUUULT :))))))))))yayyayayayayayayayayay
displayProduct(product);