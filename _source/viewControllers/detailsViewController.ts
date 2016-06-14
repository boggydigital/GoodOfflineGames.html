export interface IShowDetailsDelegate {
    (id: number): void;
}

export interface IDetailsViewController {
    showDetails: IShowDetailsDelegate;
}