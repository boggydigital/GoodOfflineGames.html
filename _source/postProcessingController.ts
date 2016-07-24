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

export class ImagesExpandController implements IPostProcessingController {

    templateController: ITemplateController;
    bindController: IBindController<ImageUriViewModel>;

    public constructor(
        templateController: ITemplateController,
        bindController: IBindController<ImageUriViewModel>) {
        this.templateController = templateController;
        this.bindController = bindController
    }

    public process: IProcessDelegate =
    (container: Element): void => {
        let imagesHTML = new Array<string>();
        let elementsToExpand = container.querySelectorAll("[data-images]");
        for (let ii = 0; ii < elementsToExpand.length; ii++) {
            let dataImages = elementsToExpand[ii].getAttribute("data-images").split(",");
            dataImages.forEach(i => {
                imagesHTML.push(this.getImageContent(i));
            });
            elementsToExpand[ii].parentElement.innerHTML += imagesHTML.join("");
        }
    }

    private getImageContent =
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

export class FilesExpandController implements IPostProcessingController {

    templateController: ITemplateController;
    bindController: IBindController<FileViewModel>;
    languageController: ILanguageController;

    public constructor(
        templateController: ITemplateController,
        bindController: IBindController<FileViewModel>,
        languageController: ILanguageController) {
        this.templateController = templateController;
        this.bindController = bindController
        this.languageController = languageController;
    }

    public process: IProcessDelegate =
    (container: Element): void => {
        let filesHTML = new Array<string>();
        let elementsToExpand = container.querySelectorAll("[data-files]");
        for (let ii = 0; ii < elementsToExpand.length; ii++) {
            let dataFiles = elementsToExpand[ii].getAttribute("data-files");
            if (dataFiles === "{{files}}") continue;
            let files: Array<ProductFile> = JSON.parse(decodeURIComponent(dataFiles));
            files.forEach(f => {
                filesHTML.push(this.getFileContent(f));
            })
            elementsToExpand[ii].parentElement.innerHTML += filesHTML.join("");
        }
    }

    private getFileContent =
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