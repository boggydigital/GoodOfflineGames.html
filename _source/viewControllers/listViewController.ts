import {IEventCallbackController, IAddEventCallbackDelegate} from "../eventCallbackController";
import {IViewController} from "./viewController";
import {ISearchController} from "../searchController";
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

    viewController: IViewController<T>;
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

    keyboardSelectedClass: string = "keyboardSelected";
    selectedClass: string = "selected";
    selectedChangedEvent = "selectedChanged";
    selectedClearedEvent = "selectedCleared";

    parentElement: Element;

    listContainer: Element;
    searchResultsContainer: Element;

    activeView: Element;

    public constructor(
        collection: Array<T>,
        getIdDelegate: IGetIdDelegate<T>,
        templateId: string,
        parentElement: Element,
        viewController: IViewController<T>,
        searchController: ISearchController<T>,
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
            viewCollection.push(viewController.create(
                collection[ii], getIdDelegate, templateId));

        // 2. add view to the container
        // first show initial N, than schedule (all - N) on next frame

        this.listContainer.innerHTML = viewCollection.join("");

        requestAnimationFrame(() => {
            viewCollection = new Array<string>();
            for (let ii = n; ii < collection.length; ii++)
                viewCollection.push(viewController.create(
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

            if (e.keyCode === upKeyCode) value = e.shiftKey ? Number.MIN_VALUE : -1;
            if (e.keyCode === downKeyCode) value = e.shiftKey ? Number.MAX_VALUE : 1;

            if (value !== 0) {
                this.moveKeyboardSelection(value);
                e.preventDefault();
                e.stopPropagation();
            }

            if (e.keyCode === enterKeyCode) {
                let keyboardSelected = this.activeView.querySelector("." + this.keyboardSelectedClass);
                this.select(keyboardSelected);
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
                    let matchedClone = matchingElement.cloneNode(true);
                    that.searchResultsContainer.appendChild(matchedClone);
                }
            });

            searchController.addEventCallback("cleared", () => {
                that.listContainer.classList.remove("hidden");
                that.searchResultsContainer.classList.add("hidden");
                that.activeView = that.listContainer;
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
        this.clearKeyboardSelection();
    }

    public clearKeyboardSelection: IClearSelectionDelegate = function (): void {
        var keyboardSelectedElements = this.parentElement.getElementsByClassName(this.keyboardSelectedClass);
        if (keyboardSelectedElements === undefined) return;
        for (let ii = 0; ii < keyboardSelectedElements.length; ii++) {
            keyboardSelectedElements[ii].classList.remove(this.keyboardSelectedClass);
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

    public moveKeyboardSelection = function (value: number) {
        let keyboardSelected =
            this.activeView.querySelector("." + this.keyboardSelectedClass);
        if (!keyboardSelected) keyboardSelected =
            this.activeView.querySelector("." + this.selectedClass);
        let nextKeyboardFocus = this.activeView.children[0];
        if (keyboardSelected) {
            switch (value) {
                case 1: if (keyboardSelected.nextElementSibling)
                    nextKeyboardFocus = keyboardSelected.nextElementSibling;
                    break;
                case -1: if (keyboardSelected.previousElementSibling)
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
            if (keyboardSelected) keyboardSelected.classList.remove(this.keyboardSelectedClass);
            nextKeyboardFocus.classList.add(this.keyboardSelectedClass);
            (nextKeyboardFocus as HTMLElement).scrollIntoView(false);
        }
    }

    public addEventCallback: IAddEventCallbackDelegate = function (event: string, callback: Function) {
        this.eventCallbackController.addEventCallback(event, callback);
    }
}