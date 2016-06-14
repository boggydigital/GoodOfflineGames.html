import { ProductCore } from "./productCore";
import { Tag } from "./tag";
export declare class DownloadEntry {
    manualUrl: string;
    name: string;
    size: string;
    version: string;
}
export declare class LanguageDownload {
    language: string;
    linux: Array<DownloadEntry>;
    mac: Array<DownloadEntry>;
    windows: Array<DownloadEntry>;
}
export declare class GameDetails extends ProductCore {
    cdKey: string;
    changelog: string;
    tags: Array<Tag>;
    extras: Array<DownloadEntry>;
    languageDownloads: Array<LanguageDownload>;
    releaseTimestamp: number;
}
