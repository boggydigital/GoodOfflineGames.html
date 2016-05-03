"use strict";
var ViewController = (function () {
    function ViewController(templateController, bindController) {
        var _this = this;
        this.create = function (model, templateId) {
            var view = "";
            var template = _this.templateController.getTemplate(templateId);
            if (template === "")
                view = "(cannot find template)";
            view = _this.bindController.bindTemplateToModel(template, model);
            return view;
        };
        this.templateController = templateController;
        this.bindController = bindController;
    }
    return ViewController;
}());
exports.ViewController = ViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9fc291cmNlL3ZpZXdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFXQTtJQUtJLHdCQUFtQixrQkFBdUMsRUFDdEQsY0FBK0I7UUFOdkMsaUJBa0JDO1FBUFUsV0FBTSxHQUFvQixVQUFDLEtBQVUsRUFBRSxVQUFrQjtZQUM1RCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9ELEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUM7Z0JBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDO1lBQ3JELElBQUksR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQVZHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBU0wscUJBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDO0FBbEJZLHNCQUFjLGlCQWtCMUIsQ0FBQSJ9