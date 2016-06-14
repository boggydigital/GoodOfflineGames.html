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
    function ProductCoreViewModelProvider(gameDetailsController, ownedController, wishlistController, productFilesController) {
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
}());
exports.ProductCoreViewModelProvider = ProductCoreViewModelProvider;
var GameDetailsViewModelProvider = (function () {
    function GameDetailsViewModelProvider() {
        this.getViewModel = function (data) {
            if (data == null)
                return null;
            var gameDetailsViewModel = new GameDetailsViewModel();
            gameDetailsViewModel.id = data.id;
            gameDetailsViewModel.title = data.title;
            return gameDetailsViewModel;
        };
    }
    return GameDetailsViewModelProvider;
}());
exports.GameDetailsViewModelProvider = GameDetailsViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdFZpZXdNb2RlbFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3TW9kZWxzL3Byb2R1Y3RWaWV3TW9kZWxQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUE7SUFBQTtJQUtBLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksd0JBQWdCLG1CQUs1QixDQUFBO0FBRUQ7SUFBQTtJQUdBLENBQUM7SUFBRCwyQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksNEJBQW9CLHVCQUdoQyxDQUFBO0FBTUQ7SUFPSSxzQ0FDSSxxQkFBMkQsRUFDM0QsZUFBaUQsRUFDakQsa0JBQWlELEVBQ2pELHNCQUErQztRQU81QyxpQkFBWSxHQUNuQixVQUFVLElBQWlCO1lBRXZCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU5QixJQUFJLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUM5QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDakIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWQsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDOUIsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWU7Z0JBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FB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