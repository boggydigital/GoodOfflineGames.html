import { ICreateEventCallbackDelegate, EventCallback } from "./eventCallback";
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
    eventCallbacks: Array<EventCallback>;
    createEventCallbackDelegate: ICreateEventCallbackDelegate;
    constructor(createEventCallbackDelegate: ICreateEventCallbackDelegate);
    fire: IFireDelegate;
    addEventCallback: IAddEventCallbackDelegate;
}
