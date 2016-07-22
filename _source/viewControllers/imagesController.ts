export interface IGetProductImageUrisDelegate {
    (uri: string): ImageUris;
}

export interface IGetScreenshotUri {
    (uri: string): string;
}

export interface ILoadDelegate {
    (container: Element): void;
}

export interface IImagesController {
    getProductImageUris: IGetProductImageUrisDelegate;
    getScreenshotUri: IGetScreenshotUri;
    load: ILoadDelegate;
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
        return "_screenshots/" + lastPart + ".jpg";
    }

    public load: ILoadDelegate =
    (container: Element): void => {
        var images = container.querySelectorAll("img");
        for (let ii = 0; ii < images.length; ii++) {
            let dataSrcset = images[ii].getAttribute("data-srcset");
            let dataSrc = images[ii].getAttribute("data-src");
            images[ii].setAttribute("srcset", dataSrcset);
            images[ii].setAttribute("src", dataSrc);
            images[ii].classList.remove("hidden");
        }
    }
}