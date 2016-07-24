"use strict";
var GameDetailsViewController = (function () {
    function GameDetailsViewController(getIdDelegate, templateId, parentElement, viewController, productsController, tabsController, filesExpandController, 
        // imagesExpandController: IPostProcessingController,
        imagesLoadController) {
        this.showDetails = function (id) {
            var product = this.productsController.getById(id);
            var gameDetailsView = this.viewController.createById(product, this.getIdDelegate, this.templateId);
            this.parentElement.innerHTML = gameDetailsView;
            // activate tabs
            this.tabsController.process(this.parentElement);
            // expand files
            this.filesExpandController.process(this.parentElement);
            // expand images
            // this.imagesExpandController.process(this.parentElement);
            // load images
            // requestAnimationFrame(() => {
            this.imagesLoadController.process(this.parentElement);
            // });
        };
        this.getIdDelegate = getIdDelegate;
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.productsController = productsController;
        this.tabsController = tabsController;
        this.filesExpandController = filesExpandController;
        // this.imagesExpandController = imagesExpandController;
        this.imagesLoadController = imagesLoadController;
    }
    return GameDetailsViewController;
}());
exports.GameDetailsViewController = GameDetailsViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld0NvbnRyb2xsZXJzL2dhbWVEZXRhaWxzVmlld0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVNBO0lBWUksbUNBQ0ksYUFBNkIsRUFDN0IsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBK0IsRUFDL0Isa0JBQW9ELEVBQ3BELGNBQXlDLEVBQ3pDLHFCQUFnRDtRQUNoRCxxREFBcUQ7UUFDckQsb0JBQStDO1FBWTVDLGdCQUFXLEdBQ2xCLFVBQVUsRUFBVTtZQUVoQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWxELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUNoRCxPQUFPLEVBQ1AsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXJCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztZQUUvQyxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2hELGVBQWU7WUFDZixJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2RCxnQkFBZ0I7WUFDaEIsMkRBQTJEO1lBQzNELGNBQWM7WUFDZCxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEQsTUFBTTtRQUNWLENBQUMsQ0FBQTtRQWpDRyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBQ25ELHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7SUFDckQsQ0FBQztJQXlCTCxnQ0FBQztBQUFELENBQUMsQUF4REQsSUF3REM7QUF4RFksaUNBQXlCLDRCQXdEckMsQ0FBQSJ9