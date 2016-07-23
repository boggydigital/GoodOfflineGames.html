export interface IGetProductImageUrisDelegate {
    (uri: string): ImageUris;
}

export interface IGetScreenshotUri {
    (uri: string): string;
}

export interface IImageUriController {
    getProductImageUris: IGetProductImageUrisDelegate;
    getScreenshotUri: IGetScreenshotUri;
}

export class ImageUris {
    thumbnail: string;
    thumbnailRetina: string;
    hero: string;
    heroRetina: string;
}

export class ImageUriController implements IImageUriController {

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
}