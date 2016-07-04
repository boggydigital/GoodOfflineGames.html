"use strict";
var TagsController = (function () {
    function TagsController(productsDataController, ownedController, gameDetailsController, productFilesController, wishlistController) {
        this.getTags = function (id) {
            var tags = new Array();
            if (this.productsDataController) {
                var productData = this.productsDataController.getById(id);
                if (productData &&
                    productData.requiredProducts &&
                    productData.requiredProducts.length) {
                    tags.push("dlc");
                }
            }
            if (this.ownedController &&
                this.ownedController.getById(id)) {
                tags.push("owned");
            }
            if (this.productFilesController) {
                var productFilesValidated = this.productFilesController.validated(id);
                if (productFilesValidated === true) {
                    tags.push("data_ok");
                }
                else if (productFilesValidated === false) {
                    tags.push("check_data");
                }
            }
            if (this.wishlistController &&
                this.wishlistController.contains(id)) {
                tags.push("wishlisted");
            }
            if (this.gameDetailsController) {
                var gd = this.gameDetailsController.getById(id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnc0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL2RhdGFDb250cm9sbGVycy90YWdzQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBZ0JBO0lBUUksd0JBQ0ksc0JBQTRELEVBQzVELGVBQWlELEVBQ2pELHFCQUEyRCxFQUMzRCxzQkFBK0MsRUFDL0Msa0JBQWlEO1FBUTlDLFlBQU8sR0FDZCxVQUFVLEVBQVU7WUFFaEIsSUFBSSxJQUFJLEdBQWtCLElBQUksS0FBSyxFQUFVLENBQUM7WUFFOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDMUQsRUFBRSxDQUFDLENBQUMsV0FBVztvQkFDWCxXQUFXLENBQUMsZ0JBQWdCO29CQUM1QixXQUFXLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckIsQ0FBQztZQUNMLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZTtnQkFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLHFCQUFxQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzVCLENBQUM7WUFDTCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtnQkFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hELEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7d0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztZQUNMLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQWpERyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBQ25ELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztRQUNyRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDakQsQ0FBQztJQTZDTCxxQkFBQztBQUFELENBQUMsQUFoRUQsSUFnRUM7QUFoRVksc0JBQWMsaUJBZ0UxQixDQUFBIn0=