import {IEventCallbackController, IAddEventCallbackDelegate} from "./eventCallbackController";
import {IViewController} from "./viewController";
import {ISearchController} from "./searchController";

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

export interface IListController {
    clearSelection: IClearSelectionDelegate;
    select: ISelectDelegate;
    selectByIndex: ISelectByIndexDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}

export class ListController<T> implements IListController {

    viewController: IViewController;
    eventCallbackController: IEventCallbackController;

    listContainerClass: string = "listContainer";
    searchResultsContainerClass: string = "searchResultsContainer";

    searchResultsLimit = 25;
    searchResultsCount = 0;
    searchResultsLimitedClass: string = "searchResultsLimited";

    searchResultsLimitedMessage: string = 
        "Search results are limited to " + 
        this.searchResultsLimit + 
        " items";

    selectedClass: string = "selected";
    selectedChangedEvent = "selectedChanged";
    selectedClearedEvent = "selectedCleared";

    parentElement: Element;

    listContainer: Element;
    searchResultsContainer: Element;

    activeView: Element;

    public constructor(
        collection: Array<T>,
        templateId: string,
        parentElement: Element,
        viewController: IViewController,
        searchController: ISearchController<T>,
        eventCallbackController: IEventCallbackController) {

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
        let viewCollection = new Array<string>();
        for (let ii = 0; ii < collection.length; ii++) {
            viewCollection.push(viewController.create(collection[ii], templateId));
        }

        // 2. add view to the container
        // first show initial N, than schedule (all - N) on next frame
        let n = 25;
        this.listContainer.innerHTML = viewCollection.slice(0, n).join("");

        requestAnimationFrame(() => {
            this.listContainer.innerHTML += viewCollection.join("");
        });

        // 3. add a selection click handler
        let that = this;
        this.parentElement.addEventListener("click", (e) => {
            let targetElement = e.target as Element;
            while (targetElement && !targetElement.classList.contains(templateId)) {
                targetElement = targetElement.parentElement ? targetElement.parentElement : undefined;
            }
            if (targetElement !== undefined) that.select(targetElement);
        });

        if (searchController) {
            // 4. build search index and add matching events
            searchController.index(collection);

            searchController.addEventCallback("matchStart", () => {
                that.listContainer.classList.add("hidden");
                that.searchResultsContainer.innerHTML = "";
                that.searchResultsCount = 0;
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
                    that.searchResultsContainer.appendChild(matchingElement.cloneNode(true));
                }
            });

            searchController.addEventCallback("cleared", () => {
                that.listContainer.classList.remove("hidden");
                that.searchResultsContainer.classList.add("hidden");
            });
        }

        this.activeView = this.listContainer;
    }

    public clearSelection: IClearSelectionDelegate = function (): void {
        var selectedElements = this.parentElement.getElementsByClassName(this.selectedClass);
        if (selectedElements === undefined) return;
        for (var ii = 0; ii < selectedElements.length; ii++) {
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

        this.eventCallbackController.fire(this.selectedChangedEvent, element);
    }

    public addEventCallback: IAddEventCallbackDelegate = function (event: string, callback: Function) {
        this.eventCallbackController.addEventCallback(event, callback);
    }
}