import { IEventCallbackController, IAddEventCallbackDelegate } from "./eventCallbackController";
import { IViewController } from "./viewController";
import { ISearchController } from "./searchController";
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
export declare class ListController<T> implements IListController {
    viewController: IViewController;
    eventCallbackController: IEventCallbackController;
    selectedClass: string;
    selectedChangedEvent: string;
    selectedClearedEvent: string;
    container: Element;
    constructor(collection: Array<T>, templateId: string, container: Element, viewController: IViewController, searchController: ISearchController<T>, eventCallbackController: IEventCallbackController);
    clearSelection: IClearSelectionDelegate;
    selectByIndex: ISelectByIndexDelegate;
    select: ISelectDelegate;
    addEventCallback: IAddEventCallbackDelegate;
    public: any;
}
