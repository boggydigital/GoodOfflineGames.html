export declare class EventCallback {
    private event;
    private callback;
    constructor(event: string, callback: Function);
}
export interface IFireDelegate {
    (event: string, argArray: any[]): void;
}
export interface IAddEventCallbackDelegate {
    (event: string, callback: Function): void;
}
export interface IEventCallbackController {
    fire: IFireDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}
export declare class EventCallbackController implements IEventCallbackController {
    private eventCallbacks;
    constructor();
    fire: IFireDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}
