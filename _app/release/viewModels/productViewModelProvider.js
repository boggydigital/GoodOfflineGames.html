"use strict";
var ProductViewModel = (function () {
    function ProductViewModel() {
    }
    return ProductViewModel;
}());
exports.ProductViewModel = ProductViewModel;
var GameDetailsViewModel = (function () {
    function GameDetailsViewModel() {
    }
    return GameDetailsViewModel;
}());
exports.GameDetailsViewModel = GameDetailsViewModel;
var ProductCoreViewModelProvider = (function () {
    function ProductCoreViewModelProvider(productsController, ownedController, gameDetailsController, productFilesController, wishlistController) {
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
            productViewModel.class = classes.join(" ");
            productViewModel.tags = tags.join(". ");
            return productViewModel;
        };
        this.productsController = productsController;
        this.ownedController = ownedController;
        this.gameDetailsController = gameDetailsController;
        this.productFilesController = productFilesController;
        this.wishlistController = wishlistController;
    }
    return ProductCoreViewModelProvider;
}());
exports.ProductCoreViewModelProvider = ProductCoreViewModelProvider;
var GameDetailsViewModelProvider = (function () {
    function GameDetailsViewModelProvider(productsController) {
        this.getViewModel = function (id) {
            if (id == null)
                return null;
            var product = this.productsController.getById(id);
            var gameDetailsViewModel = new GameDetailsViewModel();
            gameDetailsViewModel.id = id;
            gameDetailsViewModel.title = product.title;
            return gameDetailsViewModel;
        };
        this.productsController = productsController;
    }
    return GameDetailsViewModelProvider;
}());
exports.GameDetailsViewModelProvider = GameDetailsViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdFZpZXdNb2RlbFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3TW9kZWxzL3Byb2R1Y3RWaWV3TW9kZWxQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUE7SUFBQTtJQUtBLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksd0JBQWdCLG1CQUs1QixDQUFBO0FBRUQ7SUFBQTtJQUdBLENBQUM7SUFBRCwyQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksNEJBQW9CLHVCQUdoQyxDQUFBO0FBTUQ7SUFRSSxzQ0FDSSxrQkFBb0QsRUFDcEQsZUFBaUQsRUFDakQscUJBQTJELEVBQzNELHNCQUErQyxFQUMvQyxrQkFBaUQ7UUFROUMsaUJBQVksR0FDbkIsVUFBVSxFQUFVO1lBRWhCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFMUIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDOUMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUVkLGdCQUFnQixDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDekIsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFFdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWU7Z0JBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztn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