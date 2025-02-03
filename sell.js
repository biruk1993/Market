document.getElementById("sellForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let category = document.getElementById("category").value;
    let productName = document.getElementById("productName").value;
    let price = document.getElementById("price").value;
    let city = document.getElementById("city").value;
    let contact = document.getElementById("contact").value;
    let imageFile = document.getElementById("image").files[0];

    let storageRef = storage.ref('products/' + imageFile.name);
    let uploadTask = await storageRef.put(imageFile);
    let imageURL = await uploadTask.ref.getDownloadURL();

    await db.collection("products").add({
        category, productName, price, city, contact, image: imageURL
    });

    alert("Product successfully posted!");
    document.getElementById("sellForm").reset();
});



