import {SearchViewModel, ISearchViewModelProvider} from "./viewModel/searchViewModelProvider";
import {IEventCallbackController, IAddEventCallbackDelegate} from "./eventCallbackController";

export interface IIndexDelegate<T> {
    (items: Array<T>): void;
}

export interface IMatchDelegate {
    (string): void;
}

export interface ISearchController<T> {
    index: IIndexDelegate<T>;
    match: IMatchDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}

export class SearchController<T> implements ISearchController<T> {

    searchViewModelProvider: ISearchViewModelProvider<T>;
    searchIndex: Array<SearchViewModel>;
    eventCallbackController: IEventCallbackController;
    
    indexingStartEvent: string = "indexingStart";
    indexingEndEvent: string = "indexingEnd";  
    matchStartEvent: string = "matchStart";
    matchEndEvent: string = "matchEnd";  
    matchedEvent: string = "matched";

    public constructor(
        searchViewModelProvider: ISearchViewModelProvider<T>, 
        eventCallbackController: IEventCallbackController) {
        this.searchViewModelProvider = searchViewModelProvider;
        this.searchIndex = new Array<SearchViewModel>();
        this.eventCallbackController = eventCallbackController;
    }
    
    public index = (items: Array<T>): void => {
        this.eventCallbackController.fire(this.indexingStartEvent, new Date());
        for (let ii=0; ii<items.length; ii++) {
            this.searchIndex.push(this.searchViewModelProvider.getViewModel(items[ii]));           
        }
        this.eventCallbackController.fire(this.indexingEndEvent, new Date());
    };
    
    public addEventCallback: IAddEventCallbackDelegate = function(event: string, callback: Function) {
        this.eventCallbackController.addEventCallback(event, callback);
    }
    
    public match = (searchString: string): void => {
        this.eventCallbackController.fire(this.matchStartEvent, new Date());
        for (let ii=0; ii<this.searchIndex.length; ii++) {
            if (this.searchIndex[ii].searchString.indexOf(searchString) > -1)
                this.eventCallbackController.fire(this.matchedEvent, this.searchIndex[ii].id);
        }
        this.eventCallbackController.fire(this.matchEndEvent, new Date());        
    }
}