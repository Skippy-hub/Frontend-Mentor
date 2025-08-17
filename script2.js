let products = [];
let arrData = [];
let cartItems = [];

let modalImg;
let modalAllPrice;
let modalTitle;
let modalCount;
let modalPrice;

async function telo(){
    
    await fetch("./data.json")
        .then(async response => await response.json())
        .then(async jsonData => {
            products = await jsonData;
            const container = document.querySelector(".container");
            const cardContainer = document.createElement("div");
            cardContainer.className = "hero__cards";
            for (let i = 0; i < jsonData.length; i++){
                cardContainer.innerHTML += `
                    <div class="hero__cards-card">
                        <div class="hero__cards-card-img">
                            <img class="hero__cards-card-img-image" src="${jsonData[i].image.tablet}" alt="">
                            <button class="hero__cards-card-img-button"><img src="./assets/images/icon-add-to-cart.svg" alt=""> Add to Cart</button>
                        </div>
                        <div class="hero__cards-card-description">
                            <p class="hero__cards-card-description-category">${jsonData[i].category}</p>
                            <h4 class="hero__cards-card-description-name">${jsonData[i].name}</h4>
                            <p class="hero__cards-card-description-price">$${jsonData[i].price.toFixed(2)}</p>
                        </div>
                    </div>
                `;
            };
            container.appendChild(cardContainer);
        }
    );



    const buttons = document.querySelectorAll(".hero__cards-card-img-button");

    buttons.forEach((button, idx) => {
        button.addEventListener("click", (e) => addCart(e, idx));
    });

    let countProducts = 0;
    const totalPrice = document.querySelector(".cart__finish-total-price");
    const count = document.querySelector(".cart__count");

    function addCart(e, idx){
        e.stopPropagation();

        let activeButton = e.target.closest(".hero__cards-card-img-button");
        
        if(e.target.classList.contains("button-text")){

        } else if(e.target.classList.contains("active-button")){

        }else if((!e.target.classList.contains("active"))){
            newButton(activeButton);
            activeButton.classList.add("active");

            const buttonPlus = activeButton.querySelector(".plus");
            const buttonMinus = activeButton.querySelector(".minus");
            const activeButtonText = activeButton.querySelector(".button-text");

            arrData[idx] = {
                "image": products[idx].image.thumbnail,
                "name": products[idx].name,
                "category": products[idx].category,
                "price": products[idx].price,
                "count": +activeButtonText.textContent,
                "fullPrice": +activeButtonText.textContent * products[idx].price
            }

            countProducts++;
            count.textContent = countProducts;

            buttonPlus.addEventListener("click", (e) => {
                e.stopPropagation();
                activeButtonText.textContent = +activeButtonText.textContent + 1;
                countProducts++;
                count.textContent = countProducts;
                arrData[idx].count++;
                arrData[idx].fullPrice = arrData[idx].count * arrData[idx].price;
                cartItems[idx].allPrice.textContent = `$${arrData[idx].fullPrice.toFixed(2)}`;
                cartItems[idx].count.textContent = arrData[idx].count + "x";
                totalPrice.textContent = "$" + finishPrice();
            });

            buttonMinus.addEventListener("click", (e) => {
                e.stopPropagation();
                if(+activeButtonText.textContent < 2){
                    activeButton.classList.remove("active");
                    activeButton.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt=""> Add to Cart';
                    countProducts--;
                    count.textContent = countProducts;

                    deleteCard(idx, totalPrice);

                    if(count.textContent == 0){
                        emptyCart();
                    }
                }else{
                    activeButtonText.textContent = +activeButtonText.textContent - 1;
                    countProducts--;
                    count.textContent = countProducts;
                    arrData[idx].count--;
                    cartItems[idx].count.textContent = arrData[idx].count + "x";
                    arrData[idx].fullPrice = arrData[idx].count * arrData[idx].price;
                    cartItems[idx].allPrice.textContent = `$${arrData[idx].fullPrice.toFixed(2)}`;
                    totalPrice.textContent = "$" + finishPrice();
                }
            });
            createCartItem(idx);
            totalPrice.textContent = "$" + finishPrice();
            
            if(!count.textContent == 0){
                const cartImg = document.querySelector(".cart__content-img");
                cartImg.style.cssText = "display: none";
                const cartText = document.querySelector(".cart__content-text");
                cartText.style.cssText = "display: none";
                const finishCart = document.querySelector(".cart__finish");
                finishCart.style.cssText = "display: block";
            }
        }
        
        cartItems[idx].close.addEventListener("click", () => {
            activeButton.classList.remove("active");
            activeButton.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt=""> Add to Cart';
            countProducts -= arrData[idx].count;
            count.textContent = countProducts;
            
            deleteCard(idx, totalPrice);

            if(count.textContent == 0){
                emptyCart();
            }
        });
    }

    const finishButton = document.querySelector(".cart__finish-button");
        
    finishButton.addEventListener("click", (e) => {

        document.body.classList.add("no-scroll");
        const modal = document.querySelector(".modal");
        modal.classList.remove("modal--hidden");
        
        const cards = document.querySelectorAll(".cart__content-card-content-title");
        
        for(let i = 0; i < arrData.length; i++){
            if(!arrData[i]) continue;
            for(let m = 0; m < cards.length; m++){
                if(cards[m].textContent == arrData[i].name){
                    createModal();
                    modalImg.src = arrData[i].image;
                    modalAllPrice.textContent = "$" + arrData[i].fullPrice.toFixed(2);
                    modalTitle.textContent = arrData[i].name;
                    modalCount.textContent = arrData[i].count + "x";
                    modalPrice.textContent = "@$" + arrData[i].price.toFixed(2);
                }
            }
        }

        // for(let i = 0; i < cards.length; i++){
        //     for(let m = 0; m < arrData.length; m++){
        //         if(!arrData[m]) continue;
        //         if(cards[i].textContent == arrData[m].name){
        //             createModal();
        //             modalImg.src = arrData[i].image;
        //             modalAllPrice.textContent = "$" + arrData[i].fullPrice.toFixed(2);
        //             modalTitle.textContent = arrData[i].name;
        //             modalCount.textContent = arrData[i].count + "x";
        //             modalPrice.textContent = "@$" + arrData[i].price.toFixed(2);
        //         }
        //     }
        //     console.log(cards[i].textContent);
        // }

        modal.addEventListener("click", (e) => {
            e.stopPropagation();
            if(e.target.classList.contains("modal")){
                const modalCart = document.querySelector(".modal__content-cart");
                modalCart.innerHTML = "";
                const cartTotal = document.querySelector(".modal__content-cart-total");
                cartTotal.innerHTML = "";
                modal.classList.add("modal--hidden");
                document.body.classList.remove("no-scroll");
            }
        });

        finalPrice()
    });

    const modalButton = document.querySelector(".modal__content-button");
    modalButton.addEventListener("click", () => location.reload());
}
telo();

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

