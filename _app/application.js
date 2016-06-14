/// <reference path="./release/model/productCore.d.ts" />
/// <reference path="./release/viewModel/searchViewModelProvider.d.ts" />
/// <reference path="./release/templateController.d.ts" />
/// <reference path="./release/bindController.d.ts" />
/// <reference path="./release/viewController.d.ts" />
/// <reference path="./release/eventCallbackController.d.ts" />
/// <reference path="./release/listViewController.d.ts" />
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

    let listViewController = new ListViewController(
        combinedProducts, // collection
        "product", //templateId
        document.getElementById("products"), // container
        viewController, // ...
        productsSearchController, // searchController
        eventCallbackController); // ...
    
    let gameDetailsViewController = new GameDetailsViewController(
        document.getElementById("gameDetails")
    );

    let masterDetailViewController = new MasterDetailViewController(
        listViewController,
        gameDetailsViewController
    );

    // select the first item in the list
    listViewController.selectByIndex(0);

    let searchInput = document.querySelector("#search>input[type='search']");
    searchInput.addEventListener("input", (e) => {
        productsSearchController.match(searchInput.value); 
    });
});

