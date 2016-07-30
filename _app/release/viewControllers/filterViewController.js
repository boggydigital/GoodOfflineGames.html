"use strict";
var FilterOptionViewModel = (function () {
    function FilterOptionViewModel(name) {
        this.name = name;
    }
    return FilterOptionViewModel;
}());
var FilterViewController = (function () {
    function FilterViewController(filterControl, tagsController, templateController, bindController) {
        if (!filterControl ||
            !tagsController ||
            !templateController ||
            !bindController)
            return;
        var html = new Array();
        tagsController.getAllTags().forEach(function (tag) {
            var foVM = new FilterOptionViewModel(tag.toUpperCase());
            var template = templateController.getTemplate('filterOption');
            html.push(bindController.bindTemplateToModel(template, foVM));
        });
        filterControl.innerHTML += html.join("");
    }
    return FilterViewController;
}());
exports.FilterViewController = FilterViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyVmlld0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdDb250cm9sbGVycy9maWx0ZXJWaWV3Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUE7SUFHSSwrQkFBbUIsSUFBWTtRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQUVEO0lBRUksOEJBQ0ksYUFBZ0MsRUFDaEMsY0FBK0IsRUFDL0Isa0JBQXVDLEVBQ3ZDLGNBQXNEO1FBRXRELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTtZQUNkLENBQUMsY0FBYztZQUNmLENBQUMsa0JBQWtCO1lBQ25CLENBQUMsY0FBYyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRTVCLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7UUFFL0IsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN4RCxJQUFJLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxhQUFhLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFN0MsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQXhCWSw0QkFBb0IsdUJBd0JoQyxDQUFBIn0=