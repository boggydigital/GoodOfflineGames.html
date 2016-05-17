"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ProductViewModel = (function () {
    function ProductViewModel() {
    }
    return ProductViewModel;
}());
exports.ProductViewModel = ProductViewModel;
var ProductViewModelProvider = (function () {
    function ProductViewModelProvider() {
        this.getViewModel = function (data) {
            return null;
        };
    }
    return ProductViewModelProvider;
}());
exports.ProductViewModelProvider = ProductViewModelProvider;
var ProductCoreViewModelProvider = (function (_super) {
    __extends(ProductCoreViewModelProvider, _super);
    function ProductCoreViewModelProvider() {
        _super.apply(this, arguments);
        this.getViewModel = function (data) {
            if (data == null)
                return null;
            var productViewModel = new ProductViewModel();
            productViewModel.id = data.id;
            productViewModel.title = data.title;
            return productViewModel;
        };
    }
    return ProductCoreViewModelProvider;
}(ProductViewModelProvider));
exports.ProductCoreViewModelProvider = ProductCoreViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdFZpZXdNb2RlbFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3TW9kZWwvcHJvZHVjdFZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBO0lBQUE7SUFJQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLHdCQUFnQixtQkFJNUIsQ0FBQTtBQVVEO0lBQUE7UUFDVyxpQkFBWSxHQUFHLFVBQUMsSUFBVztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCwrQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSnFCLGdDQUF3QiwyQkFJN0MsQ0FBQTtBQUVEO0lBQWtELGdEQUFxQztJQUF2RjtRQUFrRCw4QkFBcUM7UUFDNUUsaUJBQVksR0FBRyxVQUFTLElBQWlCO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM5QixJQUFJLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUM5QyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM5QixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUFELG1DQUFDO0FBQUQsQ0FBQyxBQVJELENBQWtELHdCQUF3QixHQVF6RTtBQVJZLG9DQUE0QiwrQkFReEMsQ0FBQSJ9