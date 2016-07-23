"use strict";
var GameDetailsViewModel = (function () {
    function GameDetailsViewModel() {
    }
    return GameDetailsViewModel;
}());
exports.GameDetailsViewModel = GameDetailsViewModel;
var GameDetailsViewModelProvider = (function () {
    function GameDetailsViewModelProvider(productsController, gameDetailsController, productsDataController, productFilesController, imageUriController, screenshotsController) {
        var _this = this;
        this.getCdKeys = function (gameDetails) {
            var cdKeys = new Array();
            if (gameDetails.cdKey) {
                cdKeys.push(gameDetails.title + " " + gameDetails.cdKey);
            }
            if (gameDetails.dlcs) {
                gameDetails.dlcs.forEach(function (dlc) {
                    var dlcKeys = _this.getCdKeys(dlc);
                    if (dlcKeys)
                        dlcKeys.forEach(function (key) { cdKeys.push(key); });
                });
            }
            return cdKeys;
        };
        this.getViewModelById = function (id) {
            if (id == null)
                return null;
            var gdVM = new GameDetailsViewModel();
            var product = _this.productsController.getById(id);
            if (!product)
                return null;
            var genres = new Array();
            var requiredProducts = new Array();
            var worksOn = new Array();
            var dlcs = new Array();
            var visibilityClasses = new Array();
            gdVM.id = id;
            gdVM.title = product.title;
            gdVM.slug = product.slug;
            gdVM.publisher = "N/A";
            gdVM.developer = "N/A";
            var productImageUris = _this.imageUriController.getProductImageUris(product.image);
            gdVM.thumbnail = productImageUris.thumbnail;
            gdVM.thumbnailRetina = productImageUris.thumbnailRetina;
            gdVM.hero = productImageUris.hero;
            gdVM.heroRetina = productImageUris.heroRetina;
            if (_this.productsDataController) {
                var pd = _this.productsDataController.getById(id);
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
                else {
                    gdVM.slug = ""; // if there is no product data - links would be useless
                }
            }
            if (_this.gameDetailsController) {
                var gd = _this.gameDetailsController.getById(id);
                if (gd) {
                    var cdKey = _this.getCdKeys(gd);
                    gdVM.cdKey = cdKey.join("<br>");
                    gdVM.changelog = gd.changelog;
                }
            }
            if (_this.screenshotsController) {
                var screenshots = _this.screenshotsController.getScreenshotsById(id);
                if (screenshots &&
                    screenshots.length &&
                    screenshots.length > 0)
                    gdVM.screenshots = screenshots.join();
            }
            if (_this.productFilesController) {
                var files = _this.productFilesController.getAllById(id);
                if (files &&
                    files.length &&
                    files.length > 0)
                    gdVM.files = JSON.stringify(files);
            }
            ["Windows", "Mac", "Linux"].forEach(function (os) {
                if (product.worksOn[os])
                    worksOn.push(os);
            });
            gdVM.worksOn = worksOn.join(", ");
            gdVM.genres = genres.join(", ");
            gdVM.requiredProducts = requiredProducts.join(", ");
            gdVM.dlc = dlcs.join(", ");
            // visibility
            if (gdVM.genres)
                visibilityClasses.push("genres");
            if (gdVM.requiredProducts)
                visibilityClasses.push("requiredProducts");
            if (gdVM.slug)
                visibilityClasses.push("links");
            if (gdVM.dlc)
                visibilityClasses.push("dlc");
            if (gdVM.series)
                visibilityClasses.push("series");
            if (gdVM.cdKey)
                visibilityClasses.push("cdKey");
            if (gdVM.changelog)
                visibilityClasses.push("changelog");
            if (gdVM.files)
                visibilityClasses.push("files");
            if (gdVM.screenshots !== null &&
                gdVM.screenshots.length > 0)
                visibilityClasses.push("screenshots");
            gdVM.visibility = visibilityClasses.join(" ");
            return gdVM;
        };
        this.productsController = productsController;
        this.gameDetailsController = gameDetailsController;
        this.productsDataController = productsDataController;
        this.productFilesController = productFilesController;
        this.imageUriController = imageUriController;
        this.screenshotsController = screenshotsController;
    }
    return GameDetailsViewModelProvider;
}());
exports.GameDetailsViewModelProvider = GameDetailsViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3TW9kZWxQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld01vZGVscy9nYW1lRGV0YWlsc1ZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFTQTtJQUFBO0lBb0JBLENBQUM7SUFBRCwyQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksNEJBQW9CLHVCQW9CaEMsQ0FBQTtBQUVEO0lBU0ksc0NBQ0ksa0JBQW9ELEVBQ3BELHFCQUEyRCxFQUMzRCxzQkFBNEQsRUFDNUQsc0JBQTRELEVBQzVELGtCQUF1QyxFQUN2QyxxQkFBNkM7UUFmckQsaUJBd0lDO1FBaEhXLGNBQVMsR0FBRyxVQUFDLFdBQXdCO1lBQ3pDLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFFakMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzVELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUN4QixJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ1IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQztZQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7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