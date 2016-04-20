import {ICreateEventCallbackDelegate, EventCallback} from "./eventCallback";

export interface IFireDelegate {
    (event: string, argArray: any[]): void;
}

export interface IAddEventCallbackDelegate {
    (event: string, callback: Function): void;
}

export interface IEventCallbackController {
    fire: IFireDelegate,
    addEventCallback: IAddEventCallbackDelegate
}

export class EventCallbackController implements IEventCallbackController {
    
    eventCallbacks: Array<EventCallback>
    createEventCallbackDelegate: ICreateEventCallbackDelegate;

    public constructor(createEventCallbackDelegate: ICreateEventCallbackDelegate) {
        this.createEventCallbackDelegate = createEventCallbackDelegate;
        this.eventCallbacks = new Array<EventCallback>();
    }

    public fire: IFireDelegate = function (event: string, argArray: Array<any>): void {
        for (var ii = 0; ii < this.eventCallbacks.length; ii++)
            if (this.eventCallbacks[ii].event === event)
                this.eventCallbacks[ii].callback(argArray);
    }

    public addEventCallback: IAddEventCallbackDelegate = function (event: string, callback: Function) {
        var eventCallback = this.createEventCallbackDelegate(event, callback);
        this.eventCallbacks.push(eventCallback);
    }
}