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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdDb250cm9sbGVycy92aWV3Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBWUE7SUFNSSx3QkFDSSxpQkFBc0QsRUFDdEQsa0JBQXVDLEVBQ3ZDLGNBQTBDO1FBVGxELGlCQXVCQztRQVJVLFdBQU0sR0FBb0IsVUFBQyxLQUFXLEVBQUUsVUFBa0I7WUFDN0QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRCxJQUFJLFNBQVMsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUM7Z0JBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDO1lBQ3JELElBQUksR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQVpHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQVVMLHFCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSxzQkFBYyxpQkF1QjFCLENBQUEifQ==