"use strict";
var TagsController = (function () {
    function TagsController(productsDataController, ownedController, gameDetailsController, productFilesController, wishlistController) {
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
            if (_this.ownedController &&
                _this.ownedController.getById(id)) {
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
        this.ownedController = ownedController;
        this.gameDetailsController = gameDetailsController;
        this.productFilesController = productFilesController;
        this.wishlistController = wishlistController;
    }
    return TagsController;
}());
exports.TagsController = TagsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnc0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL2RhdGFDb250cm9sbGVycy90YWdzQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBcUJBO0lBY0ksd0JBQ0ksc0JBQTRELEVBQzVELGVBQWlELEVBQ2pELHFCQUEyRCxFQUMzRCxzQkFBK0MsRUFDL0Msa0JBQWlEO1FBbkJ6RCxpQkEyRkM7UUFuRkcsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGFBQVEsR0FBRyxPQUFPLENBQUM7UUFDbkIsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFDN0IseUJBQW9CLEdBQUcsT0FBTyxDQUFDO1FBQy9CLHVCQUFrQixHQUFHLFlBQVksQ0FBQztRQWUzQixlQUFVLEdBQ2pCO1lBQ0ksSUFBSSxJQUFJLEdBQUc7Z0JBQ1AsS0FBSSxDQUFDLE1BQU07Z0JBQ1gsS0FBSSxDQUFDLFFBQVE7Z0JBQ2IsS0FBSSxDQUFDLGFBQWE7Z0JBQ2xCLEtBQUksQ0FBQyxrQkFBa0I7Z0JBQ3ZCLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFN0MsSUFBSSxXQUFXLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDOUIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7Z0JBQ2xCLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztvQkFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxJQUFJLENBQUMs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