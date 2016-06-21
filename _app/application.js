"use strict";

document.addEventListener("DOMContentLoaded", () => {

    let getProductIdDelegate = (p) => { return p.id};

    /* DOM Elements */

    let productsContainer = document.getElementById("products");
    let gameDetailsContainer = document.getElementById("gameDetails");
    let searchInput = document.querySelector("#search>input[type='search']");

    /* Controller */

    let productsController = new ProductsController(products);
    let productsDataController = new ProductsDataController(productsdata);
    let ownedController = new ProductsController(owned);
    let gameDetailsController = new GameDetailsController(gamedetails);
    let productFilesController = new ProductFilesController(productfiles);
    productsController.addProducts(ownedController.getAll());
    let wishlistController = new CollectionController(wishlisted);
    let combinedProducts = productsController.getAll();

    let imagesController = new ImagesController();

    let productViewModelProvider = new ProductViewModelProvider(
        productsController,
        productsDataController,
        ownedController,
        gameDetailsController,
        productFilesController,
        wishlistController);

    let gameDetailsViewModelProvider = new GameDetailsViewModelProvider(
        imagesController,
        productsController,
        productsDataController);

    let templateController = new TemplateController();
    let bindController = new BindController();
    let eventCallbackController = new EventCallbackController();

    let productCoreSearchViewModelProvider = new ProductSearchViewModelProvider(
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
        productsController,
        imagesController);

    let masterDetailViewController = new MasterDetailViewController(
        listViewController,
        gameDetailsViewController);

    // select the first item in the list
    listViewController.selectByIndex(0);

    searchInput.addEventListener("input", (e) => {
        productsSearchController.match(searchInput.value);
    });
});

