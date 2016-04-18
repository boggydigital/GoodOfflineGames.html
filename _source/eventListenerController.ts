import {IEventListener} from "./eventListener";

export interface IFireDelegate {
    (event: string, argArray: any[]): void;
}

export interface IAddEventListenerDelegate {
    (event: string, callback: Function): void;
}

export interface IEventListenerController {
    fire: IFireDelegate,
    addEventListener: IAddEventListenerDelegate
}

export class EventListenerController implements IEventListenerController {
    eventListeners: Array<EventListener>

    eventListener: IEventListener;

    public constructor(eventListener: IEventListener) {
        this.eventListener = eventListener;
        this.eventListeners = new Array<EventListener>();
    }

    public fire: IFireDelegate = function (event: string, argArray: Array<any>): void {
        for (var ii = 0; ii < this.eventListeners.length; ii++)
            if (this.eventListeners[ii].event === event)
                this.eventListeners[ii].callback(argArray);
    }

    public addEventListener: IAddEventListenerDelegate = function (event: string, callback: Function) {
        var eventListener = this.eventListener.create(event, callback);
        this.eventListeners.push(eventListener);
    }

}