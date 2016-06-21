"use strict";
var GameDetailsViewModel = (function () {
    function GameDetailsViewModel() {
    }
    return GameDetailsViewModel;
}());
exports.GameDetailsViewModel = GameDetailsViewModel;
var GameDetailsViewModelProvider = (function () {
    function GameDetailsViewModelProvider(imagesController, productsController, productsDataController) {
        this.getViewModel = function (id) {
            if (id == null)
                return null;
            var gameDetailsViewModel = new GameDetailsViewModel();
            var product = this.productsController.getById(id);
            gameDetailsViewModel.id = id;
            gameDetailsViewModel.title = product.title;
            gameDetailsViewModel.publisher = "N/A";
            gameDetailsViewModel.developer = "N/A";
            var productImageUris = this.imagesController.getLocalUri(product.image);
            gameDetailsViewModel.productImage = productImageUris.product;
            gameDetailsViewModel.productImageRetina = productImageUris.productRetina;
            if (this.productsDataController) {
                var productData = this.productsDataController.getById(id);
                if (productData && productData.publisher)
                    gameDetailsViewModel.publisher = productData.publisher.name;
                if (productData && productData.developer)
                    gameDetailsViewModel.developer = productData.developer.name;
            }
            return gameDetailsViewModel;
        };
        this.imagesController = imagesController;
        this.productsController = productsController;
        this.productsDataController = productsDataController;
    }
    return GameDetailsViewModelProvider;
}());
exports.GameDetailsViewModelProvider = GameDetailsViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3TW9kZWxQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld01vZGVscy9nYW1lRGV0YWlsc1ZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQTtJQUFBO0lBT0EsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSw0QkFBb0IsdUJBT2hDLENBQUE7QUFFRDtJQU1JLHNDQUNJLGdCQUFtQyxFQUNuQyxrQkFBb0QsRUFDcEQsc0JBQTREO1FBTXpELGlCQUFZLEdBQ25CLFVBQVUsRUFBVTtZQUVoQixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFNUIsSUFBSSxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFFdEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVsRCxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQzdCLG9CQUFvQixDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzNDLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkMsb0JBQW9CLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV2QyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hFLG9CQUFvQixDQUFDLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7WUFDN0Qsb0JBQW9CLENBQUMsa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO1lBR3pFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDO29CQUFDLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDdEcsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUM7b0JBQUMsb0JBQW9CLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQzFHLENBQUM7WUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDaEMsQ0FBQyxDQUFBO1FBL0JHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO0lBQ3pELENBQUM7SUE2QkwsbUNBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDO0FBMUNZLG9DQUE0QiwrQkEwQ3hDLENBQUEifQ==