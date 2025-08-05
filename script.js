const names = document.querySelectorAll(".hero__cards-card-description-name");
const categorys = document.querySelectorAll(".hero__cards-card-description-category");
const prices = document.querySelectorAll(".hero__cards-card-description-price");
const images = document.querySelectorAll(".hero__cards-card-img-image");
const buttons = document.querySelectorAll(".hero__cards-card-img-button");

fetch("data.json")
    .then(response => response.json())
    .then(jsonData => {for (let i = 0; i < names.length; i++){
    names[i].textContent = jsonData[i].name;
    categorys[i].textContent = jsonData[i].category;
    prices[i].textContent = `$${jsonData[i].price.toFixed(2)}`;
    images[i].src = jsonData[i].image.tablet;
};
});

buttons.forEach((button) => {
    button.addEventListener("click", addCart);
});

function addCart(e){
    const cartContent = document.querySelector(".cart__content");
    const count = document.querySelector(".cart__count");
    if(count.textContent = "0") {
        cartContent.innerHTML = "";
        count.textContent = "1";
    }
    let activeButton = e.target.closest(".hero__cards-card-img-button");
    newButton(activeButton);
    activeButton.classList.add("active");

    const buttonPlus = activeButton.querySelector(".plus");
    const buttonMinus = activeButton.querySelector(".minus");
    const activeButtonText = activeButton.querySelector(".button-text");

    buttonPlus.addEventListener("click", () => {
        activeButtonText.textContent = "5";
    });

    // const cartItem = document.createElement("div");
    // const cartItemContent = document.createElement("div");
    // const cartItemContentTitle = document.createElement("h6");
    // const cartItemContentDescription = document.createElement("div");
    // const cartItemContentDescriptionCount = document.createElement("p");
    // const cartItemContentDescriptionPrice = document.createElement("p");
    // const cartItemContentDescriptionAllprice = document.createElement("p");

    // cartItemContentDescription.appendChild(cartItemContentDescriptionCount);
    // cartItemContentDescription.appendChild(cartItemContentDescriptionPrice);
    // cartItemContentDescription.appendChild(cartItemContentDescriptionAllprice);
    // cartItemContent.appendChild(cartItemContentTitle);
    // cartItemContent.appendChild(cartItemContentDescription);
    // cartItem.appendChild(cartItemContent);

    // cartItem.className = "cart__content-card";

    
    // cartContent.appendChild(cartItem);

    
    
}

function newButton(activeButton){
    const minus = document.createElement("p");
    minus.textContent = "\u2014";
    minus.className = "active-button__value minus";

    const plus = document.createElement("p");
    plus.textContent = "+";
    plus.className = "active-button__value plus";

    const block = document.createElement("div");
    block.className = "active-button";
    const text = document.createElement("p");
    text.textContent = "1";
    text.className = "button-text"

    block.appendChild(minus);
    block.appendChild(text)
    block.appendChild(plus);

    activeButton.textContent = "";
    activeButton.appendChild(block);
}