import {IImagesController} from "../imagesController";

export interface IGetScreenshotsById {
    (id: number): Array<string>
}

export interface IScreenshotsController {
    getScreenshotsById: IGetScreenshotsById
}

class ScreenshotEntry {
    Key: number;
    Value: Array<string>
}

export class ScreenshotsController implements IScreenshotsController {

    imagesController: IImagesController;
    screenshots: Array<ScreenshotEntry>;

    public constructor(screenshots: Array<ScreenshotEntry>,
        imagesController: IImagesController) {
        this.screenshots = screenshots;
        this.imagesController = imagesController;
    }

    public getScreenshotsById: IGetScreenshotsById =
    (id: number): Array<string> => {
        let result = new Array<string>();

        this.screenshots.forEach(e => {
            if (e.Key === id) e.Value.forEach(s => {
                result.push(this.imagesController.getScreenshotUri(s));
            })
        })

        return result;
    }


}