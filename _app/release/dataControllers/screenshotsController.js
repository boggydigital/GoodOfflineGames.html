"use strict";
var ScreenshotEntry = (function () {
    function ScreenshotEntry() {
    }
    return ScreenshotEntry;
}());
var ScreenshotsController = (function () {
    function ScreenshotsController(screenshots, imageUriController) {
        var _this = this;
        this.getScreenshotsById = function (id) {
            var result = new Array();
            _this.screenshots.forEach(function (e) {
                if (e.Key === id)
                    e.Value.forEach(function (s) {
                        result.push(_this.imageUriController.getScreenshotUri(s));
                    });
            });
            return result;
        };
        this.showFullscreen = function (element) {
            // alert(element);
            var sfContainer = document.getElementById("screenshotFullscreenContainer");
            sfContainer.innerHTML = "";
            sfContainer.appendChild(element.cloneNode());
            sfContainer.classList.remove("hidden");
        };
        this.screenshots = screenshots;
        this.imageUriController = imageUriController;
    }
    return ScreenshotsController;
}());
exports.ScreenshotsController = ScreenshotsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuc2hvdHNDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS9kYXRhQ29udHJvbGxlcnMvc2NyZWVuc2hvdHNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFlQTtJQUFBO0lBR0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFFRDtJQUtJLCtCQUFtQixXQUFtQyxFQUNsRCxrQkFBdUM7UUFOL0MsaUJBZ0NDO1FBckJVLHVCQUFrQixHQUN6QixVQUFDLEVBQVU7WUFDUCxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBRWpDLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztnQkFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUM7b0JBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO3dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFBO1lBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUE7UUFFTSxtQkFBYyxHQUNyQixVQUFDLE9BQXlCO1lBQ3RCLGtCQUFrQjtZQUNsQixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDM0UsV0FBVyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDM0IsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUM3QyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUE7UUF4QkcsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0lBQ2pELENBQUM7SUF1QkwsNEJBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDO0FBaENZLDZCQUFxQix3QkFnQ2pDLENBQUEifQ==