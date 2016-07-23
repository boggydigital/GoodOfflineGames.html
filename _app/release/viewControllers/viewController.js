"use strict";
var ViewController = (function () {
    function ViewController(viewModelProvider, templateController, bindController) {
        var _this = this;
        this.createById = function (model, getIdDelegate, templateId) {
            var view = "";
            var template = _this.templateController.getTemplate(templateId);
            var id = getIdDelegate(model);
            var viewModel = _this.viewModelProvider.getViewModelById(id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdDb250cm9sbGVycy92aWV3Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBb0JBO0lBTUksd0JBQ0ksaUJBQW9ELEVBQ3BELGtCQUF1QyxFQUN2QyxjQUEwQztRQVRsRCxpQkF5QkM7UUFWVSxlQUFVLEdBQ2pCLFVBQUMsS0FBVSxFQUFFLGFBQTZCLEVBQUUsVUFBa0I7WUFDMUQsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRCxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUM7Z0JBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDO1lBQ3JELElBQUksR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQWRHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQVlMLHFCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSxzQkFBYyxpQkF5QjFCLENBQUEifQ==