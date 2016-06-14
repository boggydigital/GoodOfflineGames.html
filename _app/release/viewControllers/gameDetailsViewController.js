"use strict";
var GameDetailsViewController = (function () {
    function GameDetailsViewController(templateId, parentElement, viewController, gameDetailsController) {
        this.showDetails = function (id) {
            var gameDetails = this.gameDetailsController.getById(id);
            var gameDetailsView = this.viewController.create(gameDetails, this.templateId);
            this.parentElement.innerHTML = gameDetailsView;
        };
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.gameDetailsController = gameDetailsController;
    }
    return GameDetailsViewController;
}());
exports.GameDetailsViewController = GameDetailsViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld0NvbnRyb2xsZXJzL2dhbWVEZXRhaWxzVmlld0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBO0lBT0ksbUNBQ0ksVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBK0IsRUFDL0IscUJBQTJEO1FBT3hELGdCQUFXLEdBQ2xCLFVBQVUsRUFBVTtZQUVoQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXpELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBQ25ELENBQUMsQ0FBQTtRQWJHLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztJQUN2RCxDQUFDO0lBVUwsZ0NBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLGlDQUF5Qiw0QkEwQnJDLENBQUEifQ==