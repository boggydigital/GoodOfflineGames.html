"use strict";
var ViewController = (function () {
    function ViewController(viewModelProvider, templateController, bindController) {
        var _this = this;
        this.create = function (model, templateId) {
            var view = "";
            var template = _this.templateController.getTemplate(templateId);
            var viewModel = _this.viewModelProvider.getViewModel(model);
            if (template === "")
                view = "(cannot find template)";
            view = _this.bindController.bindTemplateToModel(template, viewModel);
            return view;
        };
        this.viewModelProvider = viewModelProvider;
        this.templateController = templateController;
        this.bindController = bindController;
    }
    return ViewController;
}());
exports.ViewController = ViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9fc291cmNlL3ZpZXdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFZQTtJQU1JLHdCQUNJLGlCQUFzRCxFQUN0RCxrQkFBdUMsRUFDdkMsY0FBMEM7UUFUbEQsaUJBdUJDO1FBUlUsV0FBTSxHQUFvQixVQUFDLEtBQVcsRUFBRSxVQUFrQjtZQUM3RCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9ELElBQUksU0FBUyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0QsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQztnQkFBQyxJQUFJLEdBQUcsd0JBQXdCLENBQUM7WUFDckQsSUFBSSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFBO1FBWkcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBVUwscUJBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDO0FBdkJZLHNCQUFjLGlCQXVCMUIsQ0FBQSJ9