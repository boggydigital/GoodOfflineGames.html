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
            return "_screenshots/" + lastPart;
        };
        this.load = function (container) {
            var images = container.querySelectorAll("img");
            for (var ii = 0; ii < images.length; ii++) {
                var dataSrcset = images[ii].getAttribute("data-srcset");
                var dataSrc = images[ii].getAttribute("data-src");
                if (dataSrcset) {
                    images[ii].setAttribute("srcset", dataSrcset);
                    images[ii].removeAttribute("data-srcset");
                }
                if (dataSrc) {
                    images[ii].setAttribute("src", dataSrc);
                    images[ii].removeAttribute("data-src");
                }
                if (dataSrc || dataSrcset)
                    images[ii].classList.remove("hidden");
            }
        };
        this.expandCollection = function (container) {
            var elementsToExpand = container.querySelectorAll("[data-images]");
            var _loop_1 = function(ii) {
                var images = elementsToExpand[ii].getAttribute("data-images").split(",");
                images.forEach(function (i) {
                    elementsToExpand[ii].parentElement.appendChild(_this.createFocusableImage(i));
                });
                elementsToExpand[ii].remove();
            };
            for (var ii = 0; ii < elementsToExpand.length; ii++) {
                _loop_1(ii);
            }
        };
        this.createFocusableImage = function (uri) {
            var img = document.createElement("img");
            img.setAttribute("data-src", uri);
            img.setAttribute("tabindex", "4");
            img.onclick = function (e) { e.target.focus(); };
            img.classList.add("hidden");
            return img;
        };
    }
    return ImagesController;
}());
exports.ImagesController = ImagesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19zb3VyY2UvaW1hZ2VzQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBbUJBO0lBQUE7SUFNQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGlCQUFTLFlBTXJCLENBQUE7QUFFRDtJQUFBO1FBQUEsaUJBaUVDO1FBL0RXLHFCQUFnQixHQUFHLFVBQUMsR0FBVztZQUNuQyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUE7UUFFTSx3QkFBbUIsR0FDMUIsVUFBQyxHQUFXO1lBQ1IsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTFDLElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDaEMsU0FBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUN6RCxTQUFTLENBQUMsZUFBZSxHQUFHLFVBQVUsR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQy9ELFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDcEQsU0FBUyxDQUFDLFVBQVUsR0FBRyxVQUFVLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQztZQUV0RCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUMsQ0FBQTtRQUVNLHFCQUFnQixHQUN2QixVQUFDLEdBQVc7WUFDUixJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7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