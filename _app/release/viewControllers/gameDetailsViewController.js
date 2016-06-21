"use strict";
var GameDetailsViewController = (function () {
    function GameDetailsViewController(getIdDelegate, templateId, parentElement, viewController, productsController, imagesController) {
        this.showDetails = function (id) {
            var product = this.productsController.getById(id);
            var gameDetailsView = this.viewController.create(product, this.getIdDelegate, this.templateId);
            this.parentElement.innerHTML = gameDetailsView;
            // devirtualize images
            this.imagesController.load(this.parentElement);
        };
        this.getIdDelegate = getIdDelegate;
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.productsController = productsController;
        this.imagesController = imagesController;
    }
    return GameDetailsViewController;
}());
exports.GameDetailsViewController = GameDetailsViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld0NvbnRyb2xsZXJzL2dhbWVEZXRhaWxzVmlld0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVNBO0lBU0ksbUNBQ0ksYUFBc0MsRUFDdEMsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBd0MsRUFDeEMsa0JBQW9ELEVBQ3BELGdCQUFtQztRQVNoQyxnQkFBVyxHQUNsQixVQUFVLEVBQVU7WUFFaEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVsRCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDNUMsT0FBTyxFQUNQLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVyQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7WUFFL0Msc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQTtRQXRCRyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0lBQzdDLENBQUM7SUFpQkwsZ0NBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBdkNZLGlDQUF5Qiw0QkF1Q3JDLENBQUEifQ==