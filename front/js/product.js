//function to get product page url
import { getProduct } from "./api.js";
const product = await getProduct();


//function to create HTML for color options
const makeColorHtmlTemplate = (colors) => {
        const templates = [];
        colors.forEach(color => {
                const $colorOption = document.createElement('option');
                $colorOption.text = color;
                templates.push($colorOption);
        });
        return templates;
};


// Rendering to HTML
const displayProduct = (product) => {
        //title of html page
        const $pageTitle = document.getElementsByTagName('title');
        $pageTitle[0].textContent = product.name;
        //image
        const $imageContainer = document.getElementsByClassName('item__img');
        const $img = document.createElement('img');
        $imageContainer[0].appendChild($img);
        $img.src = product.imageUrl;
        $img.alt = product.altTxt;        
        //price
        const $price = document.getElementById('price');
        $price.textContent = product.price;
        //description
        const $description = document.getElementById('description');
        $description.textContent = product.description;
        //colors
        const colorContainer = document.getElementById('colors');
        const colorOptions = product.colors;
        /*
        const getColors = (colors) => {
                colors.forEach(color => {
                        const colorOption = document.createElement('option');
                        colorOption.text = color;
                        colorContainer.add(colorOption);
                });
        };
        getColors(colorOptions);
        */
        const $colorContainer = document.getElementById('colors');
        const productColors = product.colors;
        const templates = makeColorHtmlTemplate(productColors);
        templates.forEach(t => {$colorContainer.appendChild(t)});
};
        
//Calling function to display product
displayProduct(product);

//--------------------------------GESTION DU PANIER--------------------------------------------

// => response to "Add to Cart" button
const handleClick = (event) => {
        //1. PUT user choices in variables
        const quantity = document.querySelector('#quantity').value;
        const color = document.querySelector('#colors').value;
        //2. CREATE product (project requires only: id, quantity, color)
        let productOption = {
                _id: product._id,
                _name: product.name,
                img: product.imageUrl,
                altTxt: product.altTxt,
                color: color,
                quantity: quantity,
                //price: parseInt(product.price) * parseInt(quantity)
        };
        //3. ADD to Cart
        if (color === '' && quantity == 0) {
                alert('Merci de sélectionner un produit');
        }else if (color === '') {
                alert('Merci de sélectionner une couleur');
        }else if (quantity == 0) {
                alert("Merci d'ajouter une quantité");
        }else if (quantity < 1 || quantity > 100) {
                alert('Merci de choisir une quantité entre 1 et 100');
        }else { 
                addItemToCart(productOption)
        };
};

//get button
const addToCartBtn = document.querySelector('#addToCart');
addToCartBtn.addEventListener('click', handleClick);

//----------------LOCALSTORAGE---------------------------------------------------------------
//(function) => save product to localStorage
const addItemToCart = (productOption) => {
        //test: console.log("Produit: ", productOption);
        let cart = localStorage.getItem('cart');
        if (cart) {
                let products = JSON.parse(cart).products
                let match = false;
                products.forEach(product => {
                        if (product._id === productOption._id && product.color === productOption.color) {
                                let q = parseInt(product.quantity) + parseInt(productOption.quantity)
                                product.quantity = q;
                                /*
                                let p = q * parseInt(productOption.price);
                                product.price = p;
                                */
                                match = true;
                        };
                }    
                );
                //(match === false) is true
                if (!match) {
                        products.push(productOption);
                };
                cart = {'products': products};  // products = [...]  liste de tous les produits
        } else {
                cart = {'products':[productOption]};
};
        //add to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
};