"use strict";
var ListViewController = (function () {
    function ListViewController(collection, getIdDelegate, templateId, parentElement, viewController, searchController, filterController, eventCallbackController) {
        var _this = this;
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
                        nextKeyboardFocus = this.getNextNotFilteredElementSibling(focusedElement); //focusedElement.nextElementSibling;
                        break;
                    case -1:
                        nextKeyboardFocus = this.getPreviousNotFilteredElementSibling(focusedElement); //focusedElement.previousElementSibling;
                        break;
                }
            }
            if (nextKeyboardFocus)
                nextKeyboardFocus.focus();
        };
        this.getNextNotFilteredElementSibling = function (element) {
            do {
                if (element.nextElementSibling)
                    element = element.nextElementSibling;
                else
                    break;
                if (!element.classList.contains('filtered'))
                    break;
            } while (element);
            return element;
        };
        this.getPreviousNotFilteredElementSibling = function (element) {
            do {
                if (element.previousElementSibling)
                    element = element.previousElementSibling;
                else
                    break;
                if (!element.classList.contains('filtered'))
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
                that.filterController.hide();
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
                    // that.searchResultsCount++;
                    var matchedClone = matchingElement.cloneNode(true);
                    matchedClone.classList.remove("filtered");
                    that.searchResultsContainer.appendChild(matchedClone);
                }
                ;
            });
            searchController.addEventCallback("cleared", function () {
                that.listContainer.classList.remove("hidden");
                that.filterController.show();
                that.searchResultsContainer.classList.add("hidden");
                that.activeView = that.listContainer;
            });
        }
        if (filterController) {
            this.filterController = filterController;
            // set filter options
            // filterController.setFilters(["OWNED", "WISHLISTED", "DATA_OK", "COMPLETED", "BACKLOG"]);
            var options_1 = new Array();
            var filterOptions = this.listContainer.querySelectorAll(".tags");
            for (var ii = 0; ii < filterOptions.length; ii++) {
                var tagsTextContent = filterOptions[ii].textContent;
                if (tagsTextContent.indexOf("{{tags}}") > -1)
                    continue;
                var splitTags = tagsTextContent.split(".");
                splitTags.forEach(function (t) {
                    if (options_1.indexOf(t) === -1)
                        options_1.push(t);
                });
            }
            filterController.setFilters(options_1);
            filterController.addEventCallback("selectionChanged", function (filterOption) {
                var previouslyFiltered = _this.listContainer.querySelectorAll(".filtered");
                for (var ii = 0; ii < previouslyFiltered.length; ii++) {
                    previouslyFiltered[ii].classList.remove("filtered");
                }
                if (filterOption === "All")
                    return;
                filterOption = filterOption.toLowerCase();
                var element = _this.listContainer.firstElementChild;
                while (element) {
                    var tags = element.querySelector(".tags").textContent.toLowerCase();
                    if (tags.indexOf(filterOption) === -1)
                        element.classList.add("filtered");
                    element = element.nextElementSibling;
                }
            });
        }
        this.activeView = this.listContainer;
    }
    return ListViewController;
}());
exports.ListViewController = ListViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFZpZXdDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3Q29udHJvbGxlcnMvbGlzdFZpZXdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUE2QkE7SUErQkksNEJBQ0ksVUFBb0IsRUFDcEIsYUFBNkIsRUFDN0IsVUFBa0IsRUFDbEIsYUFBc0IsRUFDdEIsY0FBK0IsRUFDL0IsZ0JBQXNDLEVBQ3RDLGdCQUFtQyxFQUNuQyx1QkFBaUQ7UUF2Q3pELGlCQStRQztRQXhRRyx1QkFBa0IsR0FBVyxlQUFlLENBQUM7UUFDN0MsZ0NBQTJCLEdBQVcsd0JBQXdCLENBQUM7UUFFL0QsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUN2Qiw4QkFBeUIsR0FBVyxTQUFTLENBQUM7UUFFOUMsZ0NBQTJCLEdBQzNCLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsa0JBQWtCO1lBQ3ZCLFFBQVEsQ0FBQztRQUVULHNEQUFzRDtRQUN0RCxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUNuQyx5QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztRQXlMbEMsbUJBQWMsR0FBNEI7WUFDN0MsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyRixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ2xELGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxD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