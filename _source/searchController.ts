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
    
    indexingStartEvent: string = "indexStart";
    indexingEndEvent: string = "indexEnd";  
    matchStartEvent: string = "matchStart";
    matchEndEvent: string = "matchEnd";  
    matchedEvent: string = "matched";
    clearedEvent: string = "cleared";

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
        if (searchString === "") {
            this.eventCallbackController.fire(this.clearedEvent, null);
            return;
        }
        this.eventCallbackController.fire(this.matchStartEvent, new Date());
        let searchTerms = searchString.split(" ");
        for (let ii=0; ii<this.searchIndex.length; ii++) {
            let indexMatched = true;
            for (let jj=0; jj<searchTerms.length; jj++)
                indexMatched = indexMatched && (this.searchIndex[ii].searchString.indexOf(searchTerms[jj]) > -1);
	
            if (indexMatched) this.eventCallbackController.fire(this.matchedEvent, this.searchIndex[ii].id);
        }
        this.eventCallbackController.fire(this.matchEndEvent, new Date());        
    }
}