"use strict";
var ImagesLoadController = (function () {
    function ImagesLoadController() {
        this.process = function (container) {
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
    }
    return ImagesLoadController;
}());
exports.ImagesLoadController = ImagesLoadController;
var ImageUriViewModel = (function () {
    function ImageUriViewModel(uri) {
        this.uri = uri;
    }
    return ImageUriViewModel;
}());
var ImagesExpandController = (function () {
    function ImagesExpandController(templateController, bindController) {
        var _this = this;
        this.process = function (container) {
            var imagesContent = new Array();
            var elementsToExpand = container.querySelectorAll("[data-images]");
            for (var ii = 0; ii < elementsToExpand.length; ii++) {
                var images = elementsToExpand[ii].getAttribute("data-images").split(",");
                images.forEach(function (i) {
                    imagesContent.push(_this.getImageContent(i));
                });
                elementsToExpand[ii].parentElement.innerHTML += imagesContent.join("");
            }
        };
        this.getImageContent = function (uri) {
            var imageUriViewModel = new ImageUriViewModel(uri);
            var template = _this.templateController.getTemplate("focusableImage");
            return _this.bindController.bindTemplateToModel(template, imageUriViewModel);
        };
        this.templateController = templateController;
        this.bindController = bindController;
    }
    return ImagesExpandController;
}());
exports.ImagesExpandController = ImagesExpandController;
var FilesExpandController = (function () {
    function FilesExpandController() {
        this.process = function (container) {
            var elementsToExpand = container.querySelectorAll("[data-files]");
            for (var ii = 0; ii < elementsToExpand.length; ii++) {
                var filesContent = elementsToExpand[ii].getAttribute("data-files");
                if (filesContent === "{{files}}")
                    continue;
                var files = JSON.parse(decodeURIComponent(filesContent));
                files.forEach(function (f) {
                    console.log(f.file);
                });
            }
        };
    }
    return FilesExpandController;
}());
exports.FilesExpandController = FilesExpandController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdFByb2Nlc3NpbmdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS9wb3N0UHJvY2Vzc2luZ0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVlBO0lBQUE7UUFFVyxZQUFPLEdBQ2QsVUFBQyxTQUFrQjtZQUNmLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDYixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNWLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN4QyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUM7b0JBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckUsQ0FBQztRQUNMLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCwyQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksNEJBQW9CLHVCQW1CaEMsQ0FBQTtBQUVEO0lBR0ksMkJBQW1CLEdBQVc7UUFDMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFFRDtJQUtJLGdDQUNJLGtCQUF1QyxFQUN2QyxjQUFrRDtRQVAxRCxpQkErQkM7UUFuQlUsWUFBTyxHQUNkLFVBQUMsU0FBa0I7WUFDZixJQUFJLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ3hDLElBQUksZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ25FLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ2xELElBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pFLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO29CQUNaLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsQ0FBQztnQkFDSCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0UsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVPLG9CQUFlLEdBQ3ZCLFVBQUMsR0FBVztZQUNSLElBQUksaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckUsTUFBTSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDaEYsQ0FBQyxDQUFBO1FBdEJHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTtJQUN4QyxDQUFDO0lBcUJMLDZCQUFDO0FBQUQsQ0FBQyxBQS9CRCxJQStCQztBQS9CWSw4QkFBc0IseUJBK0JsQyxDQUFBO0FBRUQ7SUFBQTtRQUVXLFlBQU8sR0FDZCxVQUFDLFNBQWtCO1lBQ2YsSUFBSSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDL0MsSUFBSSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuRSxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssV0FBVyxDQUFDO29CQUFDLFFBQVEsQ0FBQztnQkFDM0MsSUFBSSxLQUFLLEdBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFFN0UsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQztRQUNMLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCw0QkFBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBZlksNkJBQXFCLHdCQWVqQyxDQUFBIn0=