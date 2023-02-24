import { getProducts } from "./api.js";
const products = await getProducts();


// Render each product as HTML (a,article,h3,img,p)
const displayProducts = (products) => {
    const $productDiv = document.getElementById('items');
    products.forEach(product => {
        //link
        const $a = document.createElement('a');
        const productLink = `${window.location.origin}/front/html/product.html?id=${product._id}`;
        $a.href = productLink;
        //$a.href = 'http://127.0.0.1:5500/front/html/product.html?id=' + product._id;
        $productDiv.appendChild($a);
        //article
        const $article = document.createElement('article')
        $a.appendChild($article);
        //title
        const $title = document.createElement('h3')
        $title.textContent = product.name;
        $article.appendChild($title);
        //image
        const $img = document.createElement('img')
        $img.src = product.imageUrl;
        $img.alt = product.altTxt;
        $article.appendChild($img);
        //description
        const $p = document.createElement('p');
        $p.textContent = product.description;
        $article.appendChild($p);
    })
};

displayProducts(products);