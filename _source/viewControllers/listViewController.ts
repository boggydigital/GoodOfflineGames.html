import {IEventCallbackController, IAddEventCallbackDelegate} from "../eventCallbackController";
import {IViewController} from "./viewController";
import {ISearchController} from "../searchController";
import {IFilterController} from "../filterController";
import {IGetIdDelegate} from "./viewController";

export interface IClearSelectionDelegate {
    (): void;
}

export interface ISelectDelegate {
    (element: Element): void;
}

export interface ISelectByIndexDelegate {
    (index: number): void;
}

export interface ISelectionChangedDelegate {
    (element: Element): void;
}

export interface IListViewController {
    clearSelection: IClearSelectionDelegate;
    select: ISelectDelegate;
    selectByIndex: ISelectByIndexDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}

export class ListViewController<T> implements IListViewController {

    viewController: IViewController;
    eventCallbackController: IEventCallbackController;

    filterController: IFilterController;

    listContainerClass: string = "listContainer";
    searchResultsContainerClass: string = "searchResultsContainer";

    searchResultsLimit = 25;
    searchResultsCount = 0;
    searchResultsLimitedClass: string = "warning";

    searchResultsLimitedMessage: string =
    "Search results are limited to " +
    this.searchResultsLimit +
    " items";

    // keyboardSelectedClass: string = "keyboardSelected";
    selectedClass: string = "selected";
    selectedChangedEvent = "selectedChanged";
    selectedClearedEvent = "selectedCleared";

    parentElement: Element;

    listContainer: Element;
    searchResultsContainer: Element;

    activeView: Element;

