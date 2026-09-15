let products = [];

function addProduct() {

    let productName = document.getElementById("productName").value;
    let price = document.getElementById("price").value;
    let category = document.getElementById("category").value;

    let product = {
        productName: productName,
        price: price,
        category: category
    };

    products.push(product);


    let container = document.getElementById("productContainer");

    container.innerHTML = "";

    products.forEach(function(product) {

        let card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.productName}</h3>
            <p>Price: ₹${product.price}</p>
            <p>Category: ${product.category}</p>
        `;

        container.appendChild(card);
    });
    
    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
}