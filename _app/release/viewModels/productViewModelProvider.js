"use strict";
var ProductViewModel = (function () {
    function ProductViewModel() {
    }
    return ProductViewModel;
}());
exports.ProductViewModel = ProductViewModel;
var ProductViewModelProvider = (function () {
    function ProductViewModelProvider(productsController, productsDataController, ownedController, gameDetailsController, productFilesController, wishlistController) {
        this.getViewModel = function (id) {
            if (id == null)
                return null;
            var product = this.productsController.getById(id);
            if (!product)
                return null;
            var productViewModel = new ProductViewModel();
            var classes = [];
            var tags = [];
            productViewModel.id = id;
            productViewModel.title = product.title;
            if (this.productsDataController) {
                var productData = this.productsDataController.getById(id);
                if (productData &&
                    productData.requiredProducts &&
                    productData.requiredProducts.length) {
                    classes.push("dlc");
                    tags.push("DLC");
                }
            }
            if (this.ownedController &&
                this.ownedController.getById(id)) {
                classes.push("owned");
                tags.push("OWNED");
            }
            if (this.productFilesController) {
                var productFilesValidated = this.productFilesController.validated(id);
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
                this.wishlistController.contains(id)) {
                classes.push("wishlisted");
                tags.push("WISHLISTED");
            }
            if (this.gameDetailsController) {
                var gd = this.gameDetailsController.getById(id);
                if (gd && gd.tags && gd.tags.length) {
                    for (var tt = 0; tt < gd.tags.length; tt++)
                        tags.push(gd.tags[tt].name);
                }
            }
            if (classes.length) {
                classes.push("hasTags");
            }
            productViewModel.class = classes.join(" ");
            productViewModel.tags = tags.join(". ");
            return productViewModel;
        };
        this.productsController = productsController;
        this.productsDataController = productsDataController;
        this.ownedController = ownedController;
        this.gameDetailsController = gameDetailsController;
        this.productFilesController = productFilesController;
        this.wishlistController = wishlistController;
    }
    return ProductViewModelProvider;
}());
exports.ProductViewModelProvider = ProductViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdFZpZXdNb2RlbFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3TW9kZWxzL3Byb2R1Y3RWaWV3TW9kZWxQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBU0E7SUFBQTtJQUtBLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksd0JBQWdCLG1CQUs1QixDQUFBO0FBRUQ7SUFTSSxrQ0FDSSxrQkFBb0QsRUFDcEQsc0JBQTRELEVBQzVELGVBQWlELEVBQ2pELHFCQUEyRCxFQUMzRCxzQkFBK0MsRUFDL0Msa0JBQWlEO1FBUzlDLGlCQUFZLEdBQ25CLFVBQVUsRUFBVTtZQUVoQixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRTFCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQzlDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFFZCxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLGdCQUFnQixDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBRXZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLFdBQVc7b0JBQ1gsV0FBVyxD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