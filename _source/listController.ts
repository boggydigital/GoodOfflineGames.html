import {IEventCallbackController, IAddEventCallbackDelegate} from "./eventCallbackController";

export interface IClearDelegate {
    (): void;
}

export interface ISelectDelegate {
    (element: Element): void;
}

export interface ISelectionChangedDelegate {
    (element: Element): void;
}

export interface IListController {
    clear: IClearDelegate;
    select: ISelectDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}

export class ListController implements IListController {

    selectableElements: NodeList;
    selectedClass: string = "selected";
    eventCallbackController: IEventCallbackController;

    selectedChangedEvent = "selectedChanged";
    selectedClearedEvent = "selectedCleared";

    container: Element;

    public constructor(
        eventCallbackController: IEventCallbackController,
        container: Element,
        selectableClass: string) {
        this.container = container;
        let that = this;
        this.container.addEventListener("click", (e) => {
            let targetElement = e.target as Element;
            while (targetElement && !targetElement.classList.contains(selectableClass)) {
                targetElement = targetElement.parentElement ? targetElement.parentElement : undefined;
            }
            if (targetElement !== undefined) that.select(targetElement);
        });
        
        this.selectableElements = this.container.getElementsByClassName(selectableClass);
        this.eventCallbackController = eventCallbackController;
    }

    public clear: IClearDelegate = function (): void {
        var selectedElements = this.container.getElementsByClassName(this.selectedClass);
        if (selectedElements === undefined) return;
        for (var ii = 0; ii < selectedElements.length; ii++) {
            selectedElements[ii].classList.remove(this.selectedClass);
        }
    }

    public select: ISelectDelegate = function (element: Element): void {
        this.clear();
        if (element === undefined || element === null) return;
        element.classList.add(this.selectedClass);
        
        this.eventCallbackController.fire(this.selectedChangedEvent, element);
    }

    public addEventCallback: IAddEventCallbackDelegate = function(event: string, callback: Function) {
        this.eventCallbackController.addEventCallback(event, callback);
    }
}