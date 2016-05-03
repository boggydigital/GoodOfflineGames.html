import { SearchViewModel, ISearchViewModelProvider } from "./viewModel/searchViewModelProvider";
import { IEventCallbackController, IAddEventCallbackDelegate } from "./eventCallbackController";
export interface IIndexDelegate<T> {
    (items: Array<T>): void;
}
export interface IMatchDelegate {
    (string: any): void;
}
export interface ISearchController<T> {
    index: IIndexDelegate<T>;
    match: IMatchDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}
export declare class SearchController<T> implements ISearchController<T> {
    searchViewModelProvider: ISearchViewModelProvider<T>;
    searchIndex: Array<SearchViewModel>;
    eventCallbackController: IEventCallbackController;
    indexingStartEvent: string;
    indexingEndEvent: string;
    matchStartEvent: string;
    matchEndEvent: string;
    foundEvent: string;
    constructor(searchViewModelProvider: ISearchViewModelProvider<T>, eventCallbackController: IEventCallbackController);
    index: (items: T[]) => void;
    addEventCallback: IAddEventCallbackDelegate;
    match: (searchString: string) => void;
}
