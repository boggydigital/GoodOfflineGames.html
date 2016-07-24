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
            // this.clearKeyboardSelection();
        };
        // public clearFocus: IClearSelectionDelegate = function (): void {
        //     var focusedElements = this.parentElement.querySelectorAll(":focus");
        //     if (!focusedElements) return;
        //     for (let ii = 0; ii < focusedElements.length; ii++) {
        //         keyboardSelectedElements[ii].classList.remove(this.keyboardSelectedClass);
        //     }
        // }
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
        this.moveFocus = function (value) {
            var focusedElement = this.activeView.querySelector(":focus");
            if (!focusedElement)
                focusedElement =
                    this.activeView.querySelector("." + this.selectedClass);
            var nextKeyboardFocus = this.activeView.children[0];
            if (focusedElement) {
                switch (value) {
                    case 1:
                        if (focusedElement.nextElementSibling)
                            nextKeyboardFocus = focusedElement.nextElementSibling;
                        break;
                    case -1:
                        if (focusedElement.previousElementSibling)
                            nextKeyboardFocus = focusedElement.previousElementSibling;
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
                // if (focusedElement) keyboardSelected.classList.remove(this.keyboardSelectedClass);
                nextKeyboardFocus.focus(); //classList.add(this.keyboardSelectedClass);
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
                value = e.shiftKey ? Number.MIN_VALUE : -1;
            if (e.keyCode === downKeyCode)
                value = e.shiftKey ? Number.MAX_VALUE : 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFZpZXdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3Q29udHJvbGxlcnMvbGlzdFZpZXdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUE0QkE7SUE2QkksNEJBQ0ksVUFBb0IsRUFDcEIsYUFBNkIsRUFDN0IsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBK0IsRUFDL0IsZ0JBQXNDLEVBQ3RDLHVCQUFpRDtRQXBDekQsaUJBK05DO1FBMU5HLHVCQUFrQixHQUFXLGVBQWUsQ0FBQztRQUM3QyxnQ0FBMkIsR0FBVyx3QkFBd0IsQ0FBQztRQUUvRCx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLDhCQUF5QixHQUFXLHNCQUFzQixDQUFDO1FBRTNELGdDQUEyQixHQUMzQixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQjtZQUN2QixRQUFRLENBQUM7UUFFVCxzREFBc0Q7UUFDdEQsa0JBQWEsR0FBVyxVQUFVLENBQUM7UUFDbkMseUJBQW9CLEdBQUcsaUJBQWlCLENBQUM7UUFDekMseUJBQW9CLEdBQUcsaUJBQWlCLENBQUM7UUE0SWxDLG1CQUFjLEdBQTRCO1lBQzdDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckYsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUMzQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUNsRCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENB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