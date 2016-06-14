import {IDetailsViewController, IShowDetailsDelegate} from "./detailsViewController";

export class GameDetailsViewController implements IDetailsViewController {

    parentElement: Element;

    public constructor(parentElement: Element) {
        this.parentElement = parentElement;
    }

    public showDetails: IShowDetailsDelegate =
    function (id: number) {
        this.parentElement.innerHTML = "<h1>" + id + "</h1>";
    }
}