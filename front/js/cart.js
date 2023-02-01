const getCart = () => {
    let cart = localStorage.getItem('cart')
    if (cart === null){
        return [];
    }else{
        return JSON.parse(cart).products
    }
};

// Appelle l'API et ajoute la propriété "price" à touts les produits de mon cart
const getPricesForProducts = (products) => {
    let productsAPI = getProducts()
    products.forEach(product => {
        // trouve le produit retourné par l'API
        // ajoute le prix du produit dans l'objet
        let productAPI = productsAPI.find(p => p._id == product._id)
        product.price = productAPI.price
    })
    return products
};

let cart = getCart();
let products = getPricesForProducts(cart);


//get cart via localStorage / global variables
let cartItem = document.querySelector('#cart__items');

// Display a list of products on the page
const displayCart = (products) => {
    products.forEach(product => {
        //render to HTML
        //article -> 2 divs => div1=img + div2=cartItemContent
        //cartItemContent -> 2 divs => div1=description + div2=settings
        //description -> h2 (productName), p (color), p (price)
        //settings -> 2 divs => div1=quantity(p, input) + div2=delete(p)
        const article = document.createElement('article');
        article.classList.add('cart__item');
        //data-id="{product-ID}" data-color="{product-color}" ??????????????????
        //img (Div1)
        const imgDiv = document.createElement('div');
        article.appendChild(imgDiv);
        const img = document.createElement('img');
        imgDiv.appendChild(img);
        img.setAttribute('src', product.img)
        // img.alt = product.altTxt;
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
        productName.textContent = product._name;
        //p (color)
        const $productColor = document.createElement('p')
        descriptionDiv.appendChild($productColor);
        $productColor.textContent = product.color; //?????
        //p (price)
        const productPrice = document.createElement('p');
        descriptionDiv.appendChild(productPrice);
        productPrice.textContent = `${product.price} €`; //?????
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
        quantityItem.textContent = `Qté : ${product.quantity}`;
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
        
        //pour update le DOM une fois quand tout est modifié
        cartItem.appendChild(article);
    });
};
displayCart(products);




/*
Récupère le Local Storage  ——>  ajoute les prix getPricesForProducts()  ——>  affiche les produits avec displayProducts()
           


*/