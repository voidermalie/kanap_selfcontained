const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Import getProduct function to retrieve the product data
import { getProduct } from "./api.js";
const product = await getProduct(productId);


/*Create HTML element for each color option
- Takes an array of colors and returns an array of HTML option elements*/
const makeColorHtmlTemplate = (colors) => {
        const templates = [];
        // Loop through the colors array and create an HTML option element for each color
        colors.forEach(color => {
                const $colorOption = document.createElement('option');
                $colorOption.text = color;
                templates.push($colorOption);
        });
        // Return the array of HTML option elements
        return templates;
};


// Render product data to HTML page
const displayProduct = (product) => {
        // Set the page title to the name of the product
        const $pageTitle = document.getElementsByTagName('title');
        $pageTitle[0].textContent = product.name; 
        //getElementsByTagName returns a collection of result so index is needed (querySelector would work without index)

        // Add the product image to the page
        const $imageContainer = document.getElementsByClassName('item__img');
        const $img = document.createElement('img');
        $imageContainer[0].appendChild($img);
        $img.src = product.imageUrl;
        $img.alt = product.altTxt;      

        // Set the product price on the page
        const $price = document.getElementById('price');
        $price.textContent = product.price;

        // Set the product description on the page
        const $description = document.getElementById('description');
        $description.textContent = product.description;

        // Create HTML option elements for each color and add them to the color select element
        /*rip first working color function:
        const $colorContainer = document.getElementById('colors');
        const colorOptions = product.colors;
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
        
//Calling function to display product data
displayProduct(product);

//--------------------------------GESTION DU PANIER--------------------------------------------

// => response to "Add to Cart" button
const handleClick = (event) => {
        //1. PUT user choices in variables
        const quantity = document.querySelector('#quantity').value;
        const color = document.querySelector('#colors').value;

        //2. CREATE product object (project requires only: id, quantity, color)
        const productOption = {
                _id: product._id,
                _name: product.name,
                img: product.imageUrl,
                altTxt: product.altTxt,
                color: color,
                quantity: quantity,
                //price: parseInt(product.price) * parseInt(quantity)
        };
        /*3. ADD to Cart
        If the user did not select a color or quantity, or the quantity is invalid, display an alert*/
        if (color === '' && quantity == 0) {
                alert('Merci de sélectionner un produit');
        }else if (color === '') {
                alert('Merci de sélectionner une couleur');
        }else if (quantity == 0) {
                alert("Merci d'ajouter une quantité");
        }else if (quantity < 1 || quantity > 100) {
                alert('Merci de choisir une quantité entre 1 et 100');
        }else { 
                // Add the product to the cart
                addItemToCart(productOption)
        };
};

// Get the "Add to Cart" button and add a click event listener
const $addToCartBtn = document.querySelector('#addToCart');
$addToCartBtn.addEventListener('click', handleClick);

//----------------LOCALSTORAGE---------------------------------------------------------------

// Add a product to the cart in local storage
const addItemToCart = (productOption) => {
        //test: console.log("product": productOption);
        let cart = localStorage.getItem('cart'); // Get the current cart from local storage

        if (cart) { // If the cart already exists
                let products = JSON.parse(cart).products // Get the list of products from the cart object
                let match = false; // Initialize the match flag to false

                // Loop through each product in the list to check if it matches the selected product
                products.forEach(product => {
                        if (product._id === productOption._id && product.color === productOption.color) {
                                let q = parseInt(product.quantity) + parseInt(productOption.quantity) // Calculate the new quantity of the product
                                product.quantity = q; // Update the quantity of the product
                                /*
                                let p = q * parseInt(productOption.price);
                                product.price = p;
                                */
                                match = true; // Set the match flag to true
                        };
                }    
                );

                if (!match) {  //// If no match was found // (match === false) meaning true
                        products.push(productOption); // Add the selected product to the list of products
                };
                cart = {'products': products};  // products = [...] Create a new cart object with the updated list of products

        } else { // If the cart does not exist
                cart = {'products':[productOption]}; // Create a new cart object with the selected product as the only product
        };
        // Update the cart in local storage with the new cart object
        localStorage.setItem('cart', JSON.stringify(cart)); 
};