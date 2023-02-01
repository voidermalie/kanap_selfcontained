/*
const getCart = () => {
    let cart = localStorage.getItem('cart')
    if (cart === null){
        return [];
    }else{
        return JSON.parse(cart)
    }
};
getCart(cart);
*/

//Mission:
//Depuis la page Panier, récupérer le panier (l’array) via localStorage.
// Parcourir l’array.
// Créer et insérer des éléments dans la page Panier.

//get cart via localStorage / global variables
let cart = JSON.parse(localStorage.getItem('cart'));
let products = JSON.parse(cart).products
let cartItem = document.querySelector('#cart__items');


//display cart from localStorage
const displayCart = (cart) => {
    cart.forEach(c => {
        //render to HTML
        //article -> 2 divs => div1=img + div2=cartItemContent
        //cartItemContent -> 2 divs => div1=description + div2=settings
        //description -> h2 (productName), p (color), p (price)
        //settings -> 2 divs => div1=quantity(p, input) + div2=delete(p)
        const article = document.createElement('article');
        cartItem.appendChild(article);
        article.classList.add('cart__item');
        //data-id="{product-ID}" data-color="{product-color}" ??????????????????
        //img (Div1)
        const imgDiv = document.createElement('div');
        article.appendChild(imgDiv);
        const img = document.createElement('img');
        imgDiv.appendChild(img);
        let productImage = product.imageUrl;
        img.src = productImage;
        img.alt = product.altTxt;
        //cartItemContent (Div2)
        const itemDiv = document.createElement('div');
        article.appendChild(itemDiv);
        itemDiv.classList.add('cart__item__content');
        //div1
        const descriptionDiv = document.createElement('div');
        itemDiv.appendChild(descriptionDiv);
        descriptionDiv.classList.add('cart__item__content__description');
        //h2 (product name)
        const productName = document.createElement('h2');
        descriptionDiv.appendChild(productName);
        productName.textContent = products['_name'];
        //p (color)
        const productColor = document.createElement('p')
        descriptionDiv.appendChild(productColor);
        productColor.textContent = color; //?????
        //p (price)
        const productPrice = document.createElement('p');
        descriptionDiv.appendChild(productPrice);
        productPrice.textContent = `${productOption.p} €`; //?????
        //div2
        const settingsDiv = document.createElement('div');
        itemDiv.appendChild(settingsDiv);
        settingsDiv.classList.add('cart__item__content__settings');
        //settings-div1
        const quantityDiv = document.createElement('div');
        settingsDiv.appendChild(quantityDiv);
        quantityDiv.classList.add('cart__item__content__settings__quantity');
        //p
        const quantityItem = document.createElement('p');
        quantityDiv.appendChild(quantityItem);
        quantityItem.textContent = `Qté : ${productOption.q}` //???
        //input
        
        //settings-div2
        const deleteDiv = document.createElement('div');
        settingsDiv.appendChild(deleteDiv);
        deleteDiv.classList.add('cart__item__content__settings__delete');
        //p
        const deleteItem = document.createElement('p');
        deleteDiv.appendChild(deleteItem);
        deleteItem.classList.add('deleteItem');
        deleteItem.textContent = "Supprimer";
    });
};
displayCart(cart);