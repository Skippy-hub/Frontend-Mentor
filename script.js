let products = [];

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
    let sum = [];

    function addCart(e, idx){
        e.stopPropagation()
        const cartContent = document.querySelector(".cart__content");
        const count = document.querySelector(".cart__count");

        let activeButton = e.target.closest(".hero__cards-card-img-button");
        
        if(e.target.classList.contains("button-text")){

        } else if(e.target.classList.contains("active-button")){

        }else if((!e.target.classList.contains("active"))){
            newButton(activeButton);
            activeButton.classList.add("active");   
            
            const totalPrice = document.querySelector(".cart__finish-total-price");

            const buttonPlus = activeButton.querySelector(".plus");
            const buttonMinus = activeButton.querySelector(".minus");
            const activeButtonText = activeButton.querySelector(".button-text");

            countProducts++;
            count.textContent = countProducts;

            buttonPlus.addEventListener("click", (e) => {
                e.stopPropagation();
                activeButtonText.textContent = +activeButtonText.textContent + 1;
                zapCart();
                countProducts++;
                count.textContent = countProducts;
                totalPrice.textContent = "$" + finishPrice(sum);
            });

            buttonMinus.addEventListener("click", (e) => {
                e.stopPropagation();
                if(+activeButtonText.textContent < 2){
                    activeButton.classList.remove("active");
                    activeButton.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt=""> Add to Cart';
                    countProducts--;
                    count.textContent = countProducts;
                    cartItem.remove();
                    sum[idx] = 0;
                    totalPrice.textContent = "$" + finishPrice(sum);

                    if(count.textContent == 0){
                        const cartImg = document.querySelector(".cart__content-img");
                        cartImg.style.cssText = "display: block";
                        const cartText = document.querySelector(".cart__content-text");
                        cartText.style.cssText = "display: block";
                    }
                }else{
                    activeButtonText.textContent = +activeButtonText.textContent - 1;
                    zapCart();
                    countProducts--;
                    count.textContent = countProducts;
                    totalPrice.textContent = "$" + finishPrice(sum);
                }
            });

            const cartItem = document.createElement("div");
            const cartItemContent = document.createElement("div");
            const cartItemContentTitle = document.createElement("h4");
            const cartItemContentDescription = document.createElement("div");
            const cartItemContentDescriptionCount = document.createElement("p");
            const cartItemContentDescriptionPrice = document.createElement("p");
            const cartItemContentDescriptionAllprice = document.createElement("p");

            

            cartItemContentDescription.appendChild(cartItemContentDescriptionCount);
            cartItemContentDescription.appendChild(cartItemContentDescriptionPrice);
            cartItemContentDescription.appendChild(cartItemContentDescriptionAllprice);
            cartItemContent.appendChild(cartItemContentTitle);
            cartItemContent.appendChild(cartItemContentDescription);
            cartItem.appendChild(cartItemContent);

            cartItem.className = "cart__content-card";
            cartItemContent.className = "cart__content-card-content";
            cartItemContentTitle.className = "cart__content-card-content-title";
            cartItemContentDescription.className = "cart__content-card-content-description";
            cartItemContentDescriptionCount.className = "cart__content-card-content-description-count";
            cartItemContentDescriptionPrice.className = "cart__content-card-content-description-price";
            cartItemContentDescriptionAllprice.className = "cart__content-card-content-description-allPrice";

            function zapCart(){
                cartItemContentTitle.textContent = products[idx].name;
                cartItemContentDescriptionCount.textContent = activeButtonText.textContent + "x";
                cartItemContentDescriptionPrice.textContent = `@$${products[idx].price.toFixed(2)}`;
                cartItemContentDescriptionAllprice.textContent = "$" + (+activeButtonText.textContent * products[idx].price).toFixed(2);
                sum[idx] = (+activeButtonText.textContent * products[idx].price).toFixed(2);
            }
            cartContent.appendChild(cartItem);
            zapCart();

            if(!count.textContent == 0){
                const cartImg = document.querySelector(".cart__content-img");
                cartImg.style.cssText = "display: none";
                const cartText = document.querySelector(".cart__content-text");
                cartText.style.cssText = "display: none";
            }

            function finishPrice(arr){
                let sumAll = 0;
                for(let i = 0; i < arr.length; i++){
                    if(!arr[i]) continue;
                    sumAll += +arr[i];
                }
                return sumAll.toFixed(2);
            }
            totalPrice.textContent = "$" + finishPrice(sum);

        }
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
}
telo();