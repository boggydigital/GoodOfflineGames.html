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
            var requiredProducts = new Array();
            gameDetailsViewModel.id = id;
            gameDetailsViewModel.title = product.title;
            gameDetailsViewModel.publisher = "N/A";
            gameDetailsViewModel.developer = "N/A";
            gameDetailsViewModel.genres = "";
            gameDetailsViewModel.genresVisible = "hidden";
            gameDetailsViewModel.seriesVisible = "hidden";
            gameDetailsViewModel.requiredProductsVisible = "hidden";
            // gameDetailsViewModel.releaseDate = "";
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
                    if (productData.requiredProducts)
                        productData.requiredProducts.forEach(function (rp) { requiredProducts.push(rp.title); });
                }
            }
            gameDetailsViewModel.genres = genres.join(", ");
            gameDetailsViewModel.requiredProducts = requiredProducts.join(", ");
            // visibility
            if (genres.length > 0)
                gameDetailsViewModel.genresVisible = "";
            if (requiredProducts.length > 0)
                gameDetailsViewModel.requiredProductsVisible = "";
            if (gameDetailsViewModel.series)
                gameDetailsViewModel.seriesVisible = "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3TW9kZWxQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld01vZGVscy9nYW1lRGV0YWlsc1ZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTtJQUFBO0lBY0EsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSw0QkFBb0IsdUJBY2hDLENBQUE7QUFFRDtJQU9JLHNDQUNJLGdCQUFtQyxFQUNuQyxrQkFBb0QsRUFDcEQscUJBQTJELEVBQzNELHNCQUE0RDtRQU96RCxpQkFBWSxHQUNuQixVQUFVLEVBQVU7WUFFaEIsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRTVCLElBQUksb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBRXRELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNqQyxJQUFJLGdCQUFnQixHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFFM0Msb0JBQW9CLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUM3QixvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMzQyxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZDLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkMsb0JBQW9CLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNqQyxvQkFBb0IsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQzlDLG9CQUFvQixDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDOUMsb0JBQW9CLENBQUMsdUJBQXVCLEdB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