async function loadProducts() {
    let productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "<p>Loading products...</p>";

    try {
        let querySnapshot = await getDocs(collection(db, "products"));
        productsDiv.innerHTML = "";

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

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function viewImage(imageUrl) {
    window.open(imageUrl, "_blank");
}

window.onload = loadProducts;
