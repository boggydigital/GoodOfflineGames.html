export interface ICheckDelegate<T> {
    (item: T): boolean;
}
export interface ICollectionController<T> {
    check: ICheckDelegate<T>;
}
export declare class CollectionController<T> implements ICollectionController<T> {
    private collection;
    constructor(collection: Array<T>);
    check: ICheckDelegate<T>;
}
