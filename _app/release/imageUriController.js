"use strict";
var ImageUris = (function () {
    function ImageUris() {
    }
    return ImageUris;
}());
exports.ImageUris = ImageUris;
var ImageUriController = (function () {
    function ImageUriController() {
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
            return "_screenshots/" + lastPart;
        };
    }
    return ImageUriController;
}());
exports.ImageUriController = ImageUriController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VVcmlDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS9pbWFnZVVyaUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWFBO0lBQUE7SUFLQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLGlCQUFTLFlBS3JCLENBQUE7QUFFRDtJQUFBO1FBQUEsaUJBeUJDO1FBdkJXLHFCQUFnQixHQUFHLFVBQUMsR0FBVztZQUNuQyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUE7UUFFTSx3QkFBbUIsR0FDMUIsVUFBQyxHQUFXO1lBQ1IsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTFDLElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDaEMsU0FBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUN6RCxTQUFTLENBQUMsZUFBZSxHQUFHLFVBQVUsR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQy9ELFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDcEQsU0FBUyxDQUFDLFVBQVUsR0FBRyxVQUFVLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQztZQUV0RCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUMsQ0FBQTtRQUVNLHFCQUFnQixHQUN2QixVQUFDLEdBQVc7WUFDUixJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7UUFDdEMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSwwQkFBa0IscUJBeUI5QixDQUFBIn0=