function createCartItem(idx){
    
    const cartItem = document.createElement("div");
    const cartItemContent = document.createElement("div");
    const cartItemContentTitle = document.createElement("h4");
    const cartItemContentDescription = document.createElement("div");
    const cartItemContentDescriptionCount = document.createElement("p");
    const cartItemContentDescriptionPrice = document.createElement("p");
    const cartItemContentDescriptionAllprice = document.createElement("p");
    
    const imgClose = document.createElement("img");
    imgClose.src = "./assets/images/icon-remove-item.svg";
    imgClose.className = "cart__content-card-closeButton";
    
    cartItemContentDescription.appendChild(cartItemContentDescriptionCount);
    cartItemContentDescription.appendChild(cartItemContentDescriptionPrice);
    cartItemContentDescription.appendChild(cartItemContentDescriptionAllprice);
    cartItemContent.appendChild(cartItemContentTitle);
    cartItemContent.appendChild(cartItemContentDescription);
    cartItem.appendChild(cartItemContent);
    cartItem.appendChild(imgClose);
    
    cartItem.className = "cart__content-card";
    cartItemContent.className = "cart__content-card-content";
    cartItemContentTitle.className = "cart__content-card-content-title";
    cartItemContentDescription.className = "cart__content-card-content-description";
    cartItemContentDescriptionCount.className = "cart__content-card-content-description-count";
    cartItemContentDescriptionPrice.className = "cart__content-card-content-description-price";
    cartItemContentDescriptionAllprice.className = "cart__content-card-content-description-allPrice";
    
    const cartContent = document.querySelector(".cart__content");

    cartContent.appendChild(cartItem);

    cartItems[idx] = {
        "item": cartItem,
        "count": cartItemContentDescriptionCount,
        "close": imgClose,
        "allPrice": cartItemContentDescriptionAllprice
    }
    
    cartItemContentTitle.textContent = arrData[idx].name;
    cartItemContentDescriptionCount.textContent = arrData[idx].count + "x";
    cartItemContentDescriptionPrice.textContent = `@$${arrData[idx].price.toFixed(2)}`;
    cartItemContentDescriptionAllprice.textContent = "$" + (arrData[idx].count * arrData[idx].price).toFixed(2);

}

