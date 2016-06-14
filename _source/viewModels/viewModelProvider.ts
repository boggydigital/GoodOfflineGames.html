export interface IGetViewModelDelegate<T> {
    (id: number): T;
}

export interface IViewModelProvider<T> {
    getViewModel: IGetViewModelDelegate<T>;
}