//function to get product page url
import { getProduct } from "./api.js";
const product = await getProduct();

//function to create HTML for color options
const makeColorHtmlTemplate = (colors) => {
        const templates = [];
        colors.forEach(color => {
                const colorOption = document.createElement('option');
                colorOption.text = color;
                templates.push(colorOption);
        });
        return templates;
};

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
        const productColors = product.colors;
        const templates = makeColorHtmlTemplate(productColors);
        templates.forEach(t => {colorContainer.appendChild(t)});
};

//calling function to display product
displayProduct(product);

//--------------------------------GESTION DU PANIER--------------------------------------------

//(function) response to Add to Cart button
const handleClick = (event) => {
        //1. put user choices in variables
        const input = document.querySelector('#quantity').value;
        const color = document.querySelector('#colors').value;
        //2. create product (project requires only: id, quantity, color)
        let productOption = {
                _id: product.id,
                _name: product.name,
                img: product.img,
                color: color,
                quantity: input,
                //price: product.price * productOption.quantity 
        };
        //3. add to Cart
        if (color === '' && input == 0) {
                alert('Merci de sélectionner un produit');
        }else if (color === '') {
                alert('Merci de sélectionner une couleur');
        }else if (input == 0) {
                alert("Merci d'ajouter une quantité");
        }else { 
                addItemToCart(productOption)
        };
};

//get button
const addToCartBtn = document.querySelector('#addToCart');
addToCartBtn.addEventListener('click', handleClick);

//----------------LOCALSTORAGE---------------------------------------------------------------

//(function) save product to localStorage
const addItemToCart = (productOption) => {
        //read localStorage and get cart
        let cart = localStorage.getItem('cart');
        if (cart) {
        //if cart = true = already exists, get the list of products from it (.products=key)
                let products = JSON.parse(cart).products
                /*product of same color already in basket=>increase quantity and add to cart
                otherwise: add to cart*/
                products.forEach(product => {
                        //(A)
                        if (product.id === productOption.id) {
                            if (product.color === productOption.color)
                                product.quantity ++
                        }
                        //(B)
                        products.push(productOption);
                });
                //save to localStorage
                cart = {'products': products};
        } else {
                cart = {'products':[productOption]};
};
        //add to localStorage?
        localStorage.setItem('cart', JSON.stringify(cart));
};