import { initializeCart, addToCart } from '/no_bs_e_commerce/modules/cart.js';

const gridContainer = document.querySelector(".all-item-grid");
const swiperContainer = document.querySelector(".swiper-wrapper");
const GRID_ITEM_AMOUNT = 14;
const SWIPER_ITEM_AMOUNT = 10;
const HB_HEADLINE = 'Stay sharp!'; //hero banner headline
const HB_SUBTEXT = 'Experience the amazing products.' //hero banner subtext;
const HB_CTA_BTN = 'Buy Now!'; //hero banner subtext;
const INFO_BANNER_HEADLINE = 'Sale ends at: ';
const COUNT_TO_DATE = new Date("March 18, 2025 11:10:25").getTime();

const REGULAR_ITEM_HTML = (product) => {
    return `
        <img src="${product.image}" class="item-image">
        <h6 class="container-fluid">${product.title}</h6>
        <span class="me-4"><strong>${product.price}$</strong></span>
    `;
}

function populateHeroBanner(headline, subtext, ctaText){
    let heroBannerContainer = document.querySelector('.hero-banner');
    heroBannerContainer.innerHTML = `
                <h2>${headline}</h2>
                <p>${subtext}</p>
                <button class='btn btn-light'>${ctaText}</button>
        `;
}

function populateInfoBanner(headline){
    let infoBannerContainer = document.querySelector('.info-banner-headline');
    let infoBannerCounter = document.querySelector('.counter');
    infoBannerContainer.innerHTML = headline;
    timer(infoBannerCounter, COUNT_TO_DATE);
}

function timer(banner, countDownDate){
    // Update the count down every 1 second
    let x = setInterval(function() {
        // Get today's date and time
        let now = new Date().getTime();
        // Find the distance between now and the count down date
        let distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Setting the timer's HTML
        banner.innerHTML = `<span><strong>${days} days ${hours} hours ${minutes} minutes ${seconds} seconds</strong></span>`;

}, 1000);
}

function populateItems(productsArr, amount, className, container) {
    for (let i = 0; i <= amount; i++) {
        let newItem = document.createElement('div');
        let addToCartBtn = document.createElement('button');
        addToCartBtn.setAttribute('class', 'btn btn-success add-to-cart-btn');
        addToCartBtn.textContent = 'Add to cart';
        addToCartBtn.addEventListener('click', () => {
            addToCart(productsArr[i]);
        });
        newItem.setAttribute('class', `${className} card card-body flex-row flex-wrap align-items-center d-flex justify-content-center align-items-center`);
        newItem.innerHTML = REGULAR_ITEM_HTML(productsArr[i]);
        newItem.appendChild(addToCartBtn);
        container.appendChild(newItem);
    }
}

function init(){
    const getProducts = fetch('https://fakestoreapi.com/products')
                .then(res=>res.json())
                .then(json=> {return json});
    
    getProducts.then(productsArr => {
        console.log(productsArr);
        // toggleCart();
        initializeCart();
        populateInfoBanner(INFO_BANNER_HEADLINE);
        populateHeroBanner(HB_HEADLINE, HB_SUBTEXT, HB_CTA_BTN);
        //populate swiper
        populateItems(productsArr, SWIPER_ITEM_AMOUNT, 'swiper-slide', swiperContainer)
        const swiper = new Swiper('.swiper', {
            direction: 'horizontal',
            loop: true,
            centeredSlides: true,
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          });
        //populate grid
        populateItems(productsArr, GRID_ITEM_AMOUNT, 'grid-item', gridContainer);
    })
}

init();

// TO-DO:

    // maybe make add-to-cart icon change with items added (at least on icon with a notification circle)
    
    // make responsive for Mobile