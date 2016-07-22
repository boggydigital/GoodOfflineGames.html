"use strict";
var ImageUris = (function () {
    function ImageUris() {
    }
    return ImageUris;
}());
exports.ImageUris = ImageUris;
var ImagesController = (function () {
    function ImagesController() {
        var _this = this;
        this.getImageLastPart = function (uri) {
            var imageParts = uri.split("/");
            return imageParts[imageParts.length - 1];
        };
        this.getProductImageUris = function (uri) {
            var lastPart = _this.getImageLastPart(uri);
            var imageUris = new ImageUris();
            imageUris.thumbnail = "_images/" + lastPart + "_196.jpg";
            imageUris.thumbnailRetina = "_images/" + lastPart + "_392.jpg";
            imageUris.hero = "_images/" + lastPart + "_800.jpg";
            imageUris.heroRetina = "_images/" + lastPart + ".jpg";
            return imageUris;
        };
        this.getScreenshotUri = function (uri) {
            var lastPart = _this.getImageLastPart(uri);
            return "_screenshots/" + lastPart + ".jpg";
        };
        this.load = function (container) {
            var images = container.querySelectorAll("img");
            for (var ii = 0; ii < images.length; ii++) {
                var dataSrcset = images[ii].getAttribute("data-srcset");
                var dataSrc = images[ii].getAttribute("data-src");
                images[ii].setAttribute("srcset", dataSrcset);
                images[ii].setAttribute("src", dataSrc);
                images[ii].classList.remove("hidden");
            }
        };
    }
    return ImagesController;
}());
exports.ImagesController = ImagesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld0NvbnRyb2xsZXJzL2ltYWdlc0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWtCQTtJQUFBO0lBTUEsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxpQkFBUyxZQU1yQixDQUFBO0FBRUQ7SUFBQTtRQUFBLGlCQXFDQztRQW5DVyxxQkFBZ0IsR0FBRyxVQUFDLEdBQVc7WUFDbkMsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFBO1FBRU0sd0JBQW1CLEdBQzFCLFVBQUMsR0FBVztZQUNSLElBQUksUUFBUSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUxQyxJQUFJLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsVUFBVSxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDekQsU0FBUyxDQUFDLGVBQWUsR0FBRyxVQUFVLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUMvRCxTQUFTLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQ3BELFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFFdEQsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDLENBQUE7UUFFTSxxQkFBZ0IsR0FDdkIsVUFBQyxHQUFXO1lBQ1IsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUMvQyxDQUFDLENBQUE7UUFFTSxTQUFJLEdBQ1gsVUFBQyxTQUFrQjtZQUNmLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQyxDQUFDO1FBQ0wsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQztBQXJDWSx3QkFBZ0IsbUJBcUM1QixDQUFBIn0=