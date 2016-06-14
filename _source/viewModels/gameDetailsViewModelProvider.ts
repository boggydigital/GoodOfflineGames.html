import {Product} from "../models/product";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";
import {IProductsCoreController} from "../dataControllers/productsController";

export class GameDetailsViewModel {
    id: number;
    title: string;
}

export class GameDetailsViewModelProvider implements IViewModelProvider<GameDetailsViewModel> {

    productsController: IProductsCoreController<Product>;

    public constructor(productsController: IProductsCoreController<Product>) {
        this.productsController = productsController;
    }

    public getViewModel: IGetViewModelDelegate<GameDetailsViewModel> =
    function (id: number): GameDetailsViewModel {

        if (id == null) return null;

        let product = this.productsController.getById(id);

        let gameDetailsViewModel = new GameDetailsViewModel();

        gameDetailsViewModel.id = id;
        gameDetailsViewModel.title = product.title;

        return gameDetailsViewModel;
    }
}