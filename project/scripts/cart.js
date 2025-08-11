// ===== Cart State =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let lastFocusedElement;

// ===== Modal Elements =====
const cartBtn = document.querySelector('#cart-btn');
const cartModal = document.querySelector('#cart-modal');
const closeCartBtn = cartModal.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotalEl = document.querySelector('#cart-total');
const cartCountEl = document.querySelector('#cart-count');

// ===== Cart Functions =====
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.imageAlt}" width="50" height="50">
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button aria-label="Decrease quantity" onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button aria-label="Increase quantity" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    cartCountEl.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);

    saveCart();
}

function addToCart(product) {
    const existing = cart.find(item => item.title === product.title);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
}

window.changeQuantity = function (index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartDisplay();
};

// ===== Accessibility Functions =====
function trapFocus(modal) {
    const focusableEls = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableEls[0];
    const lastFocusable = focusableEls[focusableEls.length - 1];

    modal.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // backward
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else { // forward
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
        if (e.key === 'Escape') {
            closeCartModal();
        }
    });
}

function openCartModal() {
    lastFocusedElement = document.activeElement;
    cartModal.hidden = false;
    document.body.style.overflow = 'hidden';
    updateCartDisplay();
    trapFocus(cartModal);
    cartModal.querySelector('button, [href], input, select, textarea').focus();
}

function closeCartModal() {
    cartModal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

// ===== Event Listeners =====
cartBtn.addEventListener('click', e => {
    e.preventDefault();
    openCartModal();
});

closeCartBtn.addEventListener('click', closeCartModal);

// ===== Init =====
updateCartDisplay();
