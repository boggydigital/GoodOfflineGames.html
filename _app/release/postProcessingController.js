"use strict";
var ImageLoadController = (function () {
    function ImageLoadController() {
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
    return ImageLoadController;
}());
exports.ImageLoadController = ImageLoadController;
var ImageExpandController = (function () {
    function ImageExpandController() {
        var _this = this;
        this.process = function (container) {
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
    return ImageExpandController;
}());
exports.ImageExpandController = ImageExpandController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdFByb2Nlc3NpbmdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS9wb3N0UHJvY2Vzc2luZ0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVNBO0lBQUE7UUFFVyxZQUFPLEdBQ2QsVUFBQyxTQUFrQjtZQUNmLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDYixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNWLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN4QyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUM7b0JBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckUsQ0FBQztRQUNMLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCwwQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksMkJBQW1CLHNCQW1CL0IsQ0FBQTtBQUVEO0lBQUE7UUFBQSxpQkF3QkM7UUF0QlUsWUFBTyxHQUNkLFVBQUMsU0FBa0I7WUFDZixJQUFJLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNuRTtnQkFDSSxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztvQkFDWixnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixDQUFDLENBQUMsQ0FBQztnQkFDSCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7WUFMbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFOzthQU0vQztRQUNMLENBQUMsQ0FBQTtRQUVPLHlCQUFvQixHQUM1QixVQUFDLEdBQVc7WUFFUixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsVUFBQyxDQUFDLElBQVEsQ0FBQyxDQUFDLE1BQTJCLENBQUMsS0FBSyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUM7WUFDaEUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCw0QkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4QlksNkJBQXFCLHdCQXdCakMsQ0FBQSJ9