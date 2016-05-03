export interface IGetViewModelDelegate<Input, Output> {
    (data: Input): Output;
}
export interface IViewModelProvider<Input, Output> {
    getViewModel: IGetViewModelDelegate<Input, Output>;
}
