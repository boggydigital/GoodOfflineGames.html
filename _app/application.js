/// <reference path="./release/model/productCore.d.ts" />
/// <reference path="./release/viewModel/searchViewModelProvider.d.ts" />
/// <reference path="./release/templateController.d.ts" />
/// <reference path="./release/bindController.d.ts" />
/// <reference path="./release/viewController.d.ts" />
/// <reference path="./release/eventCallbackController.d.ts" />
/// <reference path="./release/listController.d.ts" />
/// <reference path="./release/searchController.d.ts" />
/// <reference path="./release/productsCoreController.d.ts" />

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    let templateController = new TemplateController();
    let bindController = new BindController();
    let viewController = new ViewController(templateController, bindController);

    let eventCallbackController = new EventCallbackController();

    let productCoreSearchViewModelProvider = new ProductCoreSearchViewModelProvider();
    let searchController = new SearchController(productCoreSearchViewModelProvider, eventCallbackController);

    let productsController = new ProductsCoreController(products);
    productsController.addProducts(owned);
    let combinedProducts = productsController.getAll();

    let listController = new ListController(
        combinedProducts, // collection
        "product", //templateId
        document.getElementById("products"), // container
        viewController, // ...
        eventCallbackController); // ...
    
    listController.addEventCallback("selectedChanged", function (e) {
        let id = parseInt(e.getAttribute("data-id"));
        let product = productsController.getById(id)
        document.getElementById("gameDetails").innerHTML = "<h1>" + product.title + "</h1>";
    });

    // select the first item in the list
    listController.selectByIndex(0);


    searchController.addEventCallback("matched", (id) => { console.log(id);});

    searchController.index(combinedProducts);
    searchController.match("doom");

});

