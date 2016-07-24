"use strict";
var LanguageController = (function () {
    function LanguageController() {
        this.getLanguageNameByCode = function (code) {
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
        };
    }
    return LanguageController;
}());
exports.LanguageController = LanguageController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2VDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS9sYW5ndWFnZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBO0lBQUE7UUFDVywwQkFBcUIsR0FDNUIsVUFBQyxJQUFZO1lBQ1QsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNuQixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUM1QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUM1QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUM3QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUM1QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUM3QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUM1QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUMzQixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDO2dCQUM5QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUN4QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUMxQixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDO2dCQUMvQixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUN2QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUN4QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUMzQixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUMzQixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUM1QixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUMxQixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUMxQixLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUMxQixTQUFTLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDOUIsQ0FBQztRQUNMLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7QUEzQlksMEJBQWtCLHFCQTJCOUIsQ0FBQSJ9