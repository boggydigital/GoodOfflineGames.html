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
    }

    public getScreenshotsById: IGetScreenshotsById =
    (id: number): Array<string> => {
        let result = new Array<string>();

        this.screenshots.forEach(e => {
            if (e.Key === id) e.Value.forEach(s => {
                result.push(this.imageUriController.getScreenshotUri(s));
            })
        })

        return result;
    }

    public showFullscreen: IShowFullscreenDelegate =
    (element: HTMLImageElement): void => {
        // alert(element);
        let sfContainer = document.getElementById("screenshotFullscreenContainer");
        sfContainer.innerHTML = "";
        sfContainer.appendChild(element.cloneNode());
        sfContainer.classList.remove("hidden");
    }
}