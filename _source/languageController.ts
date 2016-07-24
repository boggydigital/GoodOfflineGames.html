export interface IGetLanguageNameByCode {
    (string): string;
}

export interface ILanguageController {
    getLanguageNameByCode: IGetLanguageNameByCode;
}

export class LanguageController implements ILanguageController {
    public getLanguageNameByCode: IGetLanguageNameByCode =
    (code: string): string => {
        switch (code) {
            case "": return "";
            case "en": return "English";
            case "de": return "Deutsch";
            case "fr": return "Français";
            case "es": return "Español";
            case "it": return "Italiano";
            case "ru": return "Русский";
            case "pl": return "Polski";
            case "pt": return "Português";
            case "jp": return "日本語";
            case "cz": return "Česká";
            case "nl": return "Nederlands";
            case "cn": return "中文";
            case "ko": return "한국어";
            case "tr": return "Türkçe";
            case "hu": return "Magyar";
            case "sv": return "Svenska";
            case "fi": return "Suomi";
            case "no": return "Norsk";
            case "da": return "Dansk";
            default: return "Unknown";
        }
    } 
}