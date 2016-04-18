export interface IGetByIdDelegate {
    (id: string): Element;
}

export interface IGetFromContainerDelegate {
    (container: Element, selector: string): Element;
}

export interface IGetAllDelegate {
    (selector: string): NodeList;
}

export interface IGetAllFromContainer {
    (container: Element, selector: string): NodeList;
}

export interface ISelectionController {
    getById: IGetByIdDelegate;
    getFromContainer: IGetFromContainerDelegate;
    getAll: IGetAllDelegate;
    getAllFromContainer: IGetAllFromContainer;
}

export class SelectionController implements ISelectionController {

    public getById: IGetByIdDelegate =
    function (id: string): Element {
        return document.getElementById(id);
    }

    public getFromContainer: IGetFromContainerDelegate =
    (container: Element, selector: string): Element => {
        return container && container.querySelector(selector);
    }

    public getAll: IGetAllDelegate =
    (selector: string): NodeList => {
        return document.querySelectorAll(selector);
    }

    public getAllFromContainer: IGetAllFromContainer =
    (container: Element, selector: string): NodeList => {
        return container && container.querySelectorAll(selector);
    }
}