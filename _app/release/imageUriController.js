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
        this.getProductImageUri = function (uri) {
            var lastPart = _this.getImageLastPart(uri);
            return "_images/" + lastPart + ".png";
        };
        this.getScreenshotUri = function (uri) {
            var lastPart = _this.getImageLastPart(uri);
            return "_screenshots/" + lastPart;
        };
    }
    return ImageUriController;
}());
exports.ImageUriController = ImageUriController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VVcmlDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS9pbWFnZVVyaUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWFBO0lBQUE7SUFLQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLGlCQUFTLFlBS3JCLENBQUE7QUFFRDtJQUFBO1FBQUEsaUJBbUJDO1FBakJXLHFCQUFnQixHQUFHLFVBQUMsR0FBVztZQUNuQyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUE7UUFFTSx1QkFBa0IsR0FDekIsVUFBQyxHQUFXO1lBQ1IsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUMxQyxDQUFDLENBQUE7UUFFTSxxQkFBZ0IsR0FDdkIsVUFBQyxHQUFXO1lBQ1IsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksMEJBQWtCLHFCQW1COUIsQ0FBQSJ9