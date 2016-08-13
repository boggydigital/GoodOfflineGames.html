"use strict";
var TagsController = (function () {
    function TagsController(productsDataController, accountProductsController, gameDetailsController, productFilesController, wishlistController) {
        var _this = this;
        this.dlcTag = "dlc";
        this.ownedTag = "owned";
        this.wishlistedTag = "wishlisted";
        this.validationSuccessTag = "valid";
        this.validationErrorTag = "check data";
        this.getAllTags = function () {
            var tags = [
                _this.dlcTag,
                _this.ownedTag,
                _this.wishlistedTag,
                _this.validationErrorTag,
                _this.validationSuccessTag];
            if (!_this.gameDetailsController)
                return tags;
            var gameDetails = _this.gameDetailsController.getAll();
            if (!gameDetails)
                return tags;
            gameDetails.forEach(function (gd) {
                gd.tags.forEach(function (tag) {
                    if (tags.indexOf(tag.name) === -1)
                        tags.push(tag.name);
                });
            });
            return tags;
        };
        this.getTags = function (id) {
            var tags = new Array();
            if (_this.productsDataController) {
                var productData = _this.productsDataController.getById(id);
                if (productData &&
                    productData.requiredProducts &&
                    productData.requiredProducts.length) {
                    tags.push(_this.dlcTag);
                }
            }
            if (_this.accountProductsController &&
                _this.accountProductsController.getById(id)) {
                tags.push(_this.ownedTag);
            }
            if (_this.productFilesController) {
                var productFilesValidated = _this.productFilesController.validated(id);
                if (productFilesValidated === true) {
                    tags.push(_this.validationSuccessTag);
                }
                else if (productFilesValidated === false) {
                    tags.push(_this.validationErrorTag);
                }
            }
            if (_this.wishlistController &&
                _this.wishlistController.contains(id)) {
                tags.push(_this.wishlistedTag);
            }
            if (_this.gameDetailsController) {
                var gd = _this.gameDetailsController.getById(id);
                if (gd && gd.tags && gd.tags.length) {
                    for (var tt = 0; tt < gd.tags.length; tt++)
                        tags.push(gd.tags[tt].name.toLowerCase());
                }
            }
            return tags;
        };
        this.productsDataController = productsDataController;
        this.accountProductsController = accountProductsController;
        this.gameDetailsController = gameDetailsController;
        this.productFilesController = productFilesController;
        this.wishlistController = wishlistController;
    }
    return TagsController;
}());
exports.TagsController = TagsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnc0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL2RhdGFDb250cm9sbGVycy90YWdzQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBcUJBO0lBY0ksd0JBQ0ksc0JBQTRELEVBQzVELHlCQUEyRCxFQUMzRCxxQkFBMkQsRUFDM0Qsc0JBQStDLEVBQy9DLGtCQUFpRDtRQW5CekQsaUJBMkZDO1FBbkZHLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixhQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBQzdCLHlCQUFvQixHQUFHLE9BQU8sQ0FBQztRQUMvQix1QkFBa0IsR0FBRyxZQUFZLENBQUM7UUFlM0IsZUFBVSxHQUNqQjtZQUNJLElBQUksSUFBSSxHQUFHO2dCQUNQLEtBQUksQ0FBQyxNQUFNO2dCQUNYLEtBQUksQ0FBQyxRQUFRO2dCQUNiLEtBQUksQ0FBQyxhQUFhO2dCQUNsQixLQUFJLENBQUMsa0JBQWtCO2dCQUN2QixLQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRTdDLElBQUksV0FBVyxHQUFHLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzlCLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO2dCQUNsQixFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0JBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQUMsSUFBSSxDQUFD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