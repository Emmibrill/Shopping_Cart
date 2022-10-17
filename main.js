let  cartIcon = document.querySelector("#cart__icon");
let cart = document.querySelector('.cart');
let closecart = document.querySelector('#close__cart');


cartIcon.addEventListener('click', () => {
    cart.classList.add('showCart')
})
closecart.onclick = () =>{
    cart.classList.remove('showCart')
}

if(document.readyState = "loading"){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
    updateTotal()
}

function ready(){
    let removeCartButton = document.getElementsByClassName('fa-trash');
    console.log(removeCartButton);
    for(let i = 0; i < removeCartButton.length; i++){
        let eachButton = removeCartButton[i];
        eachButton.addEventListener('click', removeCartContent);
    }

    let inputForQuantity = document.getElementsByClassName('cart__quantity');
    for (let i = 0; i < inputForQuantity.length; i++){
        let input = inputForQuantity[i];
        input.addEventListener('change', changeQuantity);
    }

    let addClickedCart = document.getElementsByClassName('fa-cart-plus')
    for(let i = 0; i < addClickedCart.length; i++){
        let button = addClickedCart[i]
        button.addEventListener('click', addToCart)
    }

    document.getElementsByClassName('cart-buy__button')[0].addEventListener('click', CartButtonPlaceOrder)
}
//hover effect on product box
let productBox = document.getElementsByClassName('product__box')
Array.from(productBox).forEach(box =>{
    box.addEventListener('click', (e) => {
        addActive(e.currentTarget)
    })
})
function addActive(theChild){
    Array.from(productBox).forEach(box => {
        if(box == theChild){
            box.classList.add('active')
        } else{box.classList.remove('active')}
    })
}

//cart button place order
function CartButtonPlaceOrder(){
    let cartContent = document.getElementsByClassName('cart__content')[0];
    if(cartContent.hasChildNodes()){
        alert('Your order will be placed, are you sure?')
        while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    } else{alert('no order has been placed yet')
    return;
}
    
    updateTotal()
}

function removeCartContent(Event) {
    let clickeButton = Event.target;
    clickeButton.parentElement.remove();
    updateTotal()
}

function changeQuantity(Event){
    let input = Event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal()
}

//add product from shop to cart
function addToCart(Event){
    let button = Event.target;
    let shopProducts = button.parentElement;
    let cartTitle = shopProducts.getElementsByClassName('product__title')[0].innerHTML;
    let cartPrice = shopProducts.getElementsByClassName('product__price')[0].innerHTML;
    let cartProductImage = shopProducts.getElementsByClassName('product__image')[0].src;
    addSelectedToCart(cartTitle, cartPrice, cartProductImage);
    updateTotal()
}
function addSelectedToCart(cartTitle, cartPrice, cartProductImage){
    let cartContentBox = document.createElement('div');
    cartContentBox.classList.add('cart__box');
    let getCartItems = document.getElementsByClassName('cart__content')[0];
    let cartItemNames = getCartItems.getElementsByClassName('cart-product__title');
    let inner = cartItemNames
    console.log(inner)
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerHTML == cartTitle) {
            alert("already added to cart");
            return;
        }
    }
    let cartContentBox_content = `
    <img src="${cartProductImage}" class="cart__image" alt="">
    <div class="cart-product__details">
        <h2 class="cart-product__title">${cartTitle}</h2>
        <div class="cart__price">${cartPrice}</div>
        <input type="number" value="1" class="cart__quantity">
    </div>
    <i class="fa-solid fa-trash"></i>`;
    
    cartContentBox.innerHTML = cartContentBox_content;
    getCartItems.append(cartContentBox);
    cartContentBox.getElementsByClassName('fa-trash')[0].addEventListener('click', removeCartContent);
    cartContentBox.getElementsByClassName('cart__quantity')[0].addEventListener('change', changeQuantity);

}

//update total amount on cart
function updateTotal(){
    let cartContent = document.getElementsByClassName('cart__content')[0];
    let cartBoxs = cartContent.getElementsByClassName('cart__box');
    let total = 0;
    for (let i = 0; i < cartBoxs.length; i++ ){
    let cartBox = cartBoxs[i]
    let priceElement = cartBox.getElementsByClassName('cart__price')[0];
    let quantityElement = cartBox.getElementsByClassName('cart__quantity')[0];
    let price = parseFloat(priceElement.innerText.replace('$', ''));
    let quantity = quantityElement.value;
    total = total + (quantity * price);
    }
    
    //get all decimal tofix(2)
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('cart-total__price')[0].innerHTML = '$' + total;
    
}