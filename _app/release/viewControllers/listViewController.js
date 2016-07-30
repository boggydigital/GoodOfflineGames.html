"use strict";
var SearchResultsRemainingViewModel = (function () {
    function SearchResultsRemainingViewModel() {
    }
    return SearchResultsRemainingViewModel;
}());
var ListViewController = (function () {
    function ListViewController(collection, getIdDelegate, templateId, parentElement, viewController, searchController, filterController, templateController, bindController, eventCallbackController) {
        var _this = this;
        // filterController: IFilterController;
        this.listContainerClass = "listContainer";
        this.searchResultsContainerClass = "searchResultsContainer";
        this.searchResultsLimit = 25;
        this.searchResultsCount = 0;
        // keyboardSelectedClass: string = "keyboardSelected";
        this.selectedClass = "selected";
        this.selectedChangedEvent = "selectedChanged";
        this.selectedClearedEvent = "selectedCleared";
        this.clearSelection = function () {
            var selectedElements = this.parentElement.getElementsByClassName(this.selectedClass);
            if (selectedElements === undefined)
                return;
            for (var ii = 0; ii < selectedElements.length; ii++) {
                selectedElements[ii].classList.remove(this.selectedClass);
            }
        };
        this.selectByIndex = function (index) {
            var element = this.activeView.children[index];
            this.select(element);
        };
        this.select = function (element) {
            this.clearSelection();
            if (element === undefined || element === null)
                return;
            element.classList.add(this.selectedClass);
            var id = parseInt(element.id);
            this.eventCallbackController.fire(this.selectedChangedEvent, id);
        };
        this.moveFocus = function (value) {
            var focusedElement = this.activeView.querySelector(":focus");
            if (!focusedElement)
                focusedElement = this.activeView.querySelector("." + this.selectedClass);
            var nextKeyboardFocus = this.activeView.children[0];
            nextKeyboardFocus = this.getVisibleElementSibling(focusedElement, value);
            if (nextKeyboardFocus)
                nextKeyboardFocus.focus();
        };
        this.getVisibleElementSibling = function (element, direction) {
            if (!element)
                return null;
            do {
                element = direction > 0 ? element.nextElementSibling : element.previousElementSibling;
                if (element && !element.classList.contains('hidden'))
                    break;
            } while (element);
            return element;
        };
        this.addEventCallback = function (event, callback) {
            this.eventCallbackController.addEventCallback(event, callback);
        };
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.eventCallbackController = eventCallbackController;
        this.templateController = templateController;
        this.bindController = bindController;
        // 0. create child container objects for list and searchResultsContainer
        var innerHTML = new Array();
        innerHTML.push(this.templateController.getTemplate(this.listContainerClass));
        innerHTML.push(this.templateController.getTemplate(this.searchResultsContainerClass));
        this.parentElement.innerHTML += innerHTML.join("");
        this.listContainer = this.parentElement.getElementsByClassName(this.listContainerClass)[0];
        this.searchResultsContainer = this.parentElement.getElementsByClassName(this.searchResultsContainerClass)[0];
        var n = Math.min(25, collection.length);
        // 1. create the view of every element in the collection
        var viewCollection = new Array();
        for (var ii = 0; ii < n; ii++)
            viewCollection.push(viewController.createById(collection[ii], getIdDelegate, templateId));
        // 2. add view to the container
        // first show initial N, than schedule (all - N) on next frame
        this.listContainer.innerHTML = viewCollection.join("");
        requestAnimationFrame(function () {
            viewCollection = new Array();
            for (var ii = n; ii < collection.length; ii++)
                viewCollection.push(viewController.createById(collection[ii], getIdDelegate, templateId));
            _this.listContainer.innerHTML += viewCollection.join("");
        });
        // 3. add event handlers
        var that = this;
        this.parentElement.addEventListener("click", function (e) {
            var targetElement = e.target;
            while (targetElement && !targetElement.classList.contains(templateId)) {
                targetElement = targetElement.parentElement ? targetElement.parentElement : undefined;
            }
            if (targetElement !== undefined)
                that.select(targetElement);
        });
        this.parentElement.addEventListener("keydown", function (e) {
            var enterKeyCode = 13;
            var upKeyCode = 38;
            var downKeyCode = 40;
            // const rightKeyCode: number = 39;
            // const leftKeyCode: number = 37;
            var value = 0;
            if (e.keyCode === upKeyCode)
                value = -1;
            if (e.keyCode === downKeyCode)
                value = 1;
            if (value !== 0) {
                _this.moveFocus(value);
                e.preventDefault();
                e.stopPropagation();
            }
            if (e.keyCode === enterKeyCode) {
                var focused = _this.activeView.querySelector(":focus");
                _this.select(focused);
            }
        });
        if (searchController) {
            // 4. build search index and add matching events
            requestAnimationFrame(function () {
                searchController.index(collection, getIdDelegate);
            });
            searchController.addEventCallback("matchStart", function () {
                that.clearSelection();
                that.listContainer.classList.add("hidden");
                that.searchResultsContainer.innerHTML = "";
                that.searchResultsCount = 0;
                that.activeView = that.searchResultsContainer;
            });
            searchController.addEventCallback("matchEnd", function (matched) {
                that.searchResultsContainer.classList.remove("hidden");
                // add notice that we display only searchLimit results
                if (that.searchResultsCount > that.searchResultsLimit) {
                    var template = templateController.getTemplate("searchResultsRemaining");
                    var srrVM = new SearchResultsRemainingViewModel();
                    srrVM.searchResultsRemaining = matched - _this.searchResultsLimit;
                    var html = bindController.bindTemplateToModel(template, srrVM);
                    that.searchResultsContainer.innerHTML += html;
                }
            });
            searchController.addEventCallback("matched", function (id) {
                if (++that.searchResultsCount > that.searchResultsLimit)
                    return;
                var matchingElement = document.getElementById(id);
                if (matchingElement) {
                    // that.searchResultsCount++;
                    var matchedClone = matchingElement.cloneNode(true);
                    matchedClone.classList.remove("filtered");
                    that.searchResultsContainer.appendChild(matchedClone);
                }
                ;
            });
            searchController.addEventCallback("cleared", function () {
                that.listContainer.classList.remove("hidden");
                that.searchResultsContainer.classList.add("hidden");
                that.activeView = that.listContainer;
            });
        }
        if (filterController) {
            // 5. build filter index and add matching events
            requestAnimationFrame(function () {
                filterController.index(collection, getIdDelegate);
            });
            var clearFiltered_1 = function () {
                var filteredListItems = _this.listContainer.querySelectorAll(".hidden");
                for (var ii = 0; ii < filteredListItems.length; ii++)
                    filteredListItems[ii].classList.remove("hidden");
            };
            filterController.addEventCallback("filterAllStart", function () {
                clearFiltered_1();
            });
            filterController.addEventCallback("filterAllEnd", function (filtered) {
                filtered.forEach(function (id) {
                    var filteredListItem = document.getElementById(id);
                    if (filteredListItem)
                        filteredListItem.classList.add('hidden');
                });
            });
            filterController.addEventCallback("filterCleared", function () {
                clearFiltered_1();
            });
        }
        this.activeView = this.listContainer;
    }
    return ListViewController;
}());
exports.ListViewController = ListViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFZpZXdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3Q29udHJvbGxlcnMvbGlzdFZpZXdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUE2QkE7SUFBQTtJQUVBLENBQUM7SUFBRCxzQ0FBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRUQ7SUE0QkksNEJBQ0ksVUFBb0IsRUFDcEIsYUFBNkIsRUFDN0IsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBK0IsRUFDL0IsZ0JBQTZDLEVBQzdDLGdCQUE2QyxFQUM3QyxrQkFBdUMsRUFDdkMsY0FBZ0UsRUFDaEUsdUJBQWlEO1FBdEN6RCxpQkFtUEM7UUE5T0csdUNBQXVDO1FBRXZDLHVCQUFrQixHQUFXLGVBQWUsQ0FBQztRQUM3QyxnQ0FBMkIsR0FBVyx3QkFBd0IsQ0FBQztRQUUvRCx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLHNEQUFzRDtRQUN0RCxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUNuQyx5QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztRQXVMbEMsbUJBQWMsR0FBNEI7WUFDN0MsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyRixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ2xELGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlELENBQUM7UUFDTCxDQUFDLENBQUE7UUFFTSxrQkFBYSxHQUEyQixVQUFVLEtBQWE7WUFDbEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUE7UUFFTSxXQUFNLEdBQW9CLFVBQVUsT0FBZ0I7WUFDdkQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDdEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTFDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFOUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFBO1FBRU0sY0FBUyxHQUFHLFVBQVUsS0FBYTtZQUN0QyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztnQkFBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM5RixJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELGlCQUFpQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekUsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUM7Z0JBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckQsQ0FBQyxDQUFBO1FBRUQsNkJBQXdCLEdBQ3hCLFVBQUMsT0FBZ0IsRUFBRSxTQUFpQjtZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzFCLEdBQUcsQ0FBQztnQkFDQSxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDO2dCQUN0RixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7WUFDaEUsQ0FBQyxRQUFRLE9BQU8sRUFBQztZQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25CLENBQUMsQ0FBQTtRQUVNLHFCQUFnQixHQUE4QixVQUFVLEtBQWEsRUFBRSxRQUFrQjtZQUM1RixJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQTtRQTFNRyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLENBQUM7UUFFdkQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBRXJDLHdFQUF3RTtRQUN4RSxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1FBRXBDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQzdFLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO1FBRXRGLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4Qyx3REFBd0Q7UUFDeEQsSUFBSSxjQUFjLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQUN6QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDekIsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUN6QyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFFcEQsK0JBQStCO1FBQy9CLDhEQUE4RDtRQUU5RCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXZELHFCQUFxQixDQUFDO1lBQ2xCLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ3JDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7Z0JBQ3pDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FDekMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUNkLGFBQWEsRUFDYixVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFFSCx3QkFBd0I7UUFDeEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztZQUMzQyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBaUIsQ0FBQztZQUN4QyxPQUFPLGFBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BFLGFBQWEsR0FBRyxhQUFhLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBQzFGLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDO2dCQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLENBQWdCO1lBQzVELElBQU0sWUFBWSxHQUFXLEVBQUUsQ0FBQztZQUNoQyxJQUFNLFNBQVMsR0FBVyxFQUFFLENBQUM7WUFDN0IsSUFBTSxXQUFXLEdBQVcsRUFBRSxDQUFDO1lBQy9CLG1DQUFtQztZQUNuQyxrQ0FBa0M7WUFFbEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRWQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUM7Z0JBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssV0FBVyxDQUFDO2dCQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFekMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxPQUFPLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RELEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBRW5CLGdEQUFnRDtZQUNoRCxxQkFBcUIsQ0FBQztnQkFDbEIsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztZQUVILGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTtnQkFDNUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUVILGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFBLE9BQU87Z0JBQ2pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUV2RCxzREFBc0Q7Z0JBRXRELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUVwRCxJQUFJLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDeEUsSUFBSSxLQUFLLEdBQUcsSUFBSSwrQkFBK0IsRUFBRSxDQUFDO29CQUNsRCxLQUFLLENBQUMsc0JBQXNCLEdBQUcsT0FBTyxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQztvQkFDakUsSUFBSSxJQUFJLEdBQUcsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFL0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7Z0JBQ2xELENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLEVBQUU7Z0JBRTVDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztvQkFBQyxNQUFNLENBQUM7Z0JBRWhFLElBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLDZCQUE2QjtvQkFDN0IsSUFBSSxZQUFZLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEQsWUFBd0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN2RCxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMxRCxDQUFDO2dCQUFBLENBQUM7WUFFTixDQUFDLENBQUMsQ0FBQztZQUVILGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUVuQixnREFBZ0Q7WUFDaEQscUJBQXFCLENBQUM7Z0JBQ2xCLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLGVBQWEsR0FBRztnQkFDaEIsSUFBSSxpQkFBaUIsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2RSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7b0JBQ2hELGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDO1lBRUYsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2hELGVBQWEsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLFVBQUEsUUFBUTtnQkFDdEQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7b0JBQ2YsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNuRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuRSxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFDO1lBRUgsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO2dCQUMvQyxlQUFhLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDekMsQ0FBQztJQThDTCx5QkFBQztBQUFELENBQUMsQUFuUEQsSUFtUEM7QUFuUFksMEJBQWtCLHFCQW1QOUIsQ0FBQSJ9