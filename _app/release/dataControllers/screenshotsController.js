"use strict";
var ScreenshotEntry = (function () {
    function ScreenshotEntry() {
    }
    return ScreenshotEntry;
}());
var ScreenshotsController = (function () {
    function ScreenshotsController(screenshots, imagesController) {
        var _this = this;
        this.getScreenshotsById = function (id) {
            var result = new Array();
            _this.screenshots.forEach(function (e) {
                if (e.Key === id)
                    e.Value.forEach(function (s) {
                        result.push(_this.imagesController.getScreenshotUri(s));
                    });
            });
            return result;
        };
        this.screenshots = screenshots;
        this.imagesController = imagesController;
    }
    return ScreenshotsController;
}());
exports.ScreenshotsController = ScreenshotsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuc2hvdHNDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS9kYXRhQ29udHJvbGxlcnMvc2NyZWVuc2hvdHNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFVQTtJQUFBO0lBR0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFFRDtJQUtJLCtCQUFtQixXQUFtQyxFQUNsRCxnQkFBbUM7UUFOM0MsaUJBeUJDO1FBZFUsdUJBQWtCLEdBQ3pCLFVBQUMsRUFBVTtZQUNQLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFFakMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO2dCQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQztvQkFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7d0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNELENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7WUFFRixNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUMsQ0FBQTtRQWZHLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUM3QyxDQUFDO0lBZ0JMLDRCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSw2QkFBcUIsd0JBeUJqQyxDQUFBIn0=