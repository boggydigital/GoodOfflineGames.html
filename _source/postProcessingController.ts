import {ProductFile} from "./models/productFile";
import {ITemplateController} from "./templateController";
import {IBindController} from "./bindController";
import {ILanguageController} from "./languageController";

export interface IProcessDelegate {
    (container: HTMLElement): void;
}

export interface IPostProcessingController {
    process: IProcessDelegate;
}

export class ImagesLoadController implements IPostProcessingController {

    public process: IProcessDelegate =
    (container: Element): void => {
        var images = container.querySelectorAll("img");
        for (let ii = 0; ii < images.length; ii++) {
            let dataSrcset = images[ii].getAttribute("data-srcset");
            let dataSrc = images[ii].getAttribute("data-src");
            if (dataSrcset) {
                images[ii].setAttribute("srcset", dataSrcset);
                images[ii].removeAttribute("data-srcset");
            }
            if (dataSrc) {
                images[ii].setAttribute("src", dataSrc);
                images[ii].removeAttribute("data-src");
            }
            if (dataSrc || dataSrcset) images[ii].classList.remove("hidden");
        }
    }
}

class ImageUriViewModel {
    uri: string;

    public constructor(uri: string) {
        this.uri = uri;
    }
}

abstract class ExpandController<T> implements IPostProcessingController {

    attributeSelector: string;

    public process: IProcessDelegate =
    (container: Element): void => {
        let html = new Array<string>();
        let expandableElements = container.querySelectorAll("[" + this.attributeSelector + "]");
        for (let ii = 0; ii < expandableElements.length; ii++) {
            let dataItems = this.expandElement(expandableElements[ii]);
            if (dataItems === null) continue;
            dataItems.forEach(i => {
                html.push(this.getHTMLContent(i));
            });
            expandableElements[ii].parentElement.innerHTML += html.join("");
        }
    }

    expandElement =
    (element: Element): Array<T> => {
        return null;
    }

    getHTMLContent =
    (item: T): string => {
        return "";
    }
}

export class ImagesExpandController extends ExpandController<string> implements IPostProcessingController {

    templateController: ITemplateController;
    bindController: IBindController<ImageUriViewModel>;

    public constructor(
        templateController: ITemplateController,
        bindController: IBindController<ImageUriViewModel>) {
        super();
        this.attributeSelector = "data-images";
        this.templateController = templateController;
        this.bindController = bindController;
    }

    expandElement =
    (element: Element): Array<string> => {
        return element.getAttribute(this.attributeSelector).split(",");;
    }

    getHTMLContent =
    (uri: string): string => {
        let imageUriViewModel = new ImageUriViewModel(uri);
        let template = this.templateController.getTemplate("focusableImage");
        return this.bindController.bindTemplateToModel(template, imageUriViewModel);
    }
}

class FileViewModel {
    folder: string;
    file: string;
    name: string;
    operatingSystem: string;
    language: string;
    size: string;
}

export class FilesExpandController extends ExpandController<ProductFile> implements IPostProcessingController {

    templateController: ITemplateController;
    bindController: IBindController<FileViewModel>;
    languageController: ILanguageController;

    public constructor(
        templateController: ITemplateController,
        bindController: IBindController<FileViewModel>,
        languageController: ILanguageController) {
        super();
        this.attributeSelector = "data-files";
        this.templateController = templateController;
        this.bindController = bindController
        this.languageController = languageController;
    }

    expandElement =
    (element: Element): Array<ProductFile> => {
        let dataFiles = element.getAttribute("data-files");
        if (dataFiles === "{{files}}") return null;
        return JSON.parse(decodeURIComponent(dataFiles));
    }

    getHTMLContent =
    (file: ProductFile): string => {
        let fileViewModel = new FileViewModel();
        fileViewModel.file = file.file;
        fileViewModel.folder = file.folder;
        fileViewModel.operatingSystem = file.operatingSystem;
        fileViewModel.size = file.size;

        fileViewModel.name = (file.extra) ?
            "EXTRA: " + file.name :
            "INSTALLER: " + file.name;

        fileViewModel.language = this.languageController.getLanguageNameByCode(file.language);

        let template = this.templateController.getTemplate("fileLink");
        return this.bindController.bindTemplateToModel(template, fileViewModel);
    }
}