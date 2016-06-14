/// <reference path="./release/model/productCore.d.ts" />
/// <reference path="./release/viewModel/searchViewModelProvider.d.ts" />
/// <reference path="./release/templateController.d.ts" />
/// <reference path="./release/bindController.d.ts" />
/// <reference path="./release/viewController.d.ts" />
/// <reference path="./release/eventCallbackController.d.ts" />
/// <reference path="./release/listController.d.ts" />
/// <reference path="./release/searchController.d.ts" />
/// <reference path="./release/collectionController.d.ts" />
/// <reference path="./release/productsCoreController.d.ts" />

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    let productsController = new ProductsController(products);
    let ownedController = new ProductsController(owned);
    let gameDetailsController = new GameDetailsController(gamedetails);
    let productFilesController = new ProductFilesController(productfiles);
    productsController.addProducts(ownedController.getAll());
    let wishlistController = new CollectionController(wishlisted);
    let combinedProducts = productsController.getAll();

    let productViewModelProvider = new ProductCoreViewModelProvider(
        gameDetailsController,
        ownedController,
        wishlistController,
        productFilesController);

    let templateController = new TemplateController();
    let bindController = new BindController();
    let eventCallbackController = new EventCallbackController();

    let productCoreSearchViewModelProvider = new ProductCoreSearchViewModelProvider(
        productViewModelProvider);
    let productsSearchController = new SearchController(
        productCoreSearchViewModelProvider, 
        eventCallbackController);

    let viewController = new ViewController(
        productViewModelProvider,
        templateController, 
        bindController);


    let productsListController = new ListController(
        combinedProducts, // collection
        "product", //templateId
        document.getElementById("products"), // container
        viewController, // ...
        productsSearchController, // searchController
        eventCallbackController); // ...
    
    productsListController.addEventCallback("selectedChanged", function (e) {
        let id = parseInt(e.getAttribute("data-id"));
        let product = productsController.getById(id)
        document.getElementById("gameDetails").innerHTML = "<h1>" + product.title + "</h1>";
    });

    // select the first item in the list
    productsListController.selectByIndex(0);

    // productsSearchController.match("doom");

    let searchInput = document.querySelector("#search>input[type='search']");
    searchInput.addEventListener("input", (e) => {
        productsSearchController.match(searchInput.value); 
    });
});

