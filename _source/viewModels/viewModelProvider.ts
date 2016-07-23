export interface IGetViewModelByIdDelegate<T> {
    (id: number): T;
}

export interface IViewModelByIdProvider<T> {
    getViewModelById: IGetViewModelByIdDelegate<T>;
}