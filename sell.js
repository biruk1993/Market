document.getElementById("sellForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let category = document.getElementById("category").value;
    let productName = document.getElementById("productName").value;
    let price = document.getElementById("price").value;
    let city = document.getElementById("city").value;
    let contact = document.getElementById("contact").value;
    let imageFile = document.getElementById("image").files[0];

    try {
        let storageRef = ref(storage, 'products/' + imageFile.name);
        await uploadBytes(storageRef, imageFile);
        let imageURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, "products"), {
            category, productName, price, city, contact, image: imageURL
        });

        alert("✅ Product successfully posted!");
        document.getElementById("sellForm").reset();
        window.location.href = "index.html";
    } catch (error) {
        alert("❌ Error posting product: " + error.message);
    }
});
