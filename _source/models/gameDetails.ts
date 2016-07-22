import {ProductCore} from "./productCore";
import {Tag} from "./tag";

export class DownloadEntry {
    manualUrl: string;
    name: string;
    size: string;
    version: string;
}

export class LanguageDownload {
    language: string;
    linux: Array<DownloadEntry>;
    mac: Array<DownloadEntry>;
    windows: Array<DownloadEntry>
}

export class GameDetails extends ProductCore {
    cdKey: string;
    changelog: string;
    tags: Array<Tag>;
    extras: Array<DownloadEntry>;
    languageDownloads: Array<LanguageDownload>;
    dlcs: Array<GameDetails>;
    releaseTimestamp: number;
}