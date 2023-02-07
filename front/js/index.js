import { getProducts } from "./api.js";
const products = await getProducts();


//function for rendering to html (a,article,h3,img,p)
const displayProducts = (data) => {
    const $productDiv = document.getElementById('items');
    data.forEach(product => {
        //link
        const $a = document.createElement('a');
        $a.href = 'http://127.0.0.1:5500/front/html/product.html?id=' + product._id;
        $productDiv.appendChild($a);
        //article (card)
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