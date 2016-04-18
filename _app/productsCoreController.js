"use strict";
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
//# sourceMappingURL=productsCoreController.js.map