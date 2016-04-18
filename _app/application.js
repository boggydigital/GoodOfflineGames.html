/// <reference path="./selectionController.js" />
/// <reference path="./templateController.js" />
/// <reference path="./bindController.js" />
/// <reference path="./viewStringController.js" />
/// <reference path="./productsCoreController.js" />

"use strict";

// Core Controllers
var selectionController;
var templateController;
var bindController;
var viewStringController;

// Products Controllers
var productsController;

document.addEventListener("DOMContentLoaded", () => {

    selectionController = new SelectionController();
    templateController = new TemplateController(selectionController);
    bindController = new BindController();
    viewStringController = new ViewStringController(templateController, bindController);

    productsController = new ProductsCoreController(products);
    productsController.addProducts(owned);
    
    var combinedProducts = productsController.getAll();
    var combinedProductsView = [];
    for (var ii=0; ii<combinedProducts.length; ii++) {
        combinedProductsView.push(viewStringController.createViewString(combinedProducts[ii], "product"));
    }
    
    document.body.innerHTML = combinedProductsView.join("");
});