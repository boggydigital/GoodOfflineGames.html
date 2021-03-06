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
            if (!_this.screenshots)
                return result;
            _this.screenshots.forEach(function (e) {
                if (e.id === id)
                    e.uris.forEach(function (s) {
                        result.push(_this.imageUriController.getScreenshotUri(s));
                    });
            });
            return result;
        };
        this.showFullscreen = function (element) {
            if (!element || !element.parentElement)
                return;
            var images = element.parentElement.querySelectorAll('img');
            var imageSources = new Array();
            for (var ii = 0; ii < images.length; ii++) {
                imageSources.push(images[ii].src);
            }
            var sfContainer = document.getElementById("screenshotFullscreenContainer");
            var fullscreenImage = sfContainer.querySelector("img");
            fullscreenImage.src = element.src;
            sfContainer.setAttribute('data-images', imageSources.join());
            sfContainer.classList.remove("hidden");
        };
        this.showNextPreviousFullscreenImage = function (sfContainer, direction) {
            var fullscreenImage = sfContainer.querySelector("img");
            var imageSources = sfContainer.getAttribute("data-images").split(",");
            var currentIndex = imageSources.indexOf(fullscreenImage.src);
            var nextIndex = currentIndex + direction;
            if (nextIndex < 0)
                nextIndex = imageSources.length - 1;
            if (nextIndex > imageSources.length - 1)
                nextIndex = 0;
            fullscreenImage.src = imageSources[nextIndex];
        };
        this.screenshots = screenshots;
        this.imageUriController = imageUriController;
        // initialize next / previous when we show fullscreen images
        var sfContainer = document.getElementById("screenshotFullscreenContainer");
        var previousNextButtons = sfContainer.querySelectorAll(".lnr");
        for (var ii = 0; ii < previousNextButtons.length; ii++) {
            previousNextButtons[ii].addEventListener("click", function (e) {
                _this.showNextPreviousFullscreenImage(sfContainer, e.target.classList.contains("lnr-arrow-left-circle") ?
                    /* previous */ -1 : 1);
                e.stopPropagation();
            });
        }
    }
    return ScreenshotsController;
}());
exports.ScreenshotsController = ScreenshotsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuc2hvdHNDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS9kYXRhQ29udHJvbGxlcnMvc2NyZWVuc2hvdHNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFlQTtJQUFBO0lBR0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFFRDtJQUtJLCtCQUFtQixXQUFtQyxFQUNsRCxrQkFBdUM7UUFOL0MsaUJBZ0VDO1FBeENVLHVCQUFrQixHQUN6QixVQUFDLEVBQVU7WUFDUCxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQztnQkFBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztnQkFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO3dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFBO1lBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUE7UUFFTSxtQkFBYyxHQUNyQixVQUFDLE9BQXlCO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDL0MsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzRCxJQUFJLFlBQVksR0FB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