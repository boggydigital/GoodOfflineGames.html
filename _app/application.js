/// <reference path="./templateController.d.ts" />
/// <reference path="./bindController.d.ts" />
/// <reference path="./viewController.d.ts" />
/// <reference path="./productsCoreController.d.ts" />
/// <reference path="./listController.d.ts" />
/// <reference path="./eventCallback.d.ts" />
/// <reference path="./eventCallbackController.d.ts" />

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    let templateController = new TemplateController();
    let bindController = new BindController();
    let viewController = new ViewController(templateController, bindController);

    let eventCallbackController = new EventCallbackController();

    let productsController = new ProductsCoreController(products);
    productsController.addProducts(owned);
    let combinedProducts = productsController.getAll();

    let combinedProductsView = [];
    for (let ii = 0; ii < combinedProducts.length; ii++) {
        combinedProductsView.push(viewController.create(combinedProducts[ii], "product"));
    }

    let productsContainer = document.getElementById("products");

    productsContainer.innerHTML = combinedProductsView.join("");

    let listController = new ListController(eventCallbackController, productsContainer, ".product");
    listController.addEventCallback("selectedchanged", function (e) {
        alert(e.getAttribute("data-id"));
    });

    let firstProduct = productsContainer.querySelector(".product");
    listController.select(firstProduct);
});

