"use strict";
var GameDetailsViewController = (function () {
    function GameDetailsViewController(getIdDelegate, templateId, parentElement, viewController, productsController) {
        this.showDetails = function (id) {
            var product = this.productsController.getById(id);
            var gameDetailsView = this.viewController.create(product, this.getIdDelegate, this.templateId);
            this.parentElement.innerHTML = gameDetailsView;
        };
        // gameDetailsController: IProductsCoreController<GameDetails>) {
        this.getIdDelegate = getIdDelegate;
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        // this.gameDetailsController = gameDetailsController;
        this.productsController = productsController;
    }
    return GameDetailsViewController;
}());
exports.GameDetailsViewController = GameDetailsViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld0NvbnRyb2xsZXJzL2dhbWVEZXRhaWxzVmlld0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BO0lBU0ksbUNBQ0ksYUFBc0MsRUFDdEMsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBd0MsRUFDeEMsa0JBQW9EO1FBVWpELGdCQUFXLEdBQ2xCLFVBQVUsRUFBVTtZQUVoQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWxELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUM1QyxPQUFPLEVBQ1AsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXJCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztRQUNuRCxDQUFDLENBQUE7UUFwQkcsaUVBQWlFO1FBQ2pFLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDakQsQ0FBQztJQWNMLGdDQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQztBQXBDWSxpQ0FBeUIsNEJBb0NyQyxDQUFBIn0=