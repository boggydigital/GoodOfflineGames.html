import {ITagsController} from "../dataControllers/tagsController";
import {ITemplateController} from "../templateController";
import {IBindController} from "../bindcontroller";

class FilterOptionViewModel {
    name: string;

    public constructor(name: string) {
        this.name = name;
    }
}

export class FilterViewController {

    public constructor(
        filterControl: HTMLSelectElement,
        tagsController: ITagsController,
        templateController: ITemplateController,
        bindController: IBindController<FilterOptionViewModel>) {

        if (!filterControl ||
            !tagsController ||
            !templateController ||
            !bindController) return;

        let html = new Array<string>();

        tagsController.getAllTags().forEach(tag => {
            let foVM = new FilterOptionViewModel(tag.toUpperCase());
            let template = templateController.getTemplate('filterOption');
            html.push(bindController.bindTemplateToModel(template, foVM));
        });

        filterControl.innerHTML += html;

    }
}