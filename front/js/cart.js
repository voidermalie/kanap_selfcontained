const getCart = () => {
    let cart = localStorage.getItem("cart")
    if (cart === null){
        return [];
    }else{
        return JSON.parse(cart)
    }
};
getCart();
let products = JSON.parse(localStorage.getItem('products'));

//function render HTML template
const makeCartHtmlTemplate = (cart) => {
    const templates = [];
    let cartItems = document.querySelector('#cart__items');
    cart.forEach(cartItem => {

    });
};

//display cart in localStorage
const displayCart = () => {
    products.forEach(products => {
        //render to HTML
        const article = document.createElement('article');
        cartItems.appendChild(article);
        article.classList.add('cart__item');
        const imgDiv = document.createElement('div');
        article.appendChild(imgDiv);
        imgDiv = productImage;
        const itemDiv = document.createElement('div');
        article.appendChild(itemDiv);
        itemDiv.classList.add('cart__item__content');
        const detailedItemDiv = document.createElement('div');
        itemDiv.appendChild(detailedItemDiv);
        detailedItemDiv.classList.add('cart__item__content__description');
        const productName = document.createElement('h2');
        detailedItemDiv.appendChild(productName);
        productName.textContent = products['_name'];
    });
};
displayCart();