import {IEventCallbackController, IAddEventCallbackDelegate} from "../eventCallbackController";
import {IViewController, IGetIdDelegate} from "./viewController";
import {IIndexMatchingController} from "../indexMatchingController";
import {ITemplateController} from "../templateController";
import {IBindController} from "../bindController";

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

class SearchResultsRemainingViewModel {
    searchResultsRemaining: number;
}

export class ListViewController<T> implements IListViewController {

    viewController: IViewController;
    eventCallbackController: IEventCallbackController;

    // filterController: IFilterController;

    listContainerClass: string = "listContainer";
    searchResultsContainerClass: string = "searchResultsContainer";

    searchResultsLimit = 25;
    searchResultsCount = 0;

    // keyboardSelectedClass: string = "keyboardSelected";
    selectedClass: string = "selected";
    selectedChangedEvent = "selectedChanged";
    selectedClearedEvent = "selectedCleared";

    parentElement: Element;

    listContainer: Element;
    searchResultsContainer: Element;

    templateController: ITemplateController;
    bindController: IBindController<SearchResultsRemainingViewModel>;

    activeView: Element;

    public constructor(
        collection: Array<T>,
        getIdDelegate: IGetIdDelegate,
        templateId: string,
        parentElement: Element,
        viewController: IViewController,
        searchController: IIndexMatchingController<T>,
        filterController: IIndexMatchingController<T>,
        templateController: ITemplateController,
        bindController: IBindController<SearchResultsRemainingViewModel>,
        eventCallbackController: IEventCallbackController) {

        this.parentElement = parentElement;
        this.viewController = viewController;
        this.eventCallbackController = eventCallbackController;

        this.templateController = templateController;
        this.bindController = bindController;

        // 0. create child container objects for list and searchResultsContainer
        let innerHTML = new Array<string>();

        innerHTML.push(this.templateController.getTemplate(this.listContainerClass));
        innerHTML.push(this.templateController.getTemplate(this.searchResultsContainerClass));

        this.parentElement.innerHTML += innerHTML.join("");

        this.listContainer = this.parentElement.getElementsByClassName(this.listContainerClass)[0];
        this.searchResultsContainer = this.parentElement.getElementsByClassName(this.searchResultsContainerClass)[0];

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
                that.searchResultsContainer.innerHTML = "";
                that.searchResultsCount = 0;
                that.activeView = that.searchResultsContainer;
            });

            searchController.addEventCallback("matchEnd", matched => {
                that.searchResultsContainer.classList.remove("hidden");

                // add notice that we display only searchLimit results

                if (that.searchResultsCount > that.searchResultsLimit) {

                    let template = templateController.getTemplate("searchResultsRemaining"); 
                    let srrVM = new SearchResultsRemainingViewModel();
                    srrVM.searchResultsRemaining = matched - this.searchResultsLimit;
                    let html = bindController.bindTemplateToModel(template, srrVM);

                    that.searchResultsContainer.innerHTML += html;
                }
            });

            searchController.addEventCallback("matched", (id) => {

                if (++that.searchResultsCount > that.searchResultsLimit) return;

                var matchingElement = document.getElementById(id);
                if (matchingElement) {
                    // that.searchResultsCount++;
                    let matchedClone = matchingElement.cloneNode(true);
                    (matchedClone as Element).classList.remove("filtered");
                    that.searchResultsContainer.appendChild(matchedClone);
                };

            });

            searchController.addEventCallback("cleared", () => {
                that.listContainer.classList.remove("hidden");
                that.searchResultsContainer.classList.add("hidden");
                that.activeView = that.listContainer;
            });
        }

        if (filterController) {

            // 5. build filter index and add matching events
            requestAnimationFrame(() => {
                filterController.index(collection, getIdDelegate);
            });

            let clearFiltered = () => {
                let filteredListItems = this.listContainer.querySelectorAll(".hidden");
                for (let ii = 0; ii < filteredListItems.length; ii++)
                    filteredListItems[ii].classList.remove("hidden");
            };

            filterController.addEventCallback("filterAllStart", () => {
                clearFiltered();
            });

            filterController.addEventCallback("filterAllEnd", filtered => {
                filtered.forEach(id => {
                    let filteredListItem = document.getElementById(id);
                    if (filteredListItem) filteredListItem.classList.add('hidden');
                })
            });

            filterController.addEventCallback("filterCleared", () => {
                clearFiltered();
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

        var id = parseInt(element.id);

        this.eventCallbackController.fire(this.selectedChangedEvent, id);
    }

    public moveFocus = function (value: number) {
        let focusedElement = this.activeView.querySelector(":focus");
        if (!focusedElement) focusedElement = this.activeView.querySelector("." + this.selectedClass);
        let nextKeyboardFocus = this.activeView.children[0];
        nextKeyboardFocus = this.getVisibleElementSibling(focusedElement, value);
        if (nextKeyboardFocus) nextKeyboardFocus.focus();
    }

    getVisibleElementSibling =
    (element: Element, direction: number): Element => {
        if (!element) return null;
        do {
            element = direction > 0 ? element.nextElementSibling : element.previousElementSibling;
            if (element && !element.classList.contains('hidden')) break;
        } while (element)
        return element;
    }

    public addEventCallback: IAddEventCallbackDelegate = function (event: string, callback: Function) {
        this.eventCallbackController.addEventCallback(event, callback);
    }
}