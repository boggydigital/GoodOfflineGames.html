export interface ICreateEventCallbackDelegate {
    (event: string, callback: Function): IEventCallback;
}
export interface IEventCallback {
    create: ICreateEventCallbackDelegate;
}
export declare class EventCallback implements IEventCallback {
    event: string;
    callback: Function;
    constructor(event: string, callback: Function);
    create: ICreateEventCallbackDelegate;
}
