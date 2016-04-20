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
        selectableSelector: string) {
        this.container = container;
        this.selectableElements = this.container.querySelectorAll(selectableSelector);
        this.eventListenerController = eventListenerController;
    }

    public clear: IClearDelegate = function (): void {
        var selected = this.container.querySelectorAll(this.selectedClass);
        if (selected === undefined) return;
        for (var ii = 0; ii < selected.length; ii++) {
            selected[ii].classList.remove(this.selectedClass);
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