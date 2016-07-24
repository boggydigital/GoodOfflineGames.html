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
            if (!_this.model)
                return null;
            for (var ii = 0; ii < _this.model.length; ii++) {
                if (_this.model[ii].id === id)
                    return _this.model[ii];
            }
            return undefined;
        };
        this.getAllById = function (id) {
            var products = new Array();
            if (!_this.model)
                return products;
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
            if (!products)
                return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHNDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS9kYXRhQ29udHJvbGxlcnMvcHJvZHVjdHNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQStCQTtJQUlJLGdDQUFtQixRQUE0QjtRQUpuRCxpQkE0Q0M7UUFwQ1UsWUFBTyxHQUNkLFVBQUMsRUFBVTtZQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUMsQ0FBQTtRQUVNLGVBQVUsR0FDakIsVUFBQyxFQUFVO1lBQ1AsSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQWUsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNqQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztv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