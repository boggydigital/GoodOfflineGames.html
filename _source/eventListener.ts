export interface ICreateDelegate {
    (event: string, callback: Function): IEventListener
}

export interface IEventListener {
    create: ICreateDelegate
}

export class EventListener implements IEventListener {
    event: string;
    callback: Function;
    
    public constructor(event: string, callback: Function) {
        this.event = event;
        this.callback = callback;
    }
    
    public create = function(event: string, callback: Function): EventListener {
        return new EventListener(event, callback);
    }
}