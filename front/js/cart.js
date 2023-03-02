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
    event.preventDefault();
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
    if (existingProduct && updatedQuantity > 0 && updatedQuantity <= 100) {
        existingProduct.quantity = updatedQuantity;
        cart.products = products;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
    } else {
        alert("Veuillez sélectionner une valeur entre 0 et 100")
        /*
        const errorMessage = "La quantité devrait être entre 0 et 100";
        $input.setCustomValidity(errorMessage);
        $input.reportValidity();
        */
    }
};

// Add event listener to each input field
const $itemQuantity = document.querySelectorAll('.itemQuantity');

$itemQuantity.forEach(input => {
    input.addEventListener('change', updateQuantity);
});


//--------------------------------------REMOVE ITEM-----------------------------------------------
// Function to delete item from cart and to delete item's HTML      
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

// Add event listener to each Delete button
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

    // Regexes
    const nameRegex = /^[a-zA-Z ]+$/;
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorMessage = "Veuillez vérifier votre réponse"

    // First name
    const $firstName = document.querySelector('#firstName');

    if (!nameRegex.test($firstName.value)) {
        $firstName.setCustomValidity(errorMessage);
        $firstName.reportValidity();

        // add event listener to clear custom validity when input is valid (after being invalid)
        $firstName.addEventListener('input', () => {
            if (nameRegex.test($firstName.value)) {
                $firstName.setCustomValidity('');
            }
        });
        return;
    } else {
        $firstName.setCustomValidity('');
    };

    // Last name
    const $lastName = document.querySelector('#lastName');

    if (!nameRegex.test($lastName.value)) {
        $lastName.setCustomValidity(errorMessage);
        $lastName.reportValidity();
        $lastName.addEventListener('input', () => {
            if (nameRegex.test($lastName.value)) {
                $lastName.setCustomValidity('');
            }
        });
        return;
    } else {
        $lastName.setCustomValidity('');
    };

    // Address
    const $address = document.querySelector('#address');
    if (!addressRegex.test($address.value)){
        $address.setCustomValidity(errorMessage);
        $address.reportValidity();
        $address.addEventListener('input', () => {
            if (addressRegex.test($address.value)) {
                $address.setCustomValidity('');
            }
        });
        return;
    } else {
        $address.setCustomValidity('');
    };

    // City
    const $city = document.querySelector('#city');
    if (!nameRegex.test($city.value)) {
        $city.setCustomValidity(errorMessage);
        $city.reportValidity();
        $city.addEventListener('input', () => {
            if (nameRegex.test($city.value)) {
                $city.setCustomValidity(''); 
            }
        });
        return;
    } else {
        $city.setCustomValidity('');
    };
    
    // Email
    const $email = document.querySelector('#email');
    if (!emailRegex.test($email.value)) {
        $email.setCustomValidity(errorMessage);
        $email.reportValidity();
        $email.addEventListener('input', () => {
            if (emailRegex.test($email.value)) {
                $email.setCustomValidity('');
            }
        });
        return;
    } else {
        $email.setCustomValidity('');
    };

    // Update contact object with input values
    contact.firstName = $firstName.value;
    contact.lastName = $lastName.value;
    contact.address = $address.value;
    contact.city = $city.value;
    contact.email = $email.value; 

    // Submit order
    const products = getProductIds(cart);
    submitOrder(contact, products);

    // reset the form to clear input fields and any validation errors
    //event.target.reset();
};

// Add event listener to Form (not button, because only form can be submitted)
let $form = document.querySelector('.cart__order__form');
$form.addEventListener('submit', verifyUserInput);


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


// Update products (so they only contain id)
products = getProductIds(cart);

//POST - fetch API request
const submitOrder = (contact, products) => {
    fetch('http://localhost:3000/API/products/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contact, products }) //send object to back end
    })
    .then(response => response.json()) //response in json
    .then(data => {                    //data=parameter=json response to be converted to JS object
      //console.log(data);
      const orderId = data.orderId;
      //console.log(orderId);

      // Check if orderId is defined
      if (orderId) {
        // Create a new URL with orderId as parameter
        /*URL = constructor
        takes two arguments: 'url' and 'baseURL'
        */
        const confirmationUrl = new URL('./confirmation.html', window.location.origin);
        confirmationUrl.searchParams.append('orderId', orderId);
        // Redirect to confirmation page
        window.location.href = confirmationUrl.href;
        localStorage.clear();
      } else {
        // Handle case where orderId is not defined
        console.error('Error: Order ID not defined');
      }
    });
  };
  submitOrder();
//tests
//console.log(products, contact);