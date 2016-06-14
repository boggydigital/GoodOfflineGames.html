import { IEventCallbackController, IAddEventCallbackDelegate } from "../eventCallbackController";
import { IViewController } from "./viewController";
import { ISearchController } from "../searchController";
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
export declare class ListViewController<T> implements IListViewController {
    viewController: IViewController;
    eventCallbackController: IEventCallbackController;
    listContainerClass: string;
    searchResultsContainerClass: string;
    searchResultsLimit: number;
    searchResultsCount: number;
    searchResultsLimitedClass: string;
    searchResultsLimitedMessage: string;
    selectedClass: string;
    selectedChangedEvent: string;
    selectedClearedEvent: string;
    parentElement: Element;
    listContainer: Element;
    searchResultsContainer: Element;
    activeView: Element;
    constructor(collection: Array<T>, templateId: string, parentElement: Element, viewController: IViewController, searchController: ISearchController<T>, eventCallbackController: IEventCallbackController);
    clearSelection: IClearSelectionDelegate;
    selectByIndex: ISelectByIndexDelegate;
    select: ISelectDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}
