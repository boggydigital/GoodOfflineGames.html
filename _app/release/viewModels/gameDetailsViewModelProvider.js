"use strict";
var GameDetailsViewModel = (function () {
    function GameDetailsViewModel() {
    }
    return GameDetailsViewModel;
}());
exports.GameDetailsViewModel = GameDetailsViewModel;
var GameDetailsViewModelProvider = (function () {
    function GameDetailsViewModelProvider(productsController) {
        this.getViewModel = function (id) {
            if (id == null)
                return null;
            var product = this.productsController.getById(id);
            var gameDetailsViewModel = new GameDetailsViewModel();
            gameDetailsViewModel.id = id;
            gameDetailsViewModel.title = product.title;
            return gameDetailsViewModel;
        };
        this.productsController = productsController;
    }
    return GameDetailsViewModelProvider;
}());
exports.GameDetailsViewModelProvider = GameDetailsViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3TW9kZWxQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld01vZGVscy9nYW1lRGV0YWlsc1ZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQTtJQUFBO0lBR0EsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSw0QkFBb0IsdUJBR2hDLENBQUE7QUFFRDtJQUlJLHNDQUFtQixrQkFBb0Q7UUFJaEUsaUJBQVksR0FDbkIsVUFBVSxFQUFVO1lBRWhCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWxELElBQUksb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBRXRELG9CQUFvQixDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDN0Isb0JBQW9CLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFFM0MsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ2hDLENBQUMsQ0FBQTtRQWhCRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDakQsQ0FBQztJQWdCTCxtQ0FBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUF0Qlksb0NBQTRCLCtCQXNCeEMsQ0FBQSJ9