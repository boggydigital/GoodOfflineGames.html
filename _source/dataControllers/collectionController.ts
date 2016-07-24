export interface IContainsDelegate<T> {
    (T): boolean;
}

export interface ICollectionController<T> {
    contains: IContainsDelegate<T>;
}

export class CollectionController<T> implements ICollectionController<T> {

    private collection: Array<T>;

    public constructor(collection: Array<T>) {
        this.collection = collection;
    }

    contains: IContainsDelegate<T> = function (item: T): boolean {
        if (!this.collection) return false;
        for (let ii = 0; ii < this.collection.length; ii++) {
            if (this.collection[ii] === item) return true;
        }
        return false;
    }
}