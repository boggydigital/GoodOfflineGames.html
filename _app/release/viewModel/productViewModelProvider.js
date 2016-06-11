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
    function ProductCoreViewModelProvider(ownedController) {
        _super.call(this);
        this.getViewModel = function (data) {
            if (data == null)
                return null;
            var productViewModel = new ProductViewModel();
            productViewModel.class = "";
            productViewModel.id = data.id;
            productViewModel.title = data.title;
            if (this.ownedController &&
                this.ownedController.getById(data.id))
                productViewModel.class += "owned";
            return productViewModel;
        };
        this.ownedController = ownedController;
    }
    return ProductCoreViewModelProvider;
}(ProductViewModelProvider));
exports.ProductCoreViewModelProvider = ProductCoreViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdFZpZXdNb2RlbFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3TW9kZWwvcHJvZHVjdFZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBO0lBQUE7SUFLQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLHdCQUFnQixtQkFLNUIsQ0FBQTtBQVVEO0lBQUE7UUFDVyxpQkFBWSxHQUFHLFVBQUMsSUFBVztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCwrQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSnFCLGdDQUF3QiwyQkFJN0MsQ0FBQTtBQUVEO0lBQWtELGdEQUFxQztJQUluRixzQ0FBbUIsZUFBd0M7UUFDdkQsaUJBQU8sQ0FBQztRQUlMLGlCQUFZLEdBQUcsVUFBUyxJQUFpQjtZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDOUIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFFOUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUM1QixnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM5QixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZTtnQkFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0QyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDO1lBRXRDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDLENBQUE7UUFoQkcsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDM0MsQ0FBQztJQWdCTCxtQ0FBQztBQUFELENBQUMsQUF2QkQsQ0FBa0Qsd0JBQXdCLEdBdUJ6RTtBQXZCWSxvQ0FBNEIsK0JBdUJ4QyxDQUFBIn0=