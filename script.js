/// Function to check Internet Connection
function checkConnection() {
    let loadingScreen = document.getElementById("loading");
    let optionScreen = document.getElementById("options");

    function updateStatus() {
        if (navigator.onLine) {
            loadingScreen.style.display = "none";
            optionScreen.style.display = "block";
        } else {
            loadingScreen.innerHTML = "No Internet Connection. Please check your network.";
            optionScreen.style.display = "none";
        }
    }

    // Check connection every 2 seconds
    setInterval(updateStatus, 2000);

    // Initial Check
    updateStatus();
}

// Call checkConnection() when page loads
document.addEventListener("DOMContentLoaded", checkConnection);

// Navigate Between Pages
function goTo(page) {
    window.location.href = page;
}

// Handle Product Submission (Sell Page)
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("sellForm")) {
        document.getElementById("sellForm").addEventListener("submit", function (e) {
            e.preventDefault();

            let category = document.getElementById("category").value;
            let productName = document.getElementById("productName").value;
            let price = parseInt(document.getElementById("price").value);
            let city = document.getElementById("city").value;
            let contact = document.getElementById("contact").value;
            let imageFile = document.getElementById("productImage").files[0];

            if (!imageFile) {
                alert("Please upload an image!");
                return;
            }

            let reader = new FileReader();
            reader.onload = function () {
                let product = {
                    category,
                    productName,
                    price,
                    city,
                    contact,
                    image: reader.result
                };

                let products = JSON.parse(localStorage.getItem("products")) || [];
                products.push(product);
                localStorage.setItem("products", JSON.stringify(products));

                document.getElementById("sellForm").reset();
                alert("Successfully Posted!");
            };

            reader.readAsDataURL(imageFile);
        });
    }

    // Load Products in Buy Page
    if (document.getElementById("productList")) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        displayProducts(products);

        // Apply filters
        document.getElementById("categoryFilter").addEventListener("change", applyFilters);
        document.getElementById("priceFilter").addEventListener("change", applyFilters);
    }
});

// Apply Filters (Category & Price)
function applyFilters() {
    let selectedCategory = document.getElementById("categoryFilter").value;
    let selectedPriceRange = document.getElementById("priceFilter").value;
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let filteredProducts = products.filter(p => {
        let inCategory = selectedCategory === "all" || p.category === selectedCategory;
        let inPriceRange = selectedPriceRange === "all" || priceInRange(p.price, selectedPriceRange);
        return inCategory && inPriceRange;
    });

    displayProducts(filteredProducts);
}

// Check if Price Falls in Selected Range
function priceInRange(price, range) {
    let [min, max] = range.split("-").map(Number);
    return price >= min && price <= max;
}

// Display Products on Buy Page
function displayProducts(products) {
    let productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        let div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.productName}">
            <p><strong>${product.productName}</strong></p>
            <p>Price: ${product.price}</p>
            <p>City: ${product.city}</p>
            <p>Contact: ${product.contact}</p>
        `;
        productList.appendChild(div);
    });
}

// Logout Function
function logout() {
    alert("You have logged out!");
    window.location.href = "index.html";
}