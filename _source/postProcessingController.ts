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
            // let dataSrcset = images[ii].getAttribute("data-srcset");
            let dataSrc = images[ii].getAttribute("data-src");
            // if (dataSrcset) {
            //     images[ii].setAttribute("srcset", dataSrcset);
            //     images[ii].removeAttribute("data-srcset");
            // }
            if (dataSrc) {
                images[ii].setAttribute("src", dataSrc);
                images[ii].removeAttribute("data-src");
            }
            // if (dataSrc || dataSrcset) images[ii].classList.remove("hidden");
            if (dataSrc) images[ii].classList.remove("hidden");
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
            let parentElement = expandableElements[ii].parentElement;
            parentElement.removeChild(expandableElements[ii]);
            parentElement.innerHTML += html.join("");
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

export class TabsController implements IPostProcessingController {

    imagesExpandController: IPostProcessingController;
    imagesLoadController: IPostProcessingController;

    public constructor(
        imagesExpandController: IPostProcessingController,
        imagesLoadController: IPostProcessingController) {
        this.imagesExpandController = imagesExpandController;
        this.imagesLoadController = imagesLoadController;
    }

    public process: IProcessDelegate =
    (container: Element): void => {
        let tabsList = container.querySelector('[role=tablist]');
        if (!tabsList) return;
        tabsList.addEventListener("click", (e) => {
            let targetElement = e.target as Element;
            if (!targetElement) return;
            if (targetElement.getAttribute('role') !== 'tab') {
                // with the font icons users can now click on icon that is not 'tab'
                while (targetElement && targetElement.parentElement) {
                    targetElement = targetElement.parentElement;
                    if (targetElement.getAttribute('role') === 'tab') break;
                }
                // we've walked parent chain and there is no tab
                if (targetElement.getAttribute('role') !== 'tab') return;
            };
            // already selected - nothing more to do
            if (targetElement.getAttribute('aria-selected') === 'true') return;

            // hide previously selected tab content
            let csTab = tabsList.querySelector("[role=tab][aria-selected=true]");
            if (csTab) csTab.setAttribute('aria-selected', 'false');
            let csTabContent = document.getElementById(csTab.getAttribute('data-content'));
            if (csTabContent) csTabContent.classList.add('hidden');
            // display new tab content
            targetElement.setAttribute('aria-selected', 'true');
            let newTabContent = document.getElementById(targetElement.getAttribute('data-content'));
            if (newTabContent) {
                // if the tab is screenshots tab - expand images before display
                if (newTabContent.id === "screenshotsContent") {
                    this.imagesExpandController.process(newTabContent as HTMLElement);
                    this.imagesLoadController.process(newTabContent as HTMLElement);
                }
                newTabContent.classList.remove("hidden");
            }
        });
    }

    // getContentByTag =
    // (tab: Element, container: Element): Element => {
    //     let tabContents = container.querySelectorAll(".tabContent");
    //     for (let ii = 0; ii < tabContents.length; ii++) {
    //         let forTab = tabContents[ii].getAttribute("for");
    //         if (tab.classList.contains(forTab)) return tabContents[ii];
    //     }
    //     return null;
    // }
}

export class VisibilityController implements IPostProcessingController {
    public process: IProcessDelegate =
    (container: Element): void => {
        let dataVisible = container.querySelector('[data-visible]');
        if (!dataVisible) return;
        let visible = dataVisible.getAttribute('data-visible').split(" ");
        let dataVisibility = container.querySelectorAll('[data-visibility]');
        for (let ii=0; ii<dataVisibility.length;ii++) {
            let visibility = dataVisibility[ii].getAttribute('data-visibility');
            if (visible.indexOf(visibility) === -1) dataVisibility[ii].remove();
        }
    }
}