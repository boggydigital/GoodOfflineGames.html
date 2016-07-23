"use strict";
var GameDetailsViewController = (function () {
    function GameDetailsViewController(getIdDelegate, templateId, parentElement, viewController, productsController, 
        // imageUriController: IImageUriController,
        imageExpandController, imageLoadController) {
        this.showDetails = function (id) {
            var _this = this;
            var product = this.productsController.getById(id);
            var gameDetailsView = this.viewController.create(product, this.getIdDelegate, this.templateId);
            this.parentElement.innerHTML = gameDetailsView;
            // expand images
            this.imageExpandController.process(this.parentElement);
            // load images
            requestAnimationFrame(function () {
                _this.imageLoadController.process(_this.parentElement);
            });
        };
        this.getIdDelegate = getIdDelegate;
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.productsController = productsController;
        // this.imageUriController = imageUriController;
        this.imageExpandController = imageExpandController;
        this.imageLoadController = imageLoadController;
    }
    return GameDetailsViewController;
}());
exports.GameDetailsViewController = GameDetailsViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld0NvbnRyb2xsZXJzL2dhbWVEZXRhaWxzVmlld0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVVBO0lBV0ksbUNBQ0ksYUFBc0MsRUFDdEMsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBd0MsRUFDeEMsa0JBQW9EO1FBQ3BELDJDQUEyQztRQUMzQyxxQkFBZ0QsRUFDaEQsbUJBQThDO1FBVzNDLGdCQUFXLEdBQ2xCLFVBQVUsRUFBVTtZQUFwQixpQkFpQkM7WUFmRyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWxELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUM1QyxPQUFPLEVBQ1AsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXJCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztZQUUvQyxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkQsY0FBYztZQUNkLHFCQUFxQixDQUFDO2dCQUNsQixLQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQTVCRyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztRQUNuRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7SUFDbkQsQ0FBQztJQXFCTCxnQ0FBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFqRFksaUNBQXlCLDRCQWlEckMsQ0FBQSJ9