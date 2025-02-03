// Import Firestore and Storage from firebase.js
import { db, storage } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

document.getElementById("sellForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let category = document.getElementById("category").value;
    let productName = document.getElementById("productName").value;
    let price = document.getElementById("price").value;
    let city = document.getElementById("city").value;
    let contact = document.getElementById("contact").value;
    let imageFile = document.getElementById("image").files[0];

    if (!imageFile) {
        alert("❌ Please select an image before posting!");
        return;
    }

    try {
        // ✅ Correctly reference the storage location for the image
        let storageRef = ref(storage, `products/${imageFile.name}`);

        // ✅ Upload image to Firebase Storage
        let uploadTask = await uploadBytes(storageRef, imageFile);

        // ✅ Get image URL after upload
        let imageURL = await getDownloadURL(storageRef);

        // ✅ Add product details to Firestore
        await addDoc(collection(db, "products"), {
            category, productName, price, city, contact, image: imageURL
        });

        // ✅ Success message and reset form
        alert("✅ Product successfully posted!");
        document.getElementById("sellForm").reset();

        // ✅ Redirect back to home page
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);

    } catch (error) {
        alert("❌ Error posting product: " + error.message);
    }
});
