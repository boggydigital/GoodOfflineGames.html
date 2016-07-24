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
            var imagesHTML = new Array();
            var elementsToExpand = container.querySelectorAll("[data-images]");
            for (var ii = 0; ii < elementsToExpand.length; ii++) {
                var dataImages = elementsToExpand[ii].getAttribute("data-images").split(",");
                dataImages.forEach(function (i) {
                    imagesHTML.push(_this.getImageContent(i));
                });
                elementsToExpand[ii].parentElement.innerHTML += imagesHTML.join("");
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
var FileViewModel = (function () {
    function FileViewModel() {
    }
    return FileViewModel;
}());
var FilesExpandController = (function () {
    function FilesExpandController(templateController, bindController, languageController) {
        var _this = this;
        this.process = function (container) {
            var filesHTML = new Array();
            var elementsToExpand = container.querySelectorAll("[data-files]");
            for (var ii = 0; ii < elementsToExpand.length; ii++) {
                var dataFiles = elementsToExpand[ii].getAttribute("data-files");
                if (dataFiles === "{{files}}")
                    continue;
                var files = JSON.parse(decodeURIComponent(dataFiles));
                files.forEach(function (f) {
                    filesHTML.push(_this.getFileContent(f));
                });
                elementsToExpand[ii].parentElement.innerHTML += filesHTML.join("");
            }
        };
        this.getFileContent = function (file) {
            var fileViewModel = new FileViewModel();
            fileViewModel.file = file.file;
            fileViewModel.folder = file.folder;
            fileViewModel.operatingSystem = file.operatingSystem;
            fileViewModel.size = file.size;
            fileViewModel.name = (file.extra) ?
                "EXTRA: " + file.name :
                "INSTALLER: " + file.name;
            fileViewModel.language = _this.languageController.getLanguageNameByCode(file.language);
            var template = _this.templateController.getTemplate("fileLink");
            return _this.bindController.bindTemplateToModel(template, fileViewModel);
        };
        this.templateController = templateController;
        this.bindController = bindController;
        this.languageController = languageController;
    }
    return FilesExpandController;
}());
exports.FilesExpandController = FilesExpandController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdFByb2Nlc3NpbmdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS9wb3N0UHJvY2Vzc2luZ0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWFBO0lBQUE7UUFFVyxZQUFPLEdBQ2QsVUFBQyxTQUFrQjtZQUNmLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDYixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNWLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN4QyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUM7b0JBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxD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