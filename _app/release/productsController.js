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
var GameDetailsController = (function (_super) {
    __extends(GameDetailsController, _super);
    function GameDetailsController(gameDetails) {
        _super.call(this, gameDetails);
    }
    return GameDetailsController;
}(ProductsCoreController));
exports.GameDetailsController = GameDetailsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHNDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS9wcm9kdWN0c0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBd0JBO0lBSUksZ0NBQW1CLFFBQTRCO1FBSm5ELGlCQWdDQztRQXhCVSxZQUFPLEdBQ1YsVUFBVSxFQUFVO1lBQ3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUMsQ0FBQTtRQUVNLGFBQVEsR0FDWCxVQUFTLEVBQVU7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssU0FBUyxDQUFDO1FBQzFDLENBQUMsQ0FBQTtRQUVNLGdCQUFXLEdBQ2QsVUFBQyxRQUE0QjtZQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssU0FBUyxDQUFDO29CQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25GLENBQUM7UUFDTCxDQUFDLENBQUE7UUFFTSxXQUFNLEdBQ1Q7WUFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDLENBQUE7UUExQkcsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7SUFDMUIsQ0FBQztJQTBCTCw2QkFBQztBQUFELENBQUMsQUFoQ0QsSUFnQ0M7QUFoQ3FCLDhCQUFzQix5QkFnQzNDLENBQUE7QUFFRDtJQUF3QyxzQ0FBK0I7SUFDbkUsNEJBQW1CLFFBQXdCO1FBQ3ZDLGtCQUFNLFFBQVEsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFDTCx5QkFBQztBQUFELENBQUMsQUFKRCxDQUF3QyxzQkFBc0IsR0FJN0Q7QUFKWSwwQkFBa0IscUJBSTlCLENBQUE7QUFFRDtJQUEyQyx5Q0FBbUM7SUFDMUUsK0JBQW1CLFdBQStCO1FBQzlDLGtCQUFNLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFKRCxDQUEyQyxzQkFBc0IsR0FJaEU7QUFKWSw2QkFBcUIsd0JBSWpDLENBQUEifQ==