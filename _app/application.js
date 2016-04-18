/// <reference path="./selectionController.js" />
/// <reference path="./templateController.js" />
/// <reference path="./bindController.js" />
/// <reference path="./viewController.js" />

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    
    var model = { "title": "This is some title"};
    
    var selectionController = new SelectionController();
    var templateController = new TemplateController(selectionController);
    var bindController = new BindController();
    var viewStringController = new ViewStringController(templateController, bindController);
    
    selectionController.getById("products").innerHTML = viewStringController.createViewString(model, "product");
});