/// <reference path="./release/model/productCore.d.ts" />
/// <reference path="./release/viewModel/productSearchViewModelProvider.d.ts" />
/// <reference path="./release/viewModel/searchViewModel.d.ts" />
/// <reference path="./release/viewModel/searchViewModelProvider.d.ts" />
/// <reference path="./release/viewModel/viewModelProvider.d.ts" />
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

    let combinedProductsView = [];
    for (let ii = 0; ii < combinedProducts.length; ii++) {
        combinedProductsView.push(viewController.create(combinedProducts[ii], "product"));
    }

    let productsContainer = document.getElementById("products");
    productsContainer.innerHTML = combinedProductsView.join("");

    let listController = new ListController(eventCallbackController, productsContainer, "product");
    listController.addEventCallback("selectedChanged", function (e) {
        let id = parseInt(e.getAttribute("data-id"));
        let product = productsController.getById(id)
        document.getElementById("gameDetails").innerHTML = "<h1>" + product.title + "</h1>";
    });

    let firstProduct = productsContainer.querySelector(".product");
    listController.select(firstProduct);

    // searchController.addEventCallback("indexingStart", () => { console.log("Indexing start"); });
    // searchController.addEventCallback("indexingEnd", () => { console.log("Indexing end") })
    searchController.addEventCallback("matched", (id) => { console.log(id);});

    searchController.index(combinedProducts);
    searchController.match("doom");

});

