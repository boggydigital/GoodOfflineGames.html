export class EventCallback {
    
    private event: string;
    private callback: Function;

    public constructor(event: string, callback: Function) {
        this.event = event;
        this.callback = callback;
    }
}

export interface IFireDelegate {
    (event: string, argArray: any): void;
}

export interface IAddEventCallbackDelegate {
    (event: string, callback: Function): void;
}

export interface IEventCallbackController {
    fire: IFireDelegate,
    addEventCallback: IAddEventCallbackDelegate
}

export class EventCallbackController implements IEventCallbackController {
    
    private eventCallbacks: Array<EventCallback>

    public constructor() {
        this.eventCallbacks = new Array<EventCallback>();
    }

    public fire: IFireDelegate = function (event: string, argArray: Array<any>): void {
        for (var ii = 0; ii < this.eventCallbacks.length; ii++)
            if (this.eventCallbacks[ii].event === event)
                this.eventCallbacks[ii].callback(argArray);
    }

    public addEventCallback: IAddEventCallbackDelegate = function (event: string, callback: Function) {
        this.eventCallbacks.push(new EventCallback(event, callback));
    }
}