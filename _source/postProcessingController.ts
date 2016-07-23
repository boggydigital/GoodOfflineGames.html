export interface IProcessDelegate
{
    (container: HTMLElement): void;
}

export interface IPostProcessingController {
    process: IProcessDelegate;
}

export class ImageLoadController implements IPostProcessingController {
    
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

export class ImageExpandController {

    public process: IProcessDelegate =
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