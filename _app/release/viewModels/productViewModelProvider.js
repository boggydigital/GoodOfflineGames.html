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
    function ProductCoreViewModelProvider(gameDetailsController, ownedController, wishlistController, productFilesController) {
        _super.call(this);
        this.getViewModel = function (data) {
            if (data == null)
                return null;
            var productViewModel = new ProductViewModel();
            var classes = [];
            var tags = [];
            productViewModel.id = data.id;
            productViewModel.title = data.title;
            if (this.ownedController &&
                this.ownedController.getById(data.id)) {
                classes.push("owned");
                tags.push("OWNED");
            }
            if (this.productFilesController) {
                var productFilesValidated = this.productFilesController.validated(data.id);
                if (productFilesValidated === true) {
                    classes.push("validated");
                    tags.push("DATA OK");
                }
                else if (productFilesValidated === false) {
                    classes.push("validation-issue");
                    tags.push("CHECK DATA");
                }
            }
            if (this.wishlistController &&
                this.wishlistController.contains(data.id)) {
                classes.push("wishlisted");
                tags.push("WISHLISTED");
            }
            if (this.gameDetailsController) {
                var gd = this.gameDetailsController.getById(data.id);
                if (gd && gd.tags && gd.tags.length) {
                    for (var tt = 0; tt < gd.tags.length; tt++)
                        tags.push(gd.tags[tt].name);
                }
            }
            productViewModel.class = classes.join(" ");
            productViewModel.tags = tags.join(". ");
            return productViewModel;
        };
        this.gameDetailsController = gameDetailsController;
        this.ownedController = ownedController;
        this.wishlistController = wishlistController;
        this.productFilesController = productFilesController;
    }
    return ProductCoreViewModelProvider;
}(ProductViewModelProvider));
exports.ProductCoreViewModelProvider = ProductCoreViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdFZpZXdNb2RlbFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3TW9kZWxzL3Byb2R1Y3RWaWV3TW9kZWxQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFRQTtJQUFBO0lBS0EsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSx3QkFBZ0IsbUJBSzVCLENBQUE7QUFVRDtJQUFBO1FBQ1csaUJBQVksR0FBRyxVQUFDLElBQVc7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7SUFDTCxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpxQixnQ0FBd0IsMkJBSTdDLENBQUE7QUFFRDtJQUFrRCxnREFBcUM7SUFPbkYsc0NBQ0kscUJBQTJELEVBQzNELGVBQWlELEVBQ2pELGtCQUFpRCxFQUNqRCxzQkFBK0M7UUFDL0MsaUJBQU8sQ0FBQztRQU9MLGlCQUFZLEdBQ25CLFVBQVUsSUFBaUI7WUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRTlCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQzlDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFFZCxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM5QixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZTtnQkFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxDQUFDLElB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