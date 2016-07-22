export interface IGetProductImageUrisDelegate {
    (uri: string): ImageUris;
}

export interface IGetScreenshotUri {
    (uri: string): string;
}

export interface IElementActionDelegate {
    (container: Element): void;
}

export interface IImagesController {
    getProductImageUris: IGetProductImageUrisDelegate;
    getScreenshotUri: IGetScreenshotUri;
    load: IElementActionDelegate;
    expandCollection: IElementActionDelegate
}

export class ImageUris {
    thumbnail: string;
    thumbnailRetina: string;
    hero: string;
    heroRetina: string;
    screenshot: string;
}

export class ImagesController implements IImagesController {

    private getImageLastPart = (uri: string): string => {
        let imageParts = uri.split("/");
        return imageParts[imageParts.length - 1];
    }

    public getProductImageUris: IGetProductImageUrisDelegate =
    (uri: string): ImageUris => {
        let lastPart = this.getImageLastPart(uri);

        let imageUris = new ImageUris();
        imageUris.thumbnail = "_images/" + lastPart + "_196.jpg";
        imageUris.thumbnailRetina = "_images/" + lastPart + "_392.jpg";
        imageUris.hero = "_images/" + lastPart + "_800.jpg";
        imageUris.heroRetina = "_images/" + lastPart + ".jpg";

        return imageUris;
    }

    public getScreenshotUri: IGetScreenshotUri =
    (uri: string): string => {
        let lastPart = this.getImageLastPart(uri);
        return "_screenshots/" + lastPart;
    }

    public load: IElementActionDelegate =
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

    public expandCollection: IElementActionDelegate =
    (container: Element): void => {
        var elementsToExpand = container.querySelectorAll("[data-images]");
        for (let ii=0; ii< elementsToExpand.length; ii++) {
            let images = elementsToExpand[ii].getAttribute("data-images").split(",");
            images.forEach(i => {
                elementsToExpand[ii].parentElement.appendChild(this.createFocusableImage(i));
            });
            elementsToExpand[ii].remove();
        }
    }

    private createFocusableImage = 
    (uri: string): HTMLImageElement => {
        let img = document.createElement("img");
        img.setAttribute("data-src", uri);
        img.setAttribute("tabindex", "4");
        img.onclick = (e) => { (e.target as HTMLImageElement).focus() };
        img.classList.add("hidden");
        return img;
    }
}