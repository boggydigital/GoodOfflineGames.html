"use strict";
var ListViewController = (function () {
    function ListViewController(collection, getIdDelegate, templateId, parentElement, viewController, searchController, eventCallbackController) {
        var _this = this;
        this.listContainerClass = "listContainer";
        this.searchResultsContainerClass = "searchResultsContainer";
        this.searchResultsLimit = 25;
        this.searchResultsCount = 0;
        this.searchResultsLimitedClass = "searchResultsLimited";
        this.searchResultsLimitedMessage = "Search results are limited to " +
            this.searchResultsLimit +
            " items";
        this.keyboardSelectedClass = "keyboardSelected";
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
            this.clearKeyboardSelection();
        };
        this.clearKeyboardSelection = function () {
            var keyboardSelectedElements = this.parentElement.getElementsByClassName(this.keyboardSelectedClass);
            if (keyboardSelectedElements === undefined)
                return;
            for (var ii = 0; ii < keyboardSelectedElements.length; ii++) {
                keyboardSelectedElements[ii].classList.remove(this.keyboardSelectedClass);
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
        this.moveKeyboardSelection = function (value) {
            var keyboardSelected = this.activeView.querySelector("." + this.keyboardSelectedClass);
            if (!keyboardSelected)
                keyboardSelected =
                    this.activeView.querySelector("." + this.selectedClass);
            var nextKeyboardFocus = this.activeView.children[0];
            if (keyboardSelected) {
                switch (value) {
                    case 1:
                        if (keyboardSelected.nextElementSibling)
                            nextKeyboardFocus = keyboardSelected.nextElementSibling;
                        break;
                    case -1:
                        if (keyboardSelected.previousElementSibling)
                            nextKeyboardFocus = keyboardSelected.previousElementSibling;
                        break;
                    case Number.MIN_VALUE:
                        nextKeyboardFocus = this.activeView.children[0];
                        break;
                    case Number.MAX_VALUE:
                        nextKeyboardFocus = this.activeView.children[this.activeView.children.length - 1];
                        break;
                }
            }
            if (nextKeyboardFocus) {
                if (keyboardSelected)
                    keyboardSelected.classList.remove(this.keyboardSelectedClass);
                nextKeyboardFocus.classList.add(this.keyboardSelectedClass);
                nextKeyboardFocus.scrollIntoView(false);
            }
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
            viewCollection.push(viewController.create(collection[ii], getIdDelegate, templateId));
        // 2. add view to the container
        // first show initial N, than schedule (all - N) on next frame
        this.listContainer.innerHTML = viewCollection.join("");
        requestAnimationFrame(function () {
            viewCollection = new Array();
            for (var ii = n; ii < collection.length; ii++)
                viewCollection.push(viewController.create(collection[ii], getIdDelegate, templateId));
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
                value = e.shiftKey ? Number.MIN_VALUE : -1;
            if (e.keyCode === downKeyCode)
                value = e.shiftKey ? Number.MAX_VALUE : 1;
            if (value !== 0) {
                _this.moveKeyboardSelection(value);
                e.preventDefault();
                e.stopPropagation();
            }
            if (e.keyCode === enterKeyCode) {
                var keyboardSelected = _this.activeView.querySelector("." + _this.keyboardSelectedClass);
                _this.select(keyboardSelected);
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
                var matchingElement = that.listContainer.querySelector("[data-id='" + id + "']");
                if (matchingElement) {
                    var matchedClone = matchingElement.cloneNode(true);
                    that.searchResultsContainer.appendChild(matchedClone);
                }
            });
            searchController.addEventCallback("cleared", function () {
                that.listContainer.classList.remove("hidden");
                that.searchResultsContainer.classList.add("hidden");
                that.activeView = that.listContainer;
            });
        }
        this.activeView = this.listContainer;
    }
    return ListViewController;
}());
exports.ListViewController = ListViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFZpZXdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3Q29udHJvbGxlcnMvbGlzdFZpZXdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUE0QkE7SUE2QkksNEJBQ0ksVUFBb0IsRUFDcEIsYUFBZ0MsRUFDaEMsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBa0MsRUFDbEMsZ0JBQXNDLEVBQ3RDLHVCQUFpRDtRQXBDekQsaUJBZ09DO1FBM05HLHVCQUFrQixHQUFXLGVBQWUsQ0FBQztRQUM3QyxnQ0FBMkIsR0FBVyx3QkFBd0IsQ0FBQztRQUUvRCx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLDhCQUF5QixHQUFXLHNCQUFzQixDQUFDO1FBRTNELGdDQUEyQixHQUMzQixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQjtZQUN2QixRQUFRLENBQUM7UUFFVCwwQkFBcUIsR0FBVyxrQkFBa0IsQ0FBQztRQUNuRCxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUNuQyx5QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztRQTRJbEMsbUJBQWMsR0FBNEI7WUFDN0MsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyRixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ2xELGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMs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