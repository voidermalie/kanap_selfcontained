import { getProducts } from "./api.js";
const products = await getProducts();


//function for rendering to html (a,article,h3,img,p)
const displayProducts = (data) => {
    const productDiv = document.getElementById('items');
    data.forEach(product => {
        //link
        const a = document.createElement('a');
        const productLink = 'http://127.0.0.1:5500/front/html/product.html?id=' + product._id;
        a.href = productLink;
        productDiv.appendChild(a);
        //article (card)
        const article = document.createElement('article')
        a.appendChild(article);
        //title
        const title = document.createElement('h3')
        const productName = product.name
        article.appendChild(title);
        title.textContent = productName;
        //image
        const img = document.createElement('img')
        const productImage = product.imageUrl;
        article.appendChild(img);
        img.src = productImage;
        img.alt = product.altTxt;
        //description
        const p = document.createElement('p');
        const productDescription = product.description;
        p.textContent = productDescription;
        article.appendChild(p);
    })
};

displayProducts(products);

//why is it in the end

