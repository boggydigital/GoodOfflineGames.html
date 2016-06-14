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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFZpZXdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3Q29udHJvbGxlcnMvbGlzdFZpZXdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUEyQkE7SUE0QkksNEJBQ0ksVUFBb0IsRUFDcEIsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBK0IsRUFDL0IsZ0JBQXNDLEVBQ3RDLHVCQUFpRDtRQWxDekQsaUJBbUpDO1FBOUlHLHVCQUFrQixHQUFXLGVBQWUsQ0FBQztRQUM3QyxnQ0FBMkIsR0FBVyx3QkFBd0IsQ0FBQztRQUUvRCx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLDhCQUF5QixHQUFXLHNCQUFzQixDQUFDO1FBRTNELGdDQUEyQixHQUN2QixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQjtZQUN2QixRQUFRLENBQUM7UUFFYixrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUNuQyx5QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztRQXNHbEMsbUJBQWMsR0FBNEI7WUFDN0MsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyRixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ2xELGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlELENBQUM7UUFDTCxD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