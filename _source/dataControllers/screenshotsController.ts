import {IImageUriController} from "../imageUriController";

export interface IGetScreenshotsById {
    (id: number): Array<string>
}

export interface IShowFullscreenDelegate {
    (element: HTMLImageElement): void;
}

export interface IScreenshotsController {
    getScreenshotsById: IGetScreenshotsById;
    showFullscreen: IShowFullscreenDelegate
}

class ScreenshotEntry {
    Key: number;
    Value: Array<string>
}

export class ScreenshotsController implements IScreenshotsController {

    imageUriController: IImageUriController;
    screenshots: Array<ScreenshotEntry>;

    public constructor(screenshots: Array<ScreenshotEntry>,
        imageUriController: IImageUriController) {
        this.screenshots = screenshots;
        this.imageUriController = imageUriController;

        // initialize next / previous when we show fullscreen images
        let sfContainer = document.getElementById("screenshotFullscreenContainer");
        let previousNextButtons = sfContainer.querySelectorAll(".lnr");
        for (let ii=0; ii<previousNextButtons.length; ii++) {
            previousNextButtons[ii].addEventListener("click", (e) => {
                this.showNextPreviousFullscreenImage(
                    sfContainer,
                    (e.target as Element).classList.contains("lnr-arrow-left-circle") ? 
                    /* previous */ -1 : /* next */ 1);
                e.stopPropagation();
            });
        }
    }

    public getScreenshotsById: IGetScreenshotsById =
    (id: number): Array<string> => {
        let result = new Array<string>();
        if (!this.screenshots) return result;
        this.screenshots.forEach(e => {
            if (e.Key === id) e.Value.forEach(s => {
                result.push(this.imageUriController.getScreenshotUri(s));
            })
        })

        return result;
    }

    public showFullscreen: IShowFullscreenDelegate =
    (element: HTMLImageElement): void => {
        if (!element || !element.parentElement) return;
        let images = element.parentElement.querySelectorAll('img');
        let imageSources = new Array<string>();
        for (let ii = 0; ii < images.length; ii++) {
            imageSources.push((images[ii] as HTMLImageElement).src);
        }
        let sfContainer = document.getElementById("screenshotFullscreenContainer");
        let fullscreenImage = sfContainer.querySelector("img");
        (fullscreenImage as HTMLImageElement).src = element.src;
        sfContainer.setAttribute('data-images', imageSources.join());
        sfContainer.classList.remove("hidden");
    }

    showNextPreviousFullscreenImage = 
    (sfContainer: Element, direction: number): void => {
        let fullscreenImage = sfContainer.querySelector("img") as HTMLImageElement;
        let imageSources = sfContainer.getAttribute("data-images").split(",");
        let currentIndex = imageSources.indexOf(fullscreenImage.src);

        let nextIndex = currentIndex + direction;
        if (nextIndex < 0) nextIndex = imageSources.length - 1;
        if (nextIndex > imageSources.length - 1) nextIndex = 0;

        fullscreenImage.src = imageSources[nextIndex];
    }
}