    public constructor(
        collection: Array<T>,
        getIdDelegate: IGetIdDelegate,
        templateId: string,
        parentElement: Element,
        viewController: IViewController,
        searchController: ISearchController<T>,
        filterController: IFilterController,
        eventCallbackController: IEventCallbackController) {

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

        let n = Math.min(25, collection.length);

        // 1. create the view of every element in the collection
        let viewCollection = new Array<string>();
        for (let ii = 0; ii < n; ii++)
            viewCollection.push(viewController.createById(
                collection[ii], getIdDelegate, templateId));

        // 2. add view to the container
        // first show initial N, than schedule (all - N) on next frame

        this.listContainer.innerHTML = viewCollection.join("");

        requestAnimationFrame(() => {
            viewCollection = new Array<string>();
            for (let ii = n; ii < collection.length; ii++)
                viewCollection.push(viewController.createById(
                    collection[ii],
                    getIdDelegate,
                    templateId));
            this.listContainer.innerHTML += viewCollection.join("");
        });

        // 3. add event handlers
        let that = this;
        this.parentElement.addEventListener("click", (e) => {
            let targetElement = e.target as Element;
            while (targetElement && !targetElement.classList.contains(templateId)) {
                targetElement = targetElement.parentElement ? targetElement.parentElement : undefined;
            }
            if (targetElement !== undefined) that.select(targetElement);
        });

        this.parentElement.addEventListener("keydown", (e: KeyboardEvent) => {
            const enterKeyCode: number = 13;
            const upKeyCode: number = 38;
            const downKeyCode: number = 40;
            // const rightKeyCode: number = 39;
            // const leftKeyCode: number = 37;

            let value = 0;

            if (e.keyCode === upKeyCode) value = -1;
            if (e.keyCode === downKeyCode) value = 1;

            if (value !== 0) {
                this.moveFocus(value);
                e.preventDefault();
                e.stopPropagation();
            }

            if (e.keyCode === enterKeyCode) {
                let focused = this.activeView.querySelector(":focus");
                this.select(focused);
            }
        });

        if (searchController) {

            // 4. build search index and add matching events
            requestAnimationFrame(() => {
                searchController.index(collection, getIdDelegate);
            });

            searchController.addEventCallback("matchStart", () => {
                that.clearSelection();
                that.listContainer.classList.add("hidden");
                that.filterController.hide();
                that.searchResultsContainer.innerHTML = "";
                that.searchResultsCount = 0;
                that.activeView = that.searchResultsContainer;
            });

            searchController.addEventCallback("matchEnd", () => {
                that.searchResultsContainer.classList.remove("hidden");

                // add notice that we display only searchLimit results

                if (that.searchResultsCount > that.searchResultsLimit) {

                    let searchResultsLimitedElement = document.createElement("div");
                    searchResultsLimitedElement.className = that.searchResultsLimitedClass;
                    searchResultsLimitedElement.textContent = that.searchResultsLimitedMessage;

                    that.searchResultsContainer.appendChild(searchResultsLimitedElement);
                }
            });

            searchController.addEventCallback("matched", (id) => {

                if (++that.searchResultsCount > that.searchResultsLimit) return;

                var matchingElement = that.listContainer.querySelector("[data-id='" + id + "']");
                if (matchingElement) {
                    // that.searchResultsCount++;
                    let matchedClone = matchingElement.cloneNode(true);
                    (matchedClone as Element).classList.remove("filtered");
                    that.searchResultsContainer.appendChild(matchedClone);
                };

            });

            searchController.addEventCallback("cleared", () => {
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
            let options = new Array<string>();
            let filterOptions = this.listContainer.querySelectorAll(".tags");
            for (let ii=0; ii<filterOptions.length; ii++) {
                let tagsTextContent = filterOptions[ii].textContent;
                if (tagsTextContent.indexOf("{{tags}}") > -1) continue;
                let splitTags = tagsTextContent.split(".");
                splitTags.forEach(t => {
                    if (options.indexOf(t) === -1) options.push(t);
                })
            }

            filterController.setFilters(options);

            filterController.addEventCallback("selectionChanged", filterOption => {

                let previouslyFiltered = this.listContainer.querySelectorAll(".filtered");
                for (let ii = 0; ii < previouslyFiltered.length; ii++) {
                    (previouslyFiltered[ii] as Element).classList.remove("filtered");
                }

                if (filterOption === "All") return;

                filterOption = filterOption.toLowerCase();

                let element = this.listContainer.firstElementChild;
                while (element) {
                    let tags = element.querySelector(".tags").textContent.toLowerCase();
                    if (tags.indexOf(filterOption) === -1) element.classList.add("filtered");
                    element = element.nextElementSibling;
                }
            });
        }

        this.activeView = this.listContainer;
    }

    public clearSelection: IClearSelectionDelegate = function (): void {
        var selectedElements = this.parentElement.getElementsByClassName(this.selectedClass);
        if (selectedElements === undefined) return;
        for (let ii = 0; ii < selectedElements.length; ii++) {
            selectedElements[ii].classList.remove(this.selectedClass);
        }
    }

    public selectByIndex: ISelectByIndexDelegate = function (index: number): void {
        var element = this.activeView.children[index];
        this.select(element);
    }

    public select: ISelectDelegate = function (element: Element): void {
        this.clearSelection();
        if (element === undefined || element === null) return;
        element.classList.add(this.selectedClass);

        var id = parseInt(element.getAttribute("data-id"));

        this.eventCallbackController.fire(this.selectedChangedEvent, id);
    }

    public moveFocus = function (value: number) {
        let focusedElement = this.activeView.querySelector(":focus");
        if (!focusedElement) focusedElement =
            this.activeView.querySelector("." + this.selectedClass);
        let nextKeyboardFocus = this.activeView.children[0];
        if (focusedElement) {
            switch (value) {
                case 1:
                    nextKeyboardFocus = this.getNextNotFilteredElementSibling(focusedElement);//focusedElement.nextElementSibling;
                    break;
                case -1:
                    nextKeyboardFocus = this.getPreviousNotFilteredElementSibling(focusedElement);//focusedElement.previousElementSibling;
                    break;
            }
        }
        if (nextKeyboardFocus) nextKeyboardFocus.focus();
    }

    getNextNotFilteredElementSibling =
    (element: Element): Element => {
        do {
            if (element.nextElementSibling) element = element.nextElementSibling;
            else break;
            if (!element.classList.contains('filtered')) break;
        } while (element)
        return element;
    }

    getPreviousNotFilteredElementSibling =
    (element: Element): Element => {
        do {
            if (element.previousElementSibling) element = element.previousElementSibling;
            else break;
            if (!element.classList.contains('filtered')) break;
        } while (element)
        return element;
    }

    public addEventCallback: IAddEventCallbackDelegate = function (event: string, callback: Function) {
        this.eventCallbackController.addEventCallback(event, callback);
    }
}