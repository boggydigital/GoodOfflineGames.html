import {ISelectionController} from "./selectionController";
import {IEventListenerController, IAddEventListenerDelegate} from "./eventListenerController";

interface IClearDelegate {
    (): void;
}

interface ISelectDelegate {
    (element: Element): void;
}

export interface ISelectableController {
    clear: IClearDelegate;
    select: ISelectDelegate;
    addEventListener: IAddEventListenerDelegate;
}

export interface ISelectionChangedDelegate {
    (element: Element): void;
}

export class SelectableController implements ISelectableController {

    selectableElements: NodeList;
    selectedClass: string = "selected";
    selectionController: ISelectionController;
    eventListenerController: IEventListenerController;

    selectedChangedEvent = "selectedchanged";
    selectedClearedEvent = "selectedcleared";

    container: Element;

    public constructor(
        selectionController: ISelectionController,
        eventListenerController: IEventListenerController,
        container: Element,
        selectableSelector: string) {
        this.container = container;
        this.selectionController = selectionController;
        this.selectableElements = this.selectionController.getAllFromContainer(this.container, selectableSelector);
        this.eventListenerController = eventListenerController;
    }

    public clear: IClearDelegate = function (): void {
        var selected = this.selectionController.getAllFromContainer(this.container, this.selectedClass);
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

    public addEventListener: IAddEventListenerDelegate = function(event: string, callback: Function) {
        this.eventListenerController.addEventListener(event, callback);
    }

}