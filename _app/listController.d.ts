import { IEventCallbackController, IAddEventCallbackDelegate } from "./eventCallbackController";
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
export declare class ListController implements IListController {
    selectableElements: NodeList;
    selectedClass: string;
    eventListenerController: IEventCallbackController;
    selectedChangedEvent: string;
    selectedClearedEvent: string;
    container: Element;
    constructor(eventListenerController: IEventCallbackController, container: Element, selectableSelector: string);
    clear: IClearDelegate;
    select: ISelectDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}
