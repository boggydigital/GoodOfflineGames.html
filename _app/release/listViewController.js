"use strict";
var ListViewController = (function () {
    function ListViewController(collection, templateId, parentElement, viewController, searchController, eventCallbackController) {
        var _this = this;
        this.listContainerClass = "listContainer";
        this.searchResultsContainerClass = "searchResultsContainer";
        this.searchResultsLimit = 25;
        this.searchResultsCount = 0;
        this.searchResultsLimitedClass = "searchResultsLimited";
        this.searchResultsLimitedMessage = "Search results are limited to " +
            this.searchResultsLimit +
            " items";
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
            var id = parseInt(element.getAttribute("data-id"));
            this.eventCallbackController.fire(this.selectedChangedEvent, id);
        };
        this.addEventCallback = function (event, callback) {
            this.eventCallbackController.addEventCallback(event, callback);
        };
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.eventCallbackController = eventCallbackController;
        // 0. create child container objects for list and searchResultsContainer
        this.listContainer = document.createElement("div");
        this.listContainer.classList.add(this.listContainerClass);
        this.searchResultsContainer = document.createElement("div");
        this.searchResultsContainer.classList.add(this.searchResultsContainerClass);
        this.searchResultsContainer.classList.add("hidden");
        this.parentElement.appendChild(this.listContainer);
        this.parentElement.appendChild(this.searchResultsContainer);
        // 1. create the view of every element in the collection
        var viewCollection = new Array();
        for (var ii = 0; ii < collection.length; ii++) {
            viewCollection.push(viewController.create(collection[ii], templateId));
        }
        // 2. add view to the container
        // first show initial N, than schedule (all - N) on next frame
        var n = 25;
        this.listContainer.innerHTML = viewCollection.slice(0, n).join("");
        requestAnimationFrame(function () {
            _this.listContainer.innerHTML += viewCollection.join("");
        });
        // 3. add a selection click handler
        var that = this;
        this.parentElement.addEventListener("click", function (e) {
            var targetElement = e.target;
            while (targetElement && !targetElement.classList.contains(templateId)) {
                targetElement = targetElement.parentElement ? targetElement.parentElement : undefined;
            }
            if (targetElement !== undefined)
                that.select(targetElement);
        });
        if (searchController) {
            // 4. build search index and add matching events
            searchController.index(collection);
            searchController.addEventCallback("matchStart", function () {
                _this.clearSelection();
                that.listContainer.classList.add("hidden");
                that.searchResultsContainer.innerHTML = "";
                that.searchResultsCount = 0;
            });
            searchController.addEventCallback("matchEnd", function () {
                that.searchResultsContainer.classList.remove("hidden");
                // add notice that we display only searchLimit results
                if (that.searchResultsCount > that.searchResultsLimit) {
                    var searchResultsLimitedElement = document.createElement("div");
                    searchResultsLimitedElement.className = that.searchResultsLimitedClass;
                    searchResultsLimitedElement.textContent = that.searchResultsLimitedMessage;
                    that.searchResultsContainer.appendChild(searchResultsLimitedElement);
                }
            });
            searchController.addEventCallback("matched", function (id) {
                if (++that.searchResultsCount > that.searchResultsLimit)
                    return;
                var matchingElement = that.listContainer.querySelector("[data-id='" + id + "']");
                if (matchingElement) {
                    var matchedClone = matchingElement.cloneNode(true);
                    that.searchResultsContainer.appendChild(matchedClone);
                }
            });
            searchController.addEventCallback("cleared", function () {
                that.listContainer.classList.remove("hidden");
                that.searchResultsContainer.classList.add("hidden");
            });
        }
        this.activeView = this.listContainer;
    }
    return ListViewController;
}());
exports.ListViewController = ListViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFZpZXdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS9saXN0Vmlld0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQTJCQTtJQTRCSSw0QkFDSSxVQUFvQixFQUNwQixVQUFrQixFQUNsQixhQUFzQixFQUN0QixjQUErQixFQUMvQixnQkFBc0MsRUFDdEMsdUJBQWlEO1FBbEN6RCxpQkFtSkM7UUE5SUcsdUJBQWtCLEdBQVcsZUFBZSxDQUFDO1FBQzdDLGdDQUEyQixHQUFXLHdCQUF3QixDQUFDO1FBRS9ELHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4Qix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsOEJBQXlCLEdBQVcsc0JBQXNCLENBQUM7UUFFM0QsZ0NBQTJCLEdBQ3ZCLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsa0JBQWtCO1lBQ3ZCLFFBQVEsQ0FBQztRQUViLGtCQUFhLEdBQVcsVUFBVSxDQUFDO1FBQ25DLHlCQUFvQixHQUFHLGlCQUFpQixDQUFDO1FBQ3pDLHlCQUFvQixHQUFHLGlCQUFpQixDQUFDO1FBc0dsQyxtQkFBYyxHQUE0QjtZQUM3QyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3JGLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLFNBQVMsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDM0MsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDbEQsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDOUQsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVNLGtCQUFh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