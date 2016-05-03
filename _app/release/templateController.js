"use strict";
var TemplateController = (function () {
    function TemplateController() {
        var _this = this;
        this.getKnownTemplates = function () {
            var knownTemplates = new Array();
            var templates = document.querySelectorAll("template");
            for (var ii = 0; ii < templates.length; ii++) {
                var t = templates[ii];
                if (t && t.id)
                    knownTemplates.push(t.id);
            }
            return knownTemplates;
        };
        this.resolveReferences = function (template) {
            var knownTemplates = _this.getKnownTemplates();
            knownTemplates.forEach(function (knownTemplate) {
                var replacedTemplate = "[[" + knownTemplate + "]]";
                while (template.indexOf(replacedTemplate) > -1)
                    template = template.replace(replacedTemplate, knownTemplate);
            });
            return template;
        };
        this.getTemplate = function (id) {
            var template = _this.templatesContainer.querySelector("#" + id);
            var templateContent = template ? template.innerHTML : "";
            return _this.resolveReferences(templateContent);
        };
        this.templatesContainer = document.getElementById("templates");
    }
    return TemplateController;
}());
exports.TemplateController = TemplateController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX3NvdXJjZS90ZW1wbGF0ZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWtCQTtJQUlJO1FBSkosaUJBaUNDO1FBekJVLHNCQUFpQixHQUFHO1lBQ3ZCLElBQUksY0FBYyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFDekMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQzFCLENBQUMsQ0FBQTtRQUVNLHNCQUFpQixHQUFHLFVBQUMsUUFBZ0I7WUFDeEMsSUFBSSxjQUFjLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDOUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFBLGFBQWE7Z0JBQ2hDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQ25ELE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDMUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQTtRQUVNLGdCQUFXLEdBQUcsVUFBQyxFQUFVO1lBQzVCLElBQUksUUFBUSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELElBQUksZUFBZSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUN6RCxNQUFNLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQTtRQTNCRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBMkJMLHlCQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSwwQkFBa0IscUJBaUM5QixDQUFBIn0=