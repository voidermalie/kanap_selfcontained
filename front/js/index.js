import { getProducts } from "./api.js";
const products = await getProducts();


//function for rendering to html (a,article,h3,img,p)
const displayProducts = (data) => {
    const productDiv = document.getElementById('items');
    data.forEach(product => {
        //link
        const a = document.createElement('a');
        const productLink = window.location.href + '/product.html?id=' + product._id;
        a.href = productLink;
        productDiv.appendChild(a);
        //article (card)
        const article = document.createElement('article')
        a.appendChild(article);
        //title
        const title = document.createElement('h3')
        const productName = product.name
        article.appendChild(title);
        title.textContent = product.name;
        //image
        const img = document.createElement('img')
        const productImage = product.imageUrl;
        article.appendChild(img);
        img.src = productImage;
        img.alt = product.altTxt;
        //description
        const p = document.createElement('p');
        const productDescription = product.description;
        p.textContent = product.description;
        article.appendChild(p);
    })
};

displayProducts(products);

//returns product on product page
//contact, order

