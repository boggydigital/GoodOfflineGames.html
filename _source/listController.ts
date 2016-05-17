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

    selectedClass: string = "selected";
    selectedChangedEvent = "selectedChanged";
    selectedClearedEvent = "selectedCleared";

    container: Element;

    public constructor(
        collection: Array<T>,
        templateId: string,
        container: Element,
        viewController: IViewController,
        searchController: ISearchController<T>,
        eventCallbackController: IEventCallbackController) {

        this.container = container;
        this.viewController = viewController;
        this.eventCallbackController = eventCallbackController;

        // 1. create the view of every element in the collection
        let viewCollection = new Array<string>();
        for (let ii = 0; ii < collection.length; ii++) {
            viewCollection.push(viewController.create(collection[ii], templateId));
        }

        // 2. add view to the container
        container.innerHTML = viewCollection.join("");

        // 3. add a selection click handler
        let that = this;
        container.addEventListener("click", (e) => {
            let targetElement = e.target as Element;
            while (targetElement && !targetElement.classList.contains(templateId)) {
                targetElement = targetElement.parentElement ? targetElement.parentElement : undefined;
            }
            if (targetElement !== undefined) that.select(targetElement);
        });

        if (searchController) {
            // 4. build search index and add matching events
            searchController.index(collection);
            searchController.addEventCallback("matchStart", () => { console.log("match start"); });
            searchController.addEventCallback("matchEnd", () => { console.log("match end"); });
            searchController.addEventCallback("matched", (id) => { console.log(id); });

        }
    }


    public clearSelection: IClearSelectionDelegate = function (): void {
        var selectedElements = this.container.getElementsByClassName(this.selectedClass);
        if (selectedElements === undefined) return;
        for (var ii = 0; ii < selectedElements.length; ii++) {
            selectedElements[ii].classList.remove(this.selectedClass);
        }
    }

    public selectByIndex: ISelectByIndexDelegate = function (index: number): void {
        var element = this.container.children[index];
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

    public
}