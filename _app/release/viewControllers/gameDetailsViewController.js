"use strict";
var GameDetailsViewController = (function () {
    function GameDetailsViewController(getIdDelegate, templateId, parentElement, viewController, productsController, filesExpandController, imagesExpandController, imagesLoadController) {
        this.showDetails = function (id) {
            var _this = this;
            var product = this.productsController.getById(id);
            var gameDetailsView = this.viewController.createById(product, this.getIdDelegate, this.templateId);
            this.parentElement.innerHTML = gameDetailsView;
            // expand files
            this.filesExpandController.process(this.parentElement);
            // expand images
            this.imagesExpandController.process(this.parentElement);
            // load images
            requestAnimationFrame(function () {
                _this.imagesLoadController.process(_this.parentElement);
            });
        };
        this.getIdDelegate = getIdDelegate;
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.productsController = productsController;
        this.filesExpandController = filesExpandController;
        this.imagesExpandController = imagesExpandController;
        this.imagesLoadController = imagesLoadController;
    }
    return GameDetailsViewController;
}());
exports.GameDetailsViewController = GameDetailsViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld0NvbnRyb2xsZXJzL2dhbWVEZXRhaWxzVmlld0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVNBO0lBV0ksbUNBQ0ksYUFBNkIsRUFDN0IsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBK0IsRUFDL0Isa0JBQW9ELEVBQ3BELHFCQUFnRCxFQUNoRCxzQkFBaUQsRUFDakQsb0JBQStDO1FBVzVDLGdCQUFXLEdBQ2xCLFVBQVUsRUFBVTtZQUFwQixpQkFtQkM7WUFqQkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVsRCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FDaEQsT0FBTyxFQUNQLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVyQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7WUFFL0MsZUFBZTtZQUNmLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZELGdCQUFnQjtZQUNoQixJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RCxjQUFjO1lBQ2QscUJBQXFCLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBOUJHLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7UUFDbkQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO1FBQ3JELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztJQUNyRCxDQUFDO0lBdUJMLGdDQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQztBQW5EWSxpQ0FBeUIsNEJBbURyQyxDQUFBIn0=