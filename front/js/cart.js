//info to reach API
const cartUrl = '';

//fetch API
fetch(cartUrl)
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