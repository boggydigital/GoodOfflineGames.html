export interface IGetProductImageUriDelegate {
    (uri: string): string;
}

export interface IGetScreenshotUri {
    (uri: string): string;
}

export interface IImageUriController {
    getProductImageUri: IGetProductImageUriDelegate;
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

    public getProductImageUri: IGetProductImageUriDelegate =
    (uri: string): string => {
        let lastPart = this.getImageLastPart(uri);

        return "_images/" + lastPart + ".png";
    }

    public getScreenshotUri: IGetScreenshotUri =
    (uri: string): string => {
        let lastPart = this.getImageLastPart(uri);
        return "_screenshots/" + lastPart;
    }
}