//get all products from API
import { getProducts } from "./api.js";
let productsApi = await getProducts();

//get cart from LocalStorage
const getCart = () => {
    let cart = localStorage.getItem('cart')
    if (cart === null) {
        return [];
    } else {
        return JSON.parse(cart).products
    }
};

//1. we have two arrays
//1st array = localStorage = cart = [{},{},{} ...]
let cart = getCart(); 
console.log(cart);
//2nd array = all products = productsApi = [{product}, {product}, ...]
console.log(productsApi);

//how to get object.property
// console.log(productsApi[0].price)

//2. get price  = extract object property value from array
/*
const getPrice = (products) => {
    //for (let i = 0; i < products.lenght; i++);
    products.forEach(product => {
    let price = product[i].price;
    });
};
getPrice(productsApi);
console.log(price)


productsApi.forEach(productApi => {
    let price = productApi.price;
});

//for each product from cart array, add price property equal to productsAPI price
cart.forEach(product => {
    product.price = productsApi.price;
    //console.log(product.price)
});
*/

//Frédéric:
const getPricesForProducts = (products) => {
    //let productsAPI = getProducts()
    products.forEach(product => {
        // trouve le produit retourné par l'API
        // ajoute le prix du produit dans l'objet
        let productApi = productsApi.find(p => p._id === product._id)
        product.price = productApi.price
    });
    return products
};

let products = getPricesForProducts(cart);


// -----------------------------Display a list of products on the page----------------------------
//(products) is a property, then when we call the function later, we pass (cart) as an argument
//well now we pass (products) again because of getpricesforproducts...
const displayCart = (products) => {
    let $cartItem = document.querySelector('#cart__items');
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
        $productPrice.textContent = `${product.price} €`; //?????
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
        //$quantityItem.textContent = `Qté : ${product.quantity}`;
        //<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        const $input = document.createElement('input');
        $input.type = 'number';
        $input.classList.add('itemQuantity');
        $input.name = 'itemQuantity';
        $input.min = '1';
        $input.max = '100';
        $input.value = product.quantity;
        $quantityDiv.appendChild($input);
        // console.log(product.price);
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
//if (this.value)
};


const $itemQuantity = document.querySelector('.itemQuantity');
$itemQuantity.addEventListener('change', updateQuantity);



//--------------------------------------REMOVE ITEM-----------------------------------------------

//     delete item from cart          and          delete html display      

const handleClick = (event) => {
    window.localStorage.removeItem('product')
    //and
    //model: (`[data-id="box1"]`)
    let $itemToDelete = document.querySelector(`[data-id="${this._id}"]`);
};

const $deleteBtn = document.querySelector('.deleteItem');
$deleteBtn.addEventListener('click', handleClick);

//---------------------------CALCULATE TOTAL QUANTITY & PRICE-------------------------------------------------
//guess can't do before treating quantity change
//lenght of cart = total quantity

const $totalQuantity = document.querySelector('#totalQuantity');
const $totalPrice = document.querySelector('#totalPrice');