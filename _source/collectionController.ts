export interface ICheckDelegate<T> {
    (item: T): boolean;
}

export interface ICollectionController<T> {
    check: ICheckDelegate<T>;
}

export class CollectionController<T> implements ICollectionController<T> {

    private collection: Array<T>;

    public contstructor = function (collection: Array<T>) {
        this.collection = collection;
    }

    check: ICheckDelegate<T> = function (item: T): boolean {
        for (let ii = 0; ii < this.collection.length; ii++) {
            if (this.collection[ii] === item) return true;
        }
        return false;
    }
}