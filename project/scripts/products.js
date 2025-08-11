export async function loadProducts(limit = null) {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        let products = data.products;

        // Limit products if on homepage
        if (limit) {
            products = products.slice(0, limit);
        }

        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            card.innerHTML = `
                <img src="${product.image}" alt="${product.imageAlt}" width="300" height="200" loading="lazy">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="card-actions">
                    <span class="price"><strong>$${product.price.toFixed(2)}</strong></span>
                    ${
                        limit
                            ? `<a href="shop.html" class="btn see-in-shop">See in Shop</a>`
                            : `<button class="btn add-to-cart">Add to Cart</button>`
                    }
                </div>
            `;

            productGrid.appendChild(card);

            // Attach Add to Cart event if in shop page
            if (!limit) {
                const addBtn = card.querySelector('.add-to-cart');
                addBtn.addEventListener('click', () => {
                    if (typeof addToCart === 'function') {
                        addToCart(product);
                    } else {
                        console.error('addToCart() is not available.');
                    }
                });
            }
        });

    } catch (error) {
        console.error('Error loading products:', error);
    }
}
