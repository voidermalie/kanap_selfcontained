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
    let cartItem = document.querySelector('#cart__items');
    cart.forEach(cartItem => {

    });
};

//display cart in localStorage
const displayCart = (cart) => {
    products.forEach(products => {
        //render to HTML
        //article -> 2 divs => div1=img + div2=cartItemContent
        //cartItemContent -> 2 divs => div1=description + div2=settings
        //description -> h2 (productName), p (color), p (price)
        //settings -> 2 divs => div1=quantity(p, input) + div2=delete(p)
        const article = document.createElement('article');
        cartItem.appendChild(article);
        article.classList.add('cart__item');
        //img
        const imgDiv = document.createElement('div');
        article.appendChild(imgDiv);
        imgDiv = productImage;
        //cartItemContent
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
displayCart(cart);