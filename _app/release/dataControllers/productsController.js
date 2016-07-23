"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ProductsCoreController = (function () {
    function ProductsCoreController(products) {
        var _this = this;
        this.getById = function (id) {
            for (var ii = 0; ii < _this.model.length; ii++) {
                if (_this.model[ii].id === id)
                    return _this.model[ii];
            }
            return undefined;
        };
        this.getAllById = function (id) {
            var products = new Array();
            for (var ii = 0; ii < _this.model.length; ii++) {
                if (_this.model[ii].id === id)
                    products.push(_this.model[ii]);
            }
            return products;
        };
        this.contains = function (id) {
            return _this.getById(id) !== undefined;
        };
        this.addProducts = function (products) {
            for (var ii = 0; ii < products.length; ii++) {
                if (_this.getById(products[ii].id) === undefined)
                    _this.model.push(products[ii]);
            }
        };
        this.getAll = function () {
            return _this.model;
        };
        this.model = products;
    }
    return ProductsCoreController;
}());
exports.ProductsCoreController = ProductsCoreController;
var ProductsController = (function (_super) {
    __extends(ProductsController, _super);
    function ProductsController(products) {
        _super.call(this, products);
    }
    return ProductsController;
}(ProductsCoreController));
exports.ProductsController = ProductsController;
var ProductsDataController = (function (_super) {
    __extends(ProductsDataController, _super);
    function ProductsDataController(productsData) {
        _super.call(this, productsData);
    }
    return ProductsDataController;
}(ProductsCoreController));
exports.ProductsDataController = ProductsDataController;
var GameDetailsController = (function (_super) {
    __extends(GameDetailsController, _super);
    function GameDetailsController(gameDetails) {
        _super.call(this, gameDetails);
    }
    return GameDetailsController;
}(ProductsCoreController));
exports.GameDetailsController = GameDetailsController;
var ProductFilesController = (function (_super) {
    __extends(ProductFilesController, _super);
    function ProductFilesController(productFiles) {
        _super.call(this, productFiles);
        this.validated = function (id) {
            var productFilesForId = this.getAllById(id);
            if (productFilesForId && productFilesForId.length === 0)
                return undefined;
            var validity = true;
            for (var ii = 0; ii < productFilesForId.length; ii++)
                validity = validity && productFilesForId[ii].validated;
            return validity;
        };
    }
    return ProductFilesController;
}(ProductsCoreController));
exports.ProductFilesController = ProductFilesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHNDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS9kYXRhQ29udHJvbGxlcnMvcHJvZHVjdHNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQStCQTtJQUlJLGdDQUFtQixRQUE0QjtRQUpuRCxpQkF5Q0M7UUFqQ1UsWUFBTyxHQUNkLFVBQUMsRUFBVTtZQUNQLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUMsQ0FBQTtRQUVNLGVBQVUsR0FDakIsVUFBQyxFQUFVO1lBQ1AsSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQWUsQ0FBQztZQUN4QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztvQkFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUE7UUFFTSxhQUFRLEdBQ2YsVUFBQyxFQUFVO1lB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