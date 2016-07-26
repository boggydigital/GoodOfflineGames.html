"use strict";
var TagsController = (function () {
    function TagsController(productsDataController, ownedController, gameDetailsController, productFilesController, wishlistController) {
        var _this = this;
        // public getAllTags: IGetAllTagsDelegate =
        // (): Array<string> => {
        //     let tags = new Array<string>();
        //     if (!this.gameDetailsController) return tags;
        //     this.gameDetailsController.getAll().forEach(gd => {
        //         gd.tags.forEach(tag => {
        //             if (tags.indexOf(tag.name) === -1) tags.push(tag.name);
        //         })
        //     });
        //     return tags;
        // }
        this.getTags = function (id) {
            var tags = new Array();
            if (_this.productsDataController) {
                var productData = _this.productsDataController.getById(id);
                if (productData &&
                    productData.requiredProducts &&
                    productData.requiredProducts.length) {
                    tags.push("dlc");
                }
            }
            if (_this.ownedController &&
                _this.ownedController.getById(id)) {
                tags.push("owned");
            }
            if (_this.productFilesController) {
                var productFilesValidated = _this.productFilesController.validated(id);
                if (productFilesValidated === true) {
                    tags.push("data_ok");
                }
                else if (productFilesValidated === false) {
                    tags.push("check_data");
                }
            }
            if (_this.wishlistController &&
                _this.wishlistController.contains(id)) {
                tags.push("wishlisted");
            }
            if (_this.gameDetailsController) {
                var gd = _this.gameDetailsController.getById(id);
                if (gd && gd.tags && gd.tags.length) {
                    for (var tt = 0; tt < gd.tags.length; tt++)
                        tags.push(gd.tags[tt].name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnc0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL2RhdGFDb250cm9sbGVycy90YWdzQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBcUJBO0lBUUksd0JBQ0ksc0JBQTRELEVBQzVELGVBQWlELEVBQ2pELHFCQUEyRCxFQUMzRCxzQkFBK0MsRUFDL0Msa0JBQWlEO1FBYnpELGlCQThFQztRQXpERywyQ0FBMkM7UUFDM0MseUJBQXlCO1FBQ3pCLHNDQUFzQztRQUN0QyxvREFBb0Q7UUFFcEQsMERBQTBEO1FBQzFELG1DQUFtQztRQUNuQyxzRUFBc0U7UUFDdEUsYUFBYTtRQUNiLFVBQVU7UUFFVixtQkFBbUI7UUFDbkIsSUFBSTtRQUVHLFlBQU8sR0FDZCxVQUFDLEVBQVU7WUFFUCxJQUFJLElBQUksR0FBa0IsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUU5QyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLFdBQVcsR0FBRyxLQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxXQUFXO29CQUNYLFdBQVcsQ0FBQyxnQkFBZ0I7b0JBQzVCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixDQUFDO1lBQ0wsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxlQUFlO2dCQUNwQixLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUkscUJBQXFCLEdBQUcsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEUsRUFBRSxDQUFDLENBQUMscUJBQXFCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekIsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMscUJBQXFCLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztZQUNMLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsa0JBQWtCO2dCQUN2QixLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxFQUFFLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEQsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRTt3QkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFBO1FBL0RHLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztRQUNyRCxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7UUFDbkQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO1FBQ3JELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztJQUNqRCxDQUFDO0lBMkRMLHFCQUFDO0FBQUQsQ0FBQyxBQTlFRCxJQThFQztBQTlFWSxzQkFBYyxpQkE4RTFCLENBQUEifQ==