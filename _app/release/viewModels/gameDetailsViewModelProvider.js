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
            var gdVM = new GameDetailsViewModel();
            var product = this.productsController.getById(id);
            if (!product)
                return null;
            var genres = new Array();
            var requiredProducts = new Array();
            var worksOn = new Array();
            var dlcs = new Array();
            gdVM.id = id;
            gdVM.title = product.title;
            gdVM.publisher = "N/A";
            gdVM.developer = "N/A";
            gdVM.genresVisibility = "hidden";
            gdVM.seriesVisibility = "hidden";
            gdVM.requiredProductsVisibility = "hidden";
            gdVM.dlcVisibility = "hidden";
            var productImageUris = this.imagesController.getLocalUri(product.image);
            gdVM.productImage = productImageUris.product;
            gdVM.productImageRetina = productImageUris.productRetina;
            if (this.productsDataController) {
                var pd = this.productsDataController.getById(id);
                if (pd) {
                    if (pd.publisher)
                        gdVM.publisher = pd.publisher.name;
                    if (pd.developer)
                        gdVM.developer = pd.developer.name;
                    if (pd.genres)
                        pd.genres.forEach(function (g) { genres.push(g.name); });
                    if (pd.series && pd.series.id > 0)
                        gdVM.series = pd.series.name;
                    if (pd.requiredProducts)
                        pd.requiredProducts.forEach(function (rp) { requiredProducts.push(rp.title); });
                    if (pd.dlcs)
                        pd.dlcs.forEach(function (dlc) { dlcs.push(dlc.title); });
                }
            }
            ["Windows", "Mac", "Linux"].forEach(function (os) { if (product.worksOn[os])
                worksOn.push(os); });
            gdVM.worksOn = worksOn.join(", ");
            gdVM.genres = genres.join(", ");
            gdVM.requiredProducts = requiredProducts.join(", ");
            gdVM.dlc = dlcs.join(", ");
            // visibility
            if (genres.length > 0)
                gdVM.genresVisibility = "";
            if (requiredProducts.length > 0)
                gdVM.requiredProductsVisibility = "";
            if (gdVM.series)
                gdVM.seriesVisibility = "";
            if (dlcs.length > 0)
                gdVM.dlcVisibility = "";
            return gdVM;
        };
        this.imagesController = imagesController;
        this.productsController = productsController;
        this.gameDetailsController = gameDetailsController;
        this.productsDataController = productsDataController;
    }
    return GameDetailsViewModelProvider;
}());
exports.GameDetailsViewModelProvider = GameDetailsViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3TW9kZWxQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld01vZGVscy9nYW1lRGV0YWlsc1ZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTtJQUFBO0lBZ0JBLENBQUM7SUFBRCwyQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQlksNEJBQW9CLHVCQWdCaEMsQ0FBQTtBQUVEO0lBT0ksc0NBQ0ksZ0JBQW1DLEVBQ25DLGtCQUFvRCxFQUNwRCxxQkFBMkQsRUFDM0Qsc0JBQTREO1FBT3pELGlCQUFZLEdBQ25CLFVBQVUsRUFBVTtZQUVoQixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBRXRDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUUxQixJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ2pDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUMzQyxJQUFJLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFFL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFD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