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
    eventListenerController: IEventCallbackController;

    selectedChangedEvent = "selectedchanged";
    selectedClearedEvent = "selectedcleared";

    container: Element;

    public constructor(
        eventListenerController: IEventCallbackController,
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
        this.eventListenerController = eventListenerController;
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
        
        this.eventListenerController.fire(this.selectedChangedEvent, element);
    }

    public addEventCallback: IAddEventCallbackDelegate = function(event: string, callback: Function) {
        this.eventListenerController.addEventCallback(event, callback);
    }
}