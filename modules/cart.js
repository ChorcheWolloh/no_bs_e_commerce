let cartArray = [];

export function initializeCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cart = document.querySelector('.cart');
    const cartList = document.querySelector('.cart-list');
    const cartTotalPrice = document.querySelector('.total-price');

    // Toggle cart visibility
    cartIcon.addEventListener('click', () => {
        cart.classList.add('open');
    });

    document.addEventListener('click', (event) => {
        const isClickInsideCart = cart.contains(event.target);
        const isClickOnCartIcon = cartIcon.contains(event.target);
        const isClickOnInteractiveElement =
            event.target.tagName === 'BUTTON' || event.target.closest('button') || event.target.closest('a');

        if (!isClickInsideCart && !isClickOnCartIcon && !isClickOnInteractiveElement) {
            cart.classList.remove('open');
        }
    });

    // Populate cart UI on load
    populateCart(cartList, cartTotalPrice);
}

export function addToCart(item) {
    let existingItem = cartArray.find(cartItem => cartItem.title === item.title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartArray.push({
            image: item.image,
            title: item.title,
            price: item.price,
            quantity: 1,
        });
    }

    updateCartUI();
}

export function removeCartItem(itemTitle) {
    cartArray = cartArray.filter(cartItem => cartItem.title !== itemTitle);
    updateCartUI();
}

function countTotalPrice() {
    return cartArray.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
}

function populateCart(cartList, cartTotalPrice) {
    cartList.innerHTML = ''; // Clear the cart
    cartArray.forEach(cartItem => {
        let newCartItem = document.createElement('div');
        let cartItemRemoveBtn = document.createElement('button');

        cartItemRemoveBtn.setAttribute('class', 'btn btn-danger');
        cartItemRemoveBtn.innerHTML = "Remove";
        cartItemRemoveBtn.addEventListener('click', () => {
            removeCartItem(cartItem.title); // Remove the item from the cart
        });

        newCartItem.setAttribute(
            'class',
            'cart-item m-3 d-flex justify-content-around align-items-center card card-body'
        );
        newCartItem.innerHTML = `
        <div class='d-flex flex-row align-items-center'>
            <h6 class="item-title">${cartItem.title}</h6>
            <div class="item-quantity me-2">
                <span>Quantity:${cartItem.quantity}</span>
            </div>
            <div class="item-price me-2">
                <span class="text-center">Price:$${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
            </div>
        </div>    
        `;
        newCartItem.appendChild(cartItemRemoveBtn);
        cartList.appendChild(newCartItem);
    });

    cartTotalPrice.textContent = `${countTotalPrice()}$`;
}

function updateCartUI() {
    const cartList = document.querySelector('.cart-list');
    const cartTotalPrice = document.querySelector('.total-price');
    populateCart(cartList, cartTotalPrice);
}
