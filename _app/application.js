/// <reference path="./selectionController.js" />
/// <reference path="./templateController.js" />
/// <reference path="./bindController.js" />
/// <reference path="./viewStringController.js" />
/// <reference path="./selectableController.js" />
/// <reference path="./productsCoreController.js" />
"use strict";

// Core Controllers
var selectionController;
var templateController;
var bindController;
var viewStringController;
var selectableController;
var eventListener;
var eventListenerController;

// Products Controllers
var productsController;

document.addEventListener("DOMContentLoaded", () => {

    selectionController = new SelectionController();
    templateController = new TemplateController(selectionController);
    bindController = new BindController();
    viewStringController = new ViewStringController(templateController, bindController);

    eventListener = new EventListener();
    eventListenerController = new EventListenerController(eventListener);

    productsController = new ProductsCoreController(products);
    productsController.addProducts(owned);

    var combinedProducts = productsController.getAll();
    var combinedProductsView = [];
    for (var ii = 0; ii < combinedProducts.length; ii++) {
        combinedProductsView.push(viewStringController.create(combinedProducts[ii], "product"));
    }

    var productsContainer = selectionController.getById("products");

    productsContainer.innerHTML = combinedProductsView.join("");

    selectableController = new SelectableController(selectionController, eventListenerController, productsContainer, ".product");
    selectableController.addEventListener("selectedchanged", function(e) {
       alert(e.getAttribute("data-id")); 
    });

    var firstProduct = selectionController.getFromContainer(productsContainer, ".product");
    selectableController.select(firstProduct);
});

