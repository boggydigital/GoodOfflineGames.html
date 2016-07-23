import {ProductFile} from "./models/productFile";
import {ITemplateController} from "./templateController";
import {IBindController} from "./bindController";

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
        let imagesContent = new Array<string>();
        let elementsToExpand = container.querySelectorAll("[data-images]");
        for (let ii = 0; ii < elementsToExpand.length; ii++) {
            let images = elementsToExpand[ii].getAttribute("data-images").split(",");
            images.forEach(i => {
                imagesContent.push(this.getImageContent(i));
            });
            elementsToExpand[ii].parentElement.innerHTML += imagesContent.join("");
        }
    }

    private getImageContent =
    (uri: string): string => {
        let imageUriViewModel = new ImageUriViewModel(uri);
        let template = this.templateController.getTemplate("focusableImage");
        return this.bindController.bindTemplateToModel(template, imageUriViewModel);
    }
}

export class FilesExpandController implements IPostProcessingController {

    public process: IProcessDelegate =
    (container: Element): void => {
        let elementsToExpand = container.querySelectorAll("[data-files]");
        for (let ii=0; ii< elementsToExpand.length; ii++) {
            let filesContent = elementsToExpand[ii].getAttribute("data-files");
            if (filesContent === "{{files}}") continue;
            let files: Array<ProductFile> = JSON.parse(decodeURIComponent(filesContent)); 

            files.forEach(f => {
                console.log(f.file);
            })
        }
    }
}