function finishPrice(){
    let sumAll = 0;
    for(let i = 0; i < arrData.length; i++){
        if(!arrData[i]) continue;
        sumAll += arrData[i].fullPrice;
    }
    return sumAll.toFixed(2);
}

function emptyCart(){
    const cartImg = document.querySelector(".cart__content-img");
    cartImg.style.cssText = "display: block";
    const cartText = document.querySelector(".cart__content-text");
    cartText.style.cssText = "display: block";
    const finishCart = document.querySelector(".cart__finish");
    finishCart.style.cssText = "display: none";
}

function deleteCard(idx, totalPrice){
    delete arrData[idx];
    cartItems[idx].item.remove();
    delete cartItems[idx].item;
    totalPrice.textContent = "$" + finishPrice();
}

function createModal(){

    const modalCart = document.querySelector(".modal__content-cart");
    
    const modalItem = document.createElement("div");
    modalItem.className = "modal__content-cart-card";
    
    const modalItemAllPrice = document.createElement("p");
    modalItemAllPrice.className = "modal__content-cart-card-allPrice";
    
    const modalItemContent = document.createElement("div");
    modalItemContent.className = "modal__content-cart-card-content";

    const modalItemContentImg = document.createElement("img");
    modalItemContentImg.className = "modal__content-cart-card-content-img";

    const modalItemContentDescription = document.createElement("div");
    modalItemContentDescription.className = "modal__content-cart-card-content-description";

    const modalItemContentDescriptionTitle = document.createElement("h4");
    modalItemContentDescriptionTitle.className = "modal__content-cart-card-content-description-title";

    const modalItemContentDescriptionInfo = document.createElement("div");
    modalItemContentDescriptionInfo.className = "modal__content-cart-card-content-description-info";

    const modalItemContentDescriptionInfoCount = document.createElement("p");
    modalItemContentDescriptionInfoCount.className = "modal__content-cart-card-content-description-info-count";

    const modalItemContentDescriptionInfoPrice = document.createElement("p");
    modalItemContentDescriptionInfoPrice.className = "modal__content-cart-card-content-description-info-price";
    
    modalItemContentDescriptionInfo.appendChild(modalItemContentDescriptionInfoCount);
    modalItemContentDescriptionInfo.appendChild(modalItemContentDescriptionInfoPrice);
    
    modalItemContentDescription.appendChild(modalItemContentDescriptionTitle);
    modalItemContentDescription.appendChild(modalItemContentDescriptionInfo);

    modalItemContent.appendChild(modalItemContentImg);
    modalItemContent.appendChild(modalItemContentDescription);
    
    modalItem.appendChild(modalItemContent);
    modalItem.appendChild(modalItemAllPrice);
    
    modalCart.appendChild(modalItem);

    modalImg = modalItemContentImg;
    modalAllPrice = modalItemAllPrice;
    modalCount = modalItemContentDescriptionInfoCount;
    modalTitle = modalItemContentDescriptionTitle;
    modalPrice = modalItemContentDescriptionInfoPrice;
}

function finalPrice(){
    const cartTotal = document.querySelector(".modal__content-cart-total");

    const cartTotalText = document.createElement("p");
    cartTotalText.className = "modal__content-cart-total-text";

    const cartTotalPrice = document.createElement("p");
    cartTotalPrice.className = "modal__content-cart-total-price";

    cartTotal.appendChild(cartTotalText);
    cartTotal.appendChild(cartTotalPrice);
    cartTotalText.textContent = "Order Total";
    cartTotalPrice.textContent = "$" + finishPrice();
}