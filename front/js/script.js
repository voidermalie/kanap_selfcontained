//info to reach API
const indexUrl = 'http://localhost:3000/API/products';

// fetch API
fetch(indexUrl)
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error ('Request failed!');
    }
})
.then(data => {
    console.log(data);
    displayProducts(data);
})
.catch((error) => console.error("FETCH ERROR:", error));


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

const getProduct = (data) => {
    data.forEach(product => {
        /*
        const productLink = 'http://127.0.0.1:5500/front/html/product.html?id=' + product._id;
        a.href = productLink;
        */
        //const indexLink = 'http://127.0.0.1:5500/front/html';

       let indexLink = window.location.href;
       let productLink = indexLink + '/product.html?id=' + product._id;
       let url = new URL(productLink);
       let productPage = url.searchParams.get('productPage');
       a.href = productPage;
    })
}

//returns product on product page
//contact, order
//nouveau fichier js ou ici?

