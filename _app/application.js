/// <reference path="./selectionController.js" />
/// <reference path="./templateController.js" />
/// <reference path="./bindController.js" />
/// <reference path="./viewStringController.js" />
/// <reference path="./productsCoreController.js" />

"use strict";

var selectionController;
var templateController;
var bindController;
var viewStringController;

document.addEventListener("DOMContentLoaded", () => {

    selectionController = new SelectionController();
    templateController = new TemplateController(selectionController);
    bindController = new BindController();
    viewStringController = new ViewStringController(templateController, bindController);

    var productsController = new ProductsCoreController(products);
    productsController.addProducts(owned);
    
    var p = productsController.getById(1448355943);
    alert(p.title);
    
    p = productsController.getById(1);
    alert(p.title);

});