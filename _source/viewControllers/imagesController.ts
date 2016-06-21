export interface IGetLocalUriDelegate {
    (uri: string): ImageUris;
}

export interface IImagesController {
    getLocalUri: IGetLocalUriDelegate;
}

export class ImageUris {
    product: string;
    productRetina: string;
    screenshot: string;
}

export class ImagesController implements IImagesController {
    public getLocalUri: IGetLocalUriDelegate = 
    (uri: string): ImageUris => {

         let imageParts = uri.split("/");
         let lastPart = imageParts[imageParts.length - 1];
         let imageUris = new ImageUris();
         imageUris.product = "_images/" + lastPart + "_800.jpg";
         imageUris.productRetina = "_images/" + lastPart + ".jpg";
         imageUris.screenshot = "_screenshots/" + lastPart;

        return imageUris;
    }
}