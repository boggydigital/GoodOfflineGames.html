export interface IGetLocalUriDelegate {
    (uri: string): ImageUris;
}

export interface ILoadDelegate {
    (container: Element): void;
}

export interface IImagesController {
    getLocalUri: IGetLocalUriDelegate;
    load: ILoadDelegate;
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

    public load: ILoadDelegate =
    (container: Element): void => {
        var images = container.querySelectorAll("img");
        for (let ii=0;ii<images.length;ii++) {
            let dataSrcset = images[ii].getAttribute("data-srcset");
            let dataSrc = images[ii].getAttribute("data-src");
            images[ii].setAttribute("srcset", dataSrcset);
            images[ii].setAttribute("src", dataSrc);
            images[ii].classList.remove("hidden");
        }
    }
}