export interface IContainsDelegate<T> {
    (T: any): boolean;
}
export interface ICollectionController<T> {
    contains: IContainsDelegate<T>;
}
export declare class CollectionController<T> implements ICollectionController<T> {
    private collection;
    constructor(collection: Array<T>);
    contains: IContainsDelegate<T>;
}
