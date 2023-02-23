// Get all products from API
import { getProducts } from "./api.js";
const productsApi = await getProducts(); //productsApi = [{product}, {product}, ...]

// Get cart from LocalStorage
const getCart = () => {
    let cart = localStorage.getItem('cart')
    if (cart === null) {
        return [];
    } else {
        return JSON.parse(cart).products
    }
};

let cart = getCart(); //cart = [{},{},{} ...]

// Get price from API, update objects
const getPricesForProducts = (products) => {
    //let productsAPI = getProducts()
    products.forEach(product => {
        // find product from API
        // add product price to the object
        let productApi = productsApi.find(p => p._id === product._id) //fonction qui retourne vrai si l'id est meme
        product.price = productApi.price;
    });
    return products
};

// update products from localStorage with their prices from API
let products = getPricesForProducts(cart);


// -----------------------------Display a list of products on the page----------------------------

//(products) is a property, then when we call the function later, we pass (cart) as an argument
//well now we pass (products) again because of getpricesforproducts...
const displayCart = (products) => {
    const $cartItem = document.querySelector('#cart__items');
    products.forEach(product => {
        /*render to HTML
        article -> 2 divs => div1=img + div2=cartItemContent
        cartItemContent -> 2 divs => div1=description + div2=settings
        description -> h2 (productName), p (color), p (price)
        settings -> 2 divs => div1=quantity(p, input) + div2=delete(p)*/
        const $article = document.createElement('article');
        $article.classList.add('cart__item');
        $article.dataset.id = product._id;
        $article.dataset.color = product.color;
        //img (Div1)
        const $imgDiv = document.createElement('div');
        $imgDiv.classList.add('cart__item__img');
        $article.appendChild($imgDiv);
        const $img = document.createElement('img');
        $img.src = product.img;
        $img.alt = product.altTxt;
        $imgDiv.appendChild($img);
        //cartItemContent (Div2)
        const $itemDiv = document.createElement('div');
        $itemDiv.classList.add('cart__item__content');
        $article.appendChild($itemDiv);
        //div1
        const $descriptionDiv = document.createElement('div');
        $descriptionDiv.classList.add('cart__item__content__description');
        $itemDiv.appendChild($descriptionDiv);
        //h2 (product name)
        const $productName = document.createElement('h2');
        $productName.textContent = product._name;
        $descriptionDiv.appendChild($productName);
        //p (color)
        const $productColor = document.createElement('p')
        $productColor.textContent = product.color;
        $descriptionDiv.appendChild($productColor);
        //p (price)
        const $productPrice = document.createElement('p');
        $productPrice.textContent = `${product.price} €`;
        $descriptionDiv.appendChild($productPrice);
        //div2
        const $settingsDiv = document.createElement('div');
        $settingsDiv.classList.add('cart__item__content__settings');
        $itemDiv.appendChild($settingsDiv);
        //settings-div1
        const $quantityDiv = document.createElement('div');
        $quantityDiv.classList.add('cart__item__content__settings__quantity');
        $settingsDiv.appendChild($quantityDiv);
        //p
        const $quantityItem = document.createElement('p');
        $quantityItem.textContent = 'Qté :';
        $quantityDiv.appendChild($quantityItem);
        //avant: $quantityItem.textContent = `Qté : ${product.quantity}`;
        //<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        const $input = document.createElement('input');
        $input.type = 'number';
        $input.classList.add('itemQuantity');
        $input.name = 'itemQuantity';
        $input.min = '1';
        $input.max = '100';
        $input.value = product.quantity;
        $quantityDiv.appendChild($input);
        //console.log(product.price);
        //settings-div2
        const $deleteDiv = document.createElement('div');
        $deleteDiv.classList.add('cart__item__content__settings__delete');
        $settingsDiv.appendChild($deleteDiv);
        //p
        const $deleteItem = document.createElement('p');
        $deleteItem.classList.add('deleteItem');
        $deleteItem.textContent = "Supprimer";
        $deleteDiv.appendChild($deleteItem);
        //pour update le DOM une fois que tout est modifié
        $cartItem.appendChild($article);
    });
};

displayCart(products);



//-------------------------------------MODIFY CART------------------------------------------------

//----------------------------------CHANGE QUANTITY-----------------------------------------------

const updateQuantity = (event) => {
    let $input = event.target;

    //Get ID of product to be updated. Access the 'data-id' attribute of the input field's parent element
    const idToUpdate = $input.closest('article');
    let itemId = idToUpdate.getAttribute('data-id');
    let itemColor = idToUpdate.getAttribute('data-color');

    //Get the updated quantity from the input field's value.
    let updatedQuantity = parseInt($input.value);

    //Retrieve cart from LS, parse data as JS object // OR empty object
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    //Retrieve the products array from the cart data // OR empty array
    let products = cart.products || [];

    //Find product in cart and update its quantity - check for both id and color
    let existingProduct = products.find(product => product._id === itemId && product.color === itemColor);
    if (existingProduct) {
        existingProduct.quantity = updatedQuantity;
    };

    //Update the products array in the cart
    cart.products = products;
    localStorage.setItem('cart', JSON.stringify(cart));

    //Update the total quantity and price if value is between 1 and 100
    if (updatedQuantity > 0 && updatedQuantity <= 100) {
        updateCartTotal();
    } else {
        setCustomValidity(message)
        //alert('La quantité devrait être entre 0 et 100');
    }
};

