"use strict";
var GameDetailsViewController = (function () {
    function GameDetailsViewController(getIdDelegate, templateId, parentElement, viewController, productsController, imagesController) {
        this.showDetails = function (id) {
            var _this = this;
            var product = this.productsController.getById(id);
            var gameDetailsView = this.viewController.create(product, this.getIdDelegate, this.templateId);
            this.parentElement.innerHTML = gameDetailsView;
            // expand images
            this.imagesController.expandCollection(this.parentElement);
            // load images
            requestAnimationFrame(function () {
                _this.imagesController.load(_this.parentElement);
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld0NvbnRyb2xsZXJzL2dhbWVEZXRhaWxzVmlld0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVNBO0lBU0ksbUNBQ0ksYUFBc0MsRUFDdEMsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBd0MsRUFDeEMsa0JBQW9ELEVBQ3BELGdCQUFtQztRQVNoQyxnQkFBVyxHQUNsQixVQUFVLEVBQVU7WUFBcEIsaUJBaUJDO1lBZkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVsRCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDNUMsT0FBTyxFQUNQLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVyQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7WUFFL0MsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0QsY0FBYztZQUNkLHFCQUFxQixDQUFDO2dCQUNsQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQTFCRyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0lBQzdDLENBQUM7SUFxQkwsZ0NBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDO0FBM0NZLGlDQUF5Qiw0QkEyQ3JDLENBQUEifQ==