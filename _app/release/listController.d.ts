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
    eventCallbackController: IEventCallbackController;
    selectedChangedEvent: string;
    selectedClearedEvent: string;
    container: Element;
    constructor(eventCallbackController: IEventCallbackController, container: Element, selectableClass: string);
    clear: IClearDelegate;
    select: ISelectDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}
