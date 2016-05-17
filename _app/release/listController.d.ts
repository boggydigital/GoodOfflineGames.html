import { IEventCallbackController, IAddEventCallbackDelegate } from "./eventCallbackController";
import { IViewController } from "./viewController";
export interface IClearDelegate {
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
    clear: IClearDelegate;
    select: ISelectDelegate;
    selectByIndex: ISelectByIndexDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}
export declare class ListController<T> implements IListController {
    viewController: IViewController;
    eventCallbackController: IEventCallbackController;
    selectedClass: string;
    selectedChangedEvent: string;
    selectedClearedEvent: string;
    container: Element;
    constructor(collection: Array<T>, templateId: string, container: Element, viewController: IViewController, eventCallbackController: IEventCallbackController);
    clear: IClearDelegate;
    selectByIndex: ISelectByIndexDelegate;
    select: ISelectDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}
