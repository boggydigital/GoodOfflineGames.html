import {ITemplateController} from "./templateController";
import {IBindController} from "./bindController";
import {IEventCallbackController, IAddEventCallbackDelegate} from "./eventCallbackController";

export interface ISetFiltersDelegate {
    (filters: Array<string>): void;
}

export interface IVisibilityActionDelegate {
    (): void;
}

export interface IFilterController {
    setFilters: ISetFiltersDelegate;
    hide: IVisibilityActionDelegate;
    show: IVisibilityActionDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}

class FilterItemViewModel {
    name: string;

    public constructor(name: string) {
        this.name = name;
    }
}

export class FilterController implements IFilterController {

    templateController: ITemplateController;
    bindController: IBindController<FilterItemViewModel>;

    filterControl: HTMLSelectElement;
    filterDisabled: Element;

    eventCallbackController: IEventCallbackController;

    selectionChangedEvent = "selectionChanged";

    public constructor(
        templateController: ITemplateController,
        bindController: IBindController<FilterItemViewModel>,
        eventCallbackController: IEventCallbackController) {
        this.templateController = templateController;
        this.bindController = bindController;

        this.eventCallbackController = eventCallbackController;

        this.filterControl = document.querySelector("#filter select") as HTMLSelectElement;
        this.filterDisabled = document.querySelector("#filter .disabled");

        this.filterControl.addEventListener("change", (e) => {
            this.eventCallbackController.fire(
                this.selectionChangedEvent,
                (e.target as HTMLOptionElement).value);
        });
    }

    public setFilters: ISetFiltersDelegate =
    (filters: Array<string>) => {
        let html = new Array<string>();
        let optionTemplate = this.templateController.getTemplate("filterOption");
        filters.forEach(option => {
            html.push(
                this.bindController.bindTemplateToModel(
                    optionTemplate,
                    new FilterItemViewModel(option)));
        });
        this.filterControl.innerHTML += html.join("");
    }

    public addEventCallback: IAddEventCallbackDelegate = function (event: string, callback: Function) {
        this.eventCallbackController.addEventCallback(event, callback);
    }

    public hide: IVisibilityActionDelegate =
    (): void => {
        this.filterControl.classList.add("hidden");
        this.filterDisabled.classList.remove("hidden");
    }

    public show: IVisibilityActionDelegate =
    (): void => {
        this.filterControl.classList.remove("hidden");
        this.filterDisabled.classList.add("hidden");        
    }
}