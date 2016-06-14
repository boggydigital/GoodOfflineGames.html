"use strict";
var ViewController = (function () {
    function ViewController(viewModelProvider, templateController, bindController) {
        var _this = this;
        this.create = function (model, getIdDelegate, templateId) {
            var view = "";
            var template = _this.templateController.getTemplate(templateId);
            var id = getIdDelegate(model);
            var viewModel = _this.viewModelProvider.getViewModel(id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdDb250cm9sbGVycy92aWV3Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBZ0JBO0lBTUksd0JBQ0ksaUJBQWdELEVBQ2hELGtCQUF1QyxFQUN2QyxjQUEwQztRQVRsRCxpQkF5QkM7UUFWVSxXQUFNLEdBQ2IsVUFBQyxLQUFXLEVBQUUsYUFBbUMsRUFBRSxVQUFrQjtZQUNqRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9ELElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixJQUFJLFNBQVMsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUM7Z0JBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDO1lBQ3JELElBQUksR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQWRHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQVlMLHFCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSxzQkFBYyxpQkF5QjFCLENBQUEifQ==