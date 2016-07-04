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
            gameDetailsViewModel.seriesVisible = "hidden";
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
                    if (productData.series && productData.series.id > 0)
                        gameDetailsViewModel.series = productData.series.name;
                }
            }
            // visibility
            if (genres.length > 0) {
                gameDetailsViewModel.genres = genres.join(", ");
                gameDetailsViewModel.genresVisible = "";
            }
            if (gameDetailsViewModel.series) {
                gameDetailsViewModel.seriesVisible = "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3TW9kZWxQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld01vZGVscy9nYW1lRGV0YWlsc1ZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTtJQUFBO0lBV0EsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFYWSw0QkFBb0IsdUJBV2hDLENBQUE7QUFFRDtJQU9JLHNDQUNJLGdCQUFtQyxFQUNuQyxrQkFBb0QsRUFDcEQscUJBQTJELEVBQzNELHNCQUE0RDtRQU96RCxpQkFBWSxHQUNuQixVQUFVLEVBQVU7WUFFaEIsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRTVCLElBQUksb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBRXRELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUVqQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQzdCLG9CQUFvQixDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzNDLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkMsb0JBQW9CLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pDLG9CQUFvQixDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDOUMsb0JBQW9CLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUU5QyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hFLG9CQUFvQixDQUFDLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7WUFDN0Qsb0JBQW9CLENBQUMsa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO1lBRXpFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQzt3QkFBQyxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQ3ZGLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7d0JBQUMsb0JBQW9CLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO29CQUN2RixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO3dCQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pGLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUFDLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDL0csQ0FBQztZQUNMLENBQUM7WUFFRCxhQUFhO1lBRWIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEQsb0JBQW9CLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUM1QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsb0JBQW9CLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUM1QyxDQUFDO1lBRUQsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ2hDLENBQUMsQ0FBQTtRQWxERyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQzdDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztRQUNuRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUM7SUFDekQsQ0FBQztJQStDTCxtQ0FBQztBQUFELENBQUMsQUEvREQsSUErREM7QUEvRFksb0NBQTRCLCtCQStEeEMsQ0FBQSJ9