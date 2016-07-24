"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var ExpandController = (function () {
    function ExpandController() {
        var _this = this;
        this.process = function (container) {
            var html = new Array();
            var expandableElements = container.querySelectorAll("[" + _this.attributeSelector + "]");
            for (var ii = 0; ii < expandableElements.length; ii++) {
                var dataItems = _this.expandElement(expandableElements[ii]);
                if (dataItems === null)
                    continue;
                dataItems.forEach(function (i) {
                    html.push(_this.getHTMLContent(i));
                });
                var parentElement = expandableElements[ii].parentElement;
                parentElement.removeChild(expandableElements[ii]);
                parentElement.innerHTML += html.join("");
            }
        };
        this.expandElement = function (element) {
            return null;
        };
        this.getHTMLContent = function (item) {
            return "";
        };
    }
    return ExpandController;
}());
var ImagesExpandController = (function (_super) {
    __extends(ImagesExpandController, _super);
    function ImagesExpandController(templateController, bindController) {
        var _this = this;
        _super.call(this);
        this.expandElement = function (element) {
            return element.getAttribute(_this.attributeSelector).split(",");
            ;
        };
        this.getHTMLContent = function (uri) {
            var imageUriViewModel = new ImageUriViewModel(uri);
            var template = _this.templateController.getTemplate("focusableImage");
            return _this.bindController.bindTemplateToModel(template, imageUriViewModel);
        };
        this.attributeSelector = "data-images";
        this.templateController = templateController;
        this.bindController = bindController;
    }
    return ImagesExpandController;
}(ExpandController));
exports.ImagesExpandController = ImagesExpandController;
var FileViewModel = (function () {
    function FileViewModel() {
    }
    return FileViewModel;
}());
var FilesExpandController = (function (_super) {
    __extends(FilesExpandController, _super);
    function FilesExpandController(templateController, bindController, languageController) {
        var _this = this;
        _super.call(this);
        this.expandElement = function (element) {
            var dataFiles = element.getAttribute("data-files");
            if (dataFiles === "{{files}}")
                return null;
            return JSON.parse(decodeURIComponent(dataFiles));
        };
        this.getHTMLContent = function (file) {
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
        this.attributeSelector = "data-files";
        this.templateController = templateController;
        this.bindController = bindController;
        this.languageController = languageController;
    }
    return FilesExpandController;
}(ExpandController));
exports.FilesExpandController = FilesExpandController;
var TabsController = (function () {
    function TabsController(imagesExpandController, imagesLoadController) {
        var _this = this;
        this.process = function (container) {
            var tabsList = container.querySelector(".tabs");
            if (!tabsList)
                return;
            tabsList.addEventListener("click", function (e) {
                var targetElement = e.target;
                if (!targetElement)
                    return;
                if (!targetElement.classList.contains("tab"))
                    return;
                // already selected - nothing more to do
                if (targetElement.classList.contains("selected"))
                    return;
                // hide previously selected tab content
                var csTab = tabsList.querySelector(".tab.selected");
                if (csTab)
                    csTab.classList.remove("selected");
                var csTabContent = _this.getContentByTag(csTab, container);
                if (csTabContent)
                    csTabContent.classList.add("hidden");
                // display new tab content
                targetElement.classList.add("selected");
                var newTabContent = _this.getContentByTag(targetElement, container);
                if (newTabContent) {
                    // if the tab is screenshots tab - expand images before display
                    if (newTabContent.getAttribute("for") === "screenshots") {
                        _this.imagesExpandController.process(newTabContent);
                        _this.imagesLoadController.process(newTabContent);
                    }
                    newTabContent.classList.remove("hidden");
                }
            });
        };
        this.getContentByTag = function (tab, container) {
            var tabContents = container.querySelectorAll(".tabContent");
            for (var ii = 0; ii < tabContents.length; ii++) {
                var forTab = tabContents[ii].getAttribute("for");
                if (tab.classList.contains(forTab))
                    return tabContents[ii];
            }
            return null;
        };
        this.imagesExpandController = imagesExpandController;
        this.imagesLoadController = imagesLoadController;
    }
    return TabsController;
}());
exports.TabsController = TabsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdFByb2Nlc3NpbmdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS9wb3N0UHJvY2Vzc2luZ0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBYUE7SUFBQTtRQUVXLFlBQU8sR0FDZCxVQUFDLFNBQWtCO1lBQ2YsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNsRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUM5QyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ1YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3hDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzNDLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQztvQkFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRSxDQUFDO1FBQ0wsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSw0QkFBb0IsdUJBbUJoQyxDQUFBO0FBRUQ7SUFHSSwyQkFBbUIsR0FBVztRQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQUVEO0lBQUE7UUFBQSxpQkE2QkM7UUF6QlUsWUFBTyxHQUNkLFVBQUMsU0FBa0I7WUFDZixJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQy9CLElBQUksa0JBQWtCLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDeEYsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDcEQsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDO29CQUFDLFFBQVEsQ0FBQztnQkFDakMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksYUFBYSxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztnQkFDekQsYUFBYSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxhQUFhLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVELGtCQUFhLEdBQ2IsVUFBQyxPQUFnQjtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFBO1FBRUQsbUJBQWMsR0FDZCxVQUFDLElBQU87WUFDSixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQTdCRCxJQTZCQztBQUVEO0lBQTRDLDBDQUF3QjtJQUtoRSxnQ0FDSSxrQkFBdUMsRUFDdkMsY0FBa0Q7UUFQMUQsaUJBeUJDO1FBakJPLGlCQUFPLENBQUM7UUFNWixrQkFBYSxHQUNiLFVBQUMsT0FBZ0I7WUFDYixNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQSxDQUFDO1FBQ3BFLENBQUMsQ0FBQTtRQUVELG1CQUFjLEdBQ2QsVUFBQyxHQUFXO1lBQ1IsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ELElBQUksUUFBUSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNyRSxNQUFNLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUNoRixDQUFDLENBQUE7UUFmRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBYUwsNkJBQUM7QUFBRCxDQUFDLEFBekJELENBQTRDLGdCQUFnQixHQXlCM0Q7QUF6QlksOEJBQXNCLHlCQXlCbEMsQ0FBQTtBQUVEO0lBQUE7SUFPQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVEO0lBQTJDLHlDQUE2QjtJQU1wRSwrQkFDSSxrQkFBdUMsRUFDdkMsY0FBOEMsRUFDOUMsa0JBQXVDO1FBVC9DLGlCQXlDQztRQS9CTyxpQkFBTyxDQUFDO1FBT1osa0JBQWEsR0FDYixVQUFDLE9BQWdCO1lBQ2IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssV0FBVyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUE7UUFFRCxtQkFBYyxHQUNkLFVBQUMsSUFBaUI7WUFDZCxJQUFJLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQ3hDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMvQixhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDbkMsYUFBYSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ3JELGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUUvQixhQUFhLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDN0IsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJO2dCQUNyQixhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUU5QixhQUFhLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdEYsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFBO1FBN0JHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztJQUNqRCxDQUFDO0lBMEJMLDRCQUFDO0FBQUQsQ0FBQyxBQXpDRCxDQUEyQyxnQkFBZ0IsR0F5QzFEO0FBekNZLDZCQUFxQix3QkF5Q2pDLENBQUE7QUFFRDtJQUtJLHdCQUNJLHNCQUFpRCxFQUNqRCxvQkFBK0M7UUFQdkQsaUJBbURDO1FBdkNVLFlBQU8sR0FDZCxVQUFDLFNBQWtCO1lBQ2YsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDdEIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7Z0JBQ2pDLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFpQixDQUFDO2dCQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztvQkFBQyxNQUFNLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFDO2dCQUNyRCx3Q0FBd0M7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQztnQkFFekQsdUNBQXVDO2dCQUN2QyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLElBQUksWUFBWSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7b0JBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZELDBCQUEwQjtnQkFDMUIsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3hDLElBQUksYUFBYSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUNoQiwrREFBK0Q7b0JBQy9ELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDdEQsS0FBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxhQUE0QixDQUFDLENBQUM7d0JBQ2xFLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsYUFBNEIsQ0FBQyxDQUFDO29CQUNwRSxDQUFDO29CQUNELGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFFRCxvQkFBZSxHQUNmLFVBQUMsR0FBWSxFQUFFLFNBQWtCO1lBQzdCLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1RCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDN0MsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvRCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7UUExQ0csSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO1FBQ3JELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztJQUNyRCxDQUFDO0lBeUNMLHFCQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQztBQW5EWSxzQkFBYyxpQkFtRDFCLENBQUEifQ==