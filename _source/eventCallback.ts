export interface ICreateEventCallbackDelegate {
    (event: string, callback: Function): IEventCallback
}

export interface IEventCallback {
    create: ICreateEventCallbackDelegate
}

export class EventCallback implements IEventCallback {
    event: string;
    callback: Function;

    public constructor(event: string, callback: Function) {
        this.event = event;
        this.callback = callback;
    }

    public create: ICreateEventCallbackDelegate = function (event: string, callback: Function): EventCallback {
        return new EventCallback(event, callback);
    }
}