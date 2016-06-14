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

    let getProductIdDelegate = (p) => { return p.id};

    /* DOM Elements */

    let productsContainer = document.getElementById("products");
    let gameDetailsContainer = document.getElementById("gameDetails");
    let searchInput = document.querySelector("#search>input[type='search']");

    /* Controller */

    let productsController = new ProductsController(products);
    let ownedController = new ProductsController(owned);
    let gameDetailsController = new GameDetailsController(gamedetails);
    let productFilesController = new ProductFilesController(productfiles);
    productsController.addProducts(ownedController.getAll());
    let wishlistController = new CollectionController(wishlisted);
    let combinedProducts = productsController.getAll();

    let productViewModelProvider = new ProductCoreViewModelProvider(
        productsController,
        ownedController,
        gameDetailsController,
        productFilesController,
        wishlistController);

    let gameDetailsViewModelProvider = new GameDetailsViewModelProvider(productsController);

    let templateController = new TemplateController();
    let bindController = new BindController();
    let eventCallbackController = new EventCallbackController();

    let productCoreSearchViewModelProvider = new ProductCoreSearchViewModelProvider(
        productViewModelProvider);

    let productsSearchController = new SearchController(
        productCoreSearchViewModelProvider,
        eventCallbackController);

    let viewControllerProducts = new ViewController(
        productViewModelProvider,
        templateController,
        bindController);

    let viewControllerGameDetails = new ViewController(
        gameDetailsViewModelProvider,
        templateController,
        bindController);

    let listViewController = new ListViewController(
        combinedProducts, // collection
        getProductIdDelegate,
        "product", //templateId
        productsContainer, // container
        viewControllerProducts, // ...
        productsSearchController, // searchController
        eventCallbackController); // ...

    let gameDetailsViewController = new GameDetailsViewController(
        getProductIdDelegate,
        "gameDetails",
        gameDetailsContainer,
        viewControllerGameDetails,
        productsController);

    let masterDetailViewController = new MasterDetailViewController(
        listViewController,
        gameDetailsViewController);

    // select the first item in the list
    listViewController.selectByIndex(0);

    searchInput.addEventListener("input", (e) => {
        productsSearchController.match(searchInput.value);
    });
});

