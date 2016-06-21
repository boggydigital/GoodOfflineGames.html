"use strict";
var ImageUris = (function () {
    function ImageUris() {
    }
    return ImageUris;
}());
exports.ImageUris = ImageUris;
var ImagesController = (function () {
    function ImagesController() {
        this.getLocalUri = function (uri) {
            var imageParts = uri.split("/");
            var lastPart = imageParts[imageParts.length - 1];
            var imageUris = new ImageUris();
            imageUris.product = "_images/" + lastPart + "_800.jpg";
            imageUris.productRetina = "_images/" + lastPart + ".jpg";
            imageUris.screenshot = "_screenshots/" + lastPart;
            return imageUris;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld0NvbnRyb2xsZXJzL2ltYWdlc0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWFBO0lBQUE7SUFJQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLGlCQUFTLFlBSXJCLENBQUE7QUFFRDtJQUFBO1FBQ1csZ0JBQVcsR0FDbEIsVUFBQyxHQUFXO1lBRVAsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDdkQsU0FBUyxDQUFDLGFBQWEsR0FBRyxVQUFVLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQztZQUN6RCxTQUFTLENBQUMsVUFBVSxHQUFHLGVBQWUsR0FBRyxRQUFRLENBQUM7WUFFbkQsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDLENBQUE7UUFFTSxTQUFJLEdBQ1gsVUFBQyxTQUFrQjtZQUNmLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBQyxDQUFDLEVBQUMsRUFBRSxHQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQyxDQUFDO1FBQ0wsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSx3QkFBZ0IsbUJBeUI1QixDQUFBIn0=