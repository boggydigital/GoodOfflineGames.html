import {SearchViewModel} from "./viewModels/searchViewModelProvider";
import {IViewModelByIdProvider} from "./viewModels/viewModelProvider";
import {IEventCallbackController, IAddEventCallbackDelegate} from "./eventCallbackController";
import {IGetIdDelegate} from "./viewControllers/viewController";

export interface IIndexDelegate<T> {
    (items: Array<T>, getIdDelegate: IGetIdDelegate): void;
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

    searchViewModelProvider: IViewModelByIdProvider<SearchViewModel>;
    searchIndex: Array<SearchViewModel>;
    eventCallbackController: IEventCallbackController;

    indexingStartEvent: string = "indexStart";
    indexingEndEvent: string = "indexEnd";
    matchStartEvent: string = "matchStart";
    matchEndEvent: string = "matchEnd";
    matchedEvent: string = "matched";
    clearedEvent: string = "cleared";

    public constructor(
        searchViewModelProvider: IViewModelByIdProvider<SearchViewModel>,
        eventCallbackController: IEventCallbackController) {
        this.searchViewModelProvider = searchViewModelProvider;
        this.searchIndex = new Array<SearchViewModel>();
        this.eventCallbackController = eventCallbackController;
    }

    public index = (items: Array<T>, getIdDelegate: IGetIdDelegate): void => {
        this.eventCallbackController.fire(this.indexingStartEvent, new Date());
        for (let ii = 0; ii < items.length; ii++) {
            let id = getIdDelegate(items[ii]);
            this.searchIndex.push(this.searchViewModelProvider.getViewModelById(id));
        }
        this.eventCallbackController.fire(this.indexingEndEvent, new Date());
    };

    public addEventCallback: IAddEventCallbackDelegate = function (event: string, callback: Function) {
        this.eventCallbackController.addEventCallback(event, callback);
    }

    matchTermSearchIndexTerms = function (inputSearchTerm: string, searchIndexTerms: Array<string>): boolean {
        for (let ii = 0; ii < searchIndexTerms.length; ii++)
            if (searchIndexTerms[ii].indexOf(inputSearchTerm) > -1) return true;
        return false;
    }

    matchTermsSearchIndex = function (inputSearchTerms: Array<string>, searchIndexTerms: Array<string>): boolean {
        for (let ii = 0; ii < inputSearchTerms.length; ii++)
            if (!this.matchTermSearchIndexTerms(inputSearchTerms[ii], searchIndexTerms)) return false;
        return true;
    }

    public match = (inputSearchString: string): void => {
        if (inputSearchString === "") {
            this.eventCallbackController.fire(this.clearedEvent, null);
            return;
        }
        inputSearchString = inputSearchString.toLowerCase();
        this.eventCallbackController.fire(this.matchStartEvent, new Date());
        let inputSearchTerms = inputSearchString.split(" ");

        for (let ii = 0; ii < this.searchIndex.length; ii++)
            if (this.matchTermsSearchIndex(inputSearchTerms, this.searchIndex[ii].searchTerms))
                this.eventCallbackController.fire(this.matchedEvent, this.searchIndex[ii].id);

        this.eventCallbackController.fire(this.matchEndEvent, new Date());
    }
}