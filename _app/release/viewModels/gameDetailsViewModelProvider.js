"use strict";
var GameDetailsViewModel = (function () {
    function GameDetailsViewModel() {
    }
    return GameDetailsViewModel;
}());
exports.GameDetailsViewModel = GameDetailsViewModel;
var GameDetailsViewModelProvider = (function () {
    function GameDetailsViewModelProvider(imagesController, productsController, gameDetailsController, productsDataController) {
        this.getViewModel = function (id) {
            if (id == null)
                return null;
            var gameDetailsViewModel = new GameDetailsViewModel();
            var product = this.productsController.getById(id);
            var genres = new Array();
            gameDetailsViewModel.id = id;
            gameDetailsViewModel.title = product.title;
            gameDetailsViewModel.publisher = "N/A";
            gameDetailsViewModel.developer = "N/A";
            gameDetailsViewModel.genres = "";
            gameDetailsViewModel.genresVisible = "hidden";
            var productImageUris = this.imagesController.getLocalUri(product.image);
            gameDetailsViewModel.productImage = productImageUris.product;
            gameDetailsViewModel.productImageRetina = productImageUris.productRetina;
            if (this.productsDataController) {
                var productData = this.productsDataController.getById(id);
                if (productData) {
                    if (productData.publisher)
                        gameDetailsViewModel.publisher = productData.publisher.name;
                    if (productData.developer)
                        gameDetailsViewModel.developer = productData.developer.name;
                    if (productData.genres)
                        productData.genres.forEach(function (g) { genres.push(g.name); });
                }
            }
            // visibility
            if (genres.length > 0) {
                gameDetailsViewModel.genres = genres.join(", ");
                gameDetailsViewModel.genresVisible = "";
            }
            return gameDetailsViewModel;
        };
        this.imagesController = imagesController;
        this.productsController = productsController;
        this.gameDetailsController = gameDetailsController;
        this.productsDataController = productsDataController;
    }
    return GameDetailsViewModelProvider;
}());
exports.GameDetailsViewModelProvider = GameDetailsViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3TW9kZWxQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld01vZGVscy9nYW1lRGV0YWlsc1ZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTtJQUFBO0lBU0EsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSw0QkFBb0IsdUJBU2hDLENBQUE7QUFFRDtJQU9JLHNDQUNJLGdCQUFtQyxFQUNuQyxrQkFBb0QsRUFDcEQscUJBQTJELEVBQzNELHNCQUE0RDtRQU96RCxpQkFBWSxHQUNuQixVQUFVLEVBQVU7WUFFaEIsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRTVCLElBQUksb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBRXRELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUVqQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQzdCLG9CQUFvQixDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzNDLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkMsb0JBQW9CLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pDLG9CQUFvQixDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFFOUMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RSxvQkFBb0IsQ0FBQyxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1lBQzdELG9CQUFvQixDQUFDLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztZQUV6RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNkLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7d0JBQUMsb0JBQW9CLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO29CQUN2RixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO3dCQUFDLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDdkYsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQzt3QkFBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRixDQUFDO1lBQ0wsQ0FBQztZQUVELGFBQWE7WUFFYixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxvQkFBb0IsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQzVDLENBQUM7WUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDaEMsQ0FBQyxDQUFBO1FBNUNHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBQ25ELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztJQUN6RCxDQUFDO0lBeUNMLG1DQUFDO0FBQUQsQ0FBQyxBQXpERCxJQXlEQztBQXpEWSxvQ0FBNEIsK0JBeUR4QyxDQUFBIn0=