// Add event listener to each input field
const $itemQuantity = document.querySelectorAll('.itemQuantity');
$itemQuantity.forEach(input => {
    input.addEventListener('change', updateQuantity);
});


//--------------------------------------REMOVE ITEM-----------------------------------------------
//Function to delete item from cart and to delete item's HTML      
const removeItem = (event) => {
    let deleteBtn = event.target;
    const idToRemove = deleteBtn.closest('article');
  
    // extract id + color of the item to remove
    const itemId = idToRemove.getAttribute('data-id');
    const itemColor = idToRemove.getAttribute('data-color');

    // remove the item from the cart
    //cart.forEach(item => {console.log((item._id == itemId) && (item.color == itemColor), item._id, itemId, item.color, itemColor)});
    cart = cart.filter(item => item._id !== itemId || item.color !== itemColor);

    // update localStorage (convert JS object to a string)(value = object w/ a single property "products", that contains the cart array)
    localStorage.setItem('cart', JSON.stringify({'products': cart}));
  
    // remove the item's HTML from the page
    idToRemove.style.display = 'none';

    //Update the total quantity and price
    updateCartTotal();
};

//Add event listener to each Delete button
const $deleteBtn = document.querySelectorAll('.deleteItem');

$deleteBtn.forEach(button => {
    button.addEventListener('click', removeItem);
});

//---------------------------CALCULATE TOTAL QUANTITY & PRICE-------------------------------------------------

// Total quantity and price function
const updateCartTotal = () => {
    const $totalQuantity = document.querySelector('#totalQuantity');
    const $totalPrice = document.querySelector('#totalPrice');
  
    // Retrieve the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart'));
    let products = cart.products;
  
    // Initialize variables for total quantity and price
    // (must be given a value before putting in loop otherwise => NaN)
    let totalQuantity = 0;
    let totalPrice = 0;
  
    // Get prices for the products in the cart
    products = getPricesForProducts(products);
    // Loop through each product in the cart and sum up the quantities and prices
    products.forEach(product => {
      totalQuantity += parseInt(product.quantity);
      totalPrice += product.price * parseInt(product.quantity);
    });
  
    // Update the HTML content of the total quantity and price elements
    $totalQuantity.textContent = totalQuantity;
    $totalPrice.textContent = totalPrice;
};
updateCartTotal();

//------------------------------------CONTACT FORM-------------------------------------------------

/* Retrieve user input and analyse
Error message if needed (type of value not matching)
Create "contact" object and [{products}] array
-isNaN() returns true if input is not a number, false if it is a number
Initialize variables for each input field, retrieve user input*/

// Verify user input
const verifyUserInput = (event) => {
    event.preventDefault();
    const regexNaN = /\d/;
    //first name
    const firstNameInput = document.querySelector('#firstName');
    let firstName = firstNameInput.value;

    if (regexNaN.test(firstName)) {
        firstNameInput.setCustomValidity("Veuillez vérifier votre réponse")
        firstNameInput.reportValidity();
    } else {
        firstNameInput.setCustomValidity('');
    };

    /*
    if (!isNaN(firstName)) {
        setCustomValidity(message)
        //alert('Merci de vérifier vos réponses');
      } else {
        firstName = firstNameInput.value;
      }
    */

    //last name
    const lastNameInput = document.querySelector('#lastName');
    let lastName = lastNameInput.value;
    if (!isNaN(lastName)) {
        alert('Merci de vérifier vos réponses');
      } else {
        lastName = lastNameInput.value;
      }

    //address
    const addressInput = document.querySelector('#address');
    let address = addressInput.value;

    //city
    const cityInput = document.querySelector('#city');
    let city = cityInput.value;
    if (!isNaN(city)) {
        alert('Merci de vérifier vos réponses');
      } else {
        city = cityInput.value;
      }
    
    //email
    const emailInput = document.querySelector('#email');
    let email = emailInput.value;
    //if (!email.checkValidity());

    // Update contact object with input values
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.address = address;
    contact.city = city;
    contact.email = email;
};

// Add event listener to Form (not button, because only form can be submitted)
let form = document.querySelector('.cart__order__form');
form.addEventListener('submit', (event) => {
    verifyUserInput(event);
    const products = getProductIds(cart);
    submitOrder(contact, products);
});

//---------------------------CREATE COMMAND-----------------------------------------------------------

// Create contact object
let contact = {
    firstName: '',
    lastName: '',
    city: '',
    address: '',
    email: ''
};

// Create array of productIDs => from each item in LS cart, add _id.
const getProductIds = (cart) => {
    const productIds = [];
    cart.forEach(item => {
        // Add the product ID to the productIds array
        productIds.push(item._id);
    });
    return productIds;
};


// update products (so they only contain id)
products = getProductIds(cart);

//POST - fetch API request
const submitOrder = (contact, products) => {
    fetch('http://localhost:3000/API/products/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contact, products }) //send object to back end to get an orderId
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      const orderId = data.orderId;
      //console.log(orderId);

      // Check if orderId is defined
      if (orderId) {
        // Create a new URL with orderId as parameter
        /*URL = constructor
        takes two arguments: 'url' and 'baseURL'
        */
        const confirmationUrl = new URL('/front/html/confirmation.html', window.location.origin);
        confirmationUrl.searchParams.append('orderId', orderId);
        // Redirect to confirmation page
        window.location.href = confirmationUrl.href;
      } else {
        // Handle case where orderId is not defined
        console.error('Error: Order ID not defined');
      }
    });
  };
  submitOrder();
//tests
//console.log(products, contact);