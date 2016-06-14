import { IDetailsViewController, IShowDetailsDelegate } from "./detailsViewController";
export declare class GameDetailsViewController implements IDetailsViewController {
    parentElement: Element;
    constructor(parentElement: Element);
    showDetails: IShowDetailsDelegate;
}
