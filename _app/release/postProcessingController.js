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
                expandableElements[ii].parentElement.innerHTML += html.join("");
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
    function TabsController() {
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
                if (newTabContent)
                    newTabContent.classList.remove("hidden");
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
    }
    return TabsController;
}());
exports.TabsController = TabsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdFByb2Nlc3NpbmdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS9wb3N0UHJvY2Vzc2luZ0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBYUE7SUFBQTtRQUVXLFlBQU8sR0FDZCxVQUFDLFNBQWtCO1lBQ2YsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNsRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUM5QyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ1YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3hDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzNDLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQztvQkFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRSxDQUFDO1FBQ0wsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSw0QkFBb0IsdUJBbUJoQyxDQUFBO0FBRUQ7SUFHSSwyQkFBbUIsR0FBVztRQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQUVEO0lBQUE7UUFBQSxpQkEyQkM7UUF2QlUsWUFBTyxHQUNkLFVBQUMsU0FBa0I7WUFDZixJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQy9CLElBQUksa0JBQWtCLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDeEYsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDcEQsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDO29CQUFDLFFBQVEsQ0FBQztnQkFDakMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2dCQUNILGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwRSxDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsa0JBQWEsR0FDYixVQUFDLE9BQWdCO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7UUFFRCxtQkFBYyxHQUNkLFVBQUMsSUFBTztZQUNKLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUE7SUFDTCxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDO0FBRUQ7SUFBNEMsMENBQXdCO0lBS2hFLGdDQUNJLGtCQUF1QyxFQUN2QyxjQUFrRDtRQVAxRCxpQkF5QkM7UUFqQk8saUJBQU8sQ0FBQztRQU1aLGtCQUFhLEdBQ2IsVUFBQyxPQUFnQjtZQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFBLENBQUM7UUFDcEUsQ0FBQyxDQUFBO1FBRUQsbUJBQWMsR0FDZCxVQUFDLEdBQVc7WUFDUixJQUFJLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkQsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQTtRQWZHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUM7UUFDdkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFhTCw2QkFBQztBQUFELENBQUMsQUF6QkQsQ0FBNEMsZ0JBQWdCLEdBeUIzRDtBQXpCWSw4QkFBc0IseUJBeUJsQyxDQUFBO0FBRUQ7SUFBQTtJQU9BLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBRUQ7SUFBMkMseUNBQTZCO0lBTXBFLCtCQUNJLGtCQUF1QyxFQUN2QyxjQUE4QyxFQUM5QyxrQkFBdUM7UUFUL0MsaUJBeUNDO1FBL0JPLGlCQUFPLENBQUM7UUFPWixrQkFBYSxHQUNiLFVBQUMsT0FBZ0I7WUFDYixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxXQUFXLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQTtRQUVELG1CQUFjLEdBQ2QsVUFBQyxJQUFpQjtZQUNkLElBQUksYUFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDeEMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQy9CLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNuQyxhQUFhLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDckQsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRS9CLGFBQWEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM3QixTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUk7Z0JBQ3JCLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRTlCLGFBQWEsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV0RixJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9ELE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUE7UUE3QkcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUE7UUFDcEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0lBQ2pELENBQUM7SUEwQkwsNEJBQUM7QUFBRCxDQUFDLEFBekNELENBQTJDLGdCQUFnQixHQXlDMUQ7QUF6Q1ksNkJBQXFCLHdCQXlDakMsQ0FBQTtBQUVEO0lBQUE7UUFBQSxpQkFpQ0M7UUFoQ1UsWUFBTyxHQUNkLFVBQUMsU0FBa0I7WUFDZixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUN0QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztnQkFDakMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLE1BQWlCLENBQUM7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO29CQUFDLE1BQU0sQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUM7Z0JBQ3JELHdDQUF3QztnQkFDeEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFDO2dCQUV6RCx1Q0FBdUM7Z0JBQ3ZDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3BELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxZQUFZLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztvQkFBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkQsMEJBQTBCO2dCQUMxQixhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxhQUFhLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ25FLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztvQkFBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVELG9CQUFlLEdBQ2YsVUFBQyxHQUFZLEVBQUUsU0FBa0I7WUFDN0IsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFDLENBQUMsRUFBQyxFQUFFLEdBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7QUFqQ1ksc0JBQWMsaUJBaUMxQixDQUFBIn0=