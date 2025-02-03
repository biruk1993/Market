async function loadProducts() {
    let productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";

    let querySnapshot = await db.collection("products").get();
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        let productElement = `
            <div class="product">
                <img src="${data.image}" onclick="viewImage('${data.image}')">
                <h3>${data.productName}</h3>
                <p>Price: ${data.price}</p>
                <p>City: ${data.city}</p>
                <p>Contact: ${data.contact}</p>
            </div>
        `;
        productsDiv.innerHTML += productElement;
    });
}

function viewImage(imageUrl) {
    let newWindow = window.open();
    newWindow.document.write(`<img src="${imageUrl}" style="width:100%">`);
}

window.onload = loadProducts;

