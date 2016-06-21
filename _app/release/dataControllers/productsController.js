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
            for (var ii = 0; ii < this.model.length; ii++) {
                if (this.model[ii].id === id)
                    return this.model[ii];
            }
            return undefined;
        };
        this.contains = function (id) {
            return this.getById(id) !== undefined;
        };
        this.addProducts = function (products) {
            for (var ii = 0; ii < products.length; ii++) {
                if (_this.getById(products[ii].id) === undefined)
                    _this.model.push(products[ii]);
            }
        };
        this.getAll = function () {
            return this.model;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHNDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS9kYXRhQ29udHJvbGxlcnMvcHJvZHVjdHNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQXlCQTtJQUlJLGdDQUFtQixRQUE0QjtRQUpuRCxpQkFnQ0M7UUF4QlUsWUFBTyxHQUNWLFVBQVUsRUFBVTtZQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztvQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDLENBQUE7UUFFTSxhQUFRLEdBQ1gsVUFBUyxFQUFVO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFNBQVMsQ0FBQztRQUMxQyxDQUFDLENBQUE7UUFFTSxnQkFBVyxHQUNkLFVBQUMsUUFBNEI7WUFDN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFNBQVMsQ0FBQztvQkFBQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRixDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBRU0sV0FBTSxHQUNUO1lBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQyxDQUFBO1FBMUJHLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0lBQzFCLENBQUM7SUEwQkwsNkJBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDO0FBaENxQiw4QkFBc0IseUJBZ0MzQyxDQUFBO0FBRUQ7SUFBd0Msc0NBQStCO0lBQ25FLDRCQUFtQixRQUF3QjtRQUN2QyxrQkFBTSxRQUFRLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBd0Msc0JBQXNCLEdBSTdEO0FBSlksMEJBQWtCLHFCQUk5QixDQUFBO0FBRUQ7SUFBNEMsMENBQW1DO0lBQzNFLGdDQUFtQixZQUFnQztRQUMvQyxrQkFBTSxZQUFZLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBNEMsc0JBQXNCLEdBSWpFO0FBSlksOEJBQXNCLHlCQUlsQyxDQUFBO0FBRUQ7SUFBMkMseUNBQW1DO0lBQzFFLCtCQUFtQixXQUErQjtRQUM5QyxrQkFBTSxXQUFXLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMkMsc0JBQXNCLEdBSWhFO0FBSlksNkJBQXFCLHdCQUlqQyxDQUFBIn0=