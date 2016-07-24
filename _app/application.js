"use strict";

document.addEventListener("DOMContentLoaded", () => {

    let getProductIdDelegate = (p) => { return p.id };

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

    let imageUriController = new ImageUriController();
    // declared in default.html
    screenshotsController = new ScreenshotsController(screenshots, imageUriController);

    let tagsController = new TagsController(
        productsDataController,
        ownedController,
        gameDetailsController,
        productFilesController,
        wishlistController);

    let productViewModelProvider = new ProductViewModelProvider(
        productsController,
        tagsController);

    let gameDetailsViewModelProvider = new GameDetailsViewModelProvider(
        productsController,
        gameDetailsController,
        productsDataController,
        productFilesController,
        imageUriController,
        screenshotsController);

    let templateController = new TemplateController();
    let bindController = new BindController();
    let eventCallbackController = new EventCallbackController();

    let languageController = new LanguageController();

    let imagesExpandController = new ImagesExpandController(
        templateController,
        bindController);
    let filesExpandController = new FilesExpandController(
        templateController,
        bindController,
        languageController);
    let imagesLoadController = new ImagesLoadController();
    let tabsController = new TabsController(
        imagesExpandController,
        imagesLoadController);

    let searchViewModelProvider = new SearchViewModelProvider(
        productsController,
        tagsController,
        productsDataController);

    let productsSearchController = new SearchController(
        searchViewModelProvider,
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
        tabsController,
        filesExpandController,
        // imagesExpandController,
        imagesLoadController);

    let masterDetailViewController = new MasterDetailViewController(
        listViewController,
        gameDetailsViewController);

    // select the first item in the list
    listViewController.selectByIndex(0);

    searchInput.addEventListener("input", (e) => {
        productsSearchController.match(searchInput.value);
    });
});

