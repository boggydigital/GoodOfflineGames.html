import {ProductCore} from "./productCore";
import {Tag} from "./tag";

export class GameDetails extends ProductCore {
    cdKey: string;
    changelog: string;
    tag: Array<Tag>;
}