import {IndexViewModel} from "./viewModels/indexViewModelProvider";
import {IViewModelByIdProvider} from "./viewModels/viewModelProvider";
import {IEventCallbackController, IAddEventCallbackDelegate} from "./eventCallbackController";
import {IGetIdDelegate} from "./viewControllers/viewController";

export interface IIndexDelegate<T> {
    (items: Array<T>, getIdDelegate: IGetIdDelegate): void;
}

export interface IMatchDelegate {
    (string): void;
}

export interface IFilterDelegate {
    (string): void;
}

interface IMatchTermDelegate {
    (inputTerm: string, indexTerms: Array<string>): boolean;
}

interface IMatchTermsDelegate {
    (inputTerms: Array<string>, indexTerms: Array<string>): boolean
}

export interface IIndexMatchingController<T> {
    index: IIndexDelegate<T>;
    match: IMatchDelegate;
    filterAll: IFilterDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}

export class IndexMatchingController<T> implements IIndexMatchingController<T> {

    indexStartEvent: string = "indexStart";
    indexEndEvent: string = "indexEnd";

    matchStartEvent: string = "matchStart";
    matchEndEvent: string = "matchEnd";

    matchedEvent: string = "matched";

    filterAllStartEvent: string = "filterAllStart";
    filterAllEndEvent: string = "filterAllEnd";

    clearedEvent: string = "cleared";
    filterClearEvent: string = "filterCleared";

    viewModelProvider: IViewModelByIdProvider<IndexViewModel>;
    eventCallbackController: IEventCallbackController;
    indexStore: Array<IndexViewModel>;

    filteredItems: Array<number>;

    public constructor(
        viewModelProvider: IViewModelByIdProvider<IndexViewModel>,
        eventCallbackController: IEventCallbackController,
        filterController: IIndexMatchingController<T>) {
        this.viewModelProvider = viewModelProvider;
        this.eventCallbackController = eventCallbackController;
        this.indexStore = new Array<IndexViewModel>();

        if (filterController) {
            filterController.addEventCallback(this.filterClearEvent, () => {
                this.filteredItems = new Array<number>();
            })

            filterController.addEventCallback(this.filterAllEndEvent, filtered => {
                this.filteredItems = filtered;
            })            
        }
    }

    public addEventCallback: IAddEventCallbackDelegate =
    (event: string, callback: Function) => {
        this.eventCallbackController.addEventCallback(event, callback);
    }

    public index: IIndexDelegate<T> =
    (items: Array<T>, getIdDelegate: IGetIdDelegate): void => {
        this.eventCallbackController.fire(this.indexStartEvent, new Date());
        for (let ii = 0; ii < items.length; ii++) {
            let id = getIdDelegate(items[ii]);
            this.indexStore.push(this.viewModelProvider.getViewModelById(id));
        }
        this.eventCallbackController.fire(this.indexEndEvent, new Date());
    };

    private matchTerm: IMatchTermDelegate =
    (inputTerm: string, indexTerms: Array<string>): boolean => {
        for (let ii = 0; ii < indexTerms.length; ii++)
            if (indexTerms[ii].indexOf(inputTerm) > -1) return true;
        return false;
    }

    private matchTerms: IMatchTermsDelegate =
    (inputTerms: Array<string>, indexTerms: Array<string>): boolean => {
        for (let ii = 0; ii < inputTerms.length; ii++)
            if (!this.matchTerm(inputTerms[ii], indexTerms)) return false;
        return true;
    }

    public match: IMatchDelegate =
    (inputString: string): void => {
        if (inputString === "") {
            this.eventCallbackController.fire(this.clearedEvent, null);
            return;
        }
        inputString = inputString.toLowerCase();
        this.eventCallbackController.fire(this.matchStartEvent, null);
        let inputSearchTerms = inputString.split(" ");
        let matchedCount = 0;

        for (let ii = 0; ii < this.indexStore.length; ii++)
        {
            // don't search over filtered items
            if (this.filteredItems &&
                this.filteredItems.indexOf(this.indexStore[ii].id) > -1) continue;

            if (this.matchTerms(inputSearchTerms, this.indexStore[ii].terms))
            {
                this.eventCallbackController.fire(this.matchedEvent, this.indexStore[ii].id);
                matchedCount++;
            }
        }

        this.eventCallbackController.fire(this.matchEndEvent, matchedCount);
    }

    public filterAll: IFilterDelegate =
    (inputString: string): void => {

        if (inputString === "") {
            this.eventCallbackController.fire(this.filterClearEvent, null);
            return;
        }

        this.eventCallbackController.fire(this.filterAllStartEvent, null);

        let filtered = new Array<number>();
        inputString = inputString.toLowerCase();

        for (let ii = 0; ii < this.indexStore.length; ii++)
            if (!this.matchTerm(inputString, this.indexStore[ii].terms))
                filtered.push(this.indexStore[ii].id);

        this.eventCallbackController.fire(this.filterAllEndEvent, filtered);
    }
}
