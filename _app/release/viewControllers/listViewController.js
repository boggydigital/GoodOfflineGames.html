"use strict";
var ListViewController = (function () {
    function ListViewController(collection, getIdDelegate, templateId, parentElement, viewController, searchController, filterController, eventCallbackController) {
        var _this = this;
        // filterController: IFilterController;
        this.listContainerClass = "listContainer";
        this.searchResultsContainerClass = "searchResultsContainer";
        this.searchResultsLimit = 25;
        this.searchResultsCount = 0;
        this.searchResultsLimitedClass = "warning";
        this.searchResultsLimitedMessage = "Search results are limited to " +
            this.searchResultsLimit +
            " items";
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
        // 0. create child container objects for list and searchResultsContainer
        this.listContainer = document.createElement("ul");
        this.listContainer.classList.add(this.listContainerClass);
        this.searchResultsContainer = document.createElement("ul");
        this.searchResultsContainer.classList.add(this.searchResultsContainerClass);
        this.searchResultsContainer.classList.add("hidden");
        this.parentElement.appendChild(this.listContainer);
        this.parentElement.appendChild(this.searchResultsContainer);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFZpZXdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3Q29udHJvbGxlcnMvbGlzdFZpZXdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUEyQkE7SUErQkksNEJBQ0ksVUFBb0IsRUFDcEIsYUFBNkIsRUFDN0IsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBK0IsRUFDL0IsZ0JBQTZDLEVBQzdDLGdCQUE2QyxFQUM3Qyx1QkFBaUQ7UUF2Q3pELGlCQWdQQztRQTNPRyx1Q0FBdUM7UUFFdkMsdUJBQWtCLEdBQVcsZUFBZSxDQUFDO1FBQzdDLGdDQUEyQixHQUFXLHdCQUF3QixDQUFDO1FBRS9ELHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4Qix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsOEJBQXlCLEdBQVcsU0FBUyxDQUFDO1FBRTlDLGdDQUEyQixHQUMzQixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQjtZQUN2QixRQUFRLENBQUM7UUFFVCxzREFBc0Q7UUFDdEQsa0JBQWEsR0FBVyxVQUFVLENBQUM7UUFDbkMseUJBQW9CLEdBQUcsaUJBQWlCLENBQUM7UUFDekMseUJBQW9CLEdBQUcsaUJBQWlCLENBQUM7UUE4S2xDLG1CQUFjLEdBQTRCO1lBQzdDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckYsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUMzQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUNsRCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFB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