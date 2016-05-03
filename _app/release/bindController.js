"use strict";
var BindController = (function () {
    function BindController() {
        var _this = this;
        this.bindDecorationOpen = "{{";
        this.bindDecorationClose = "}}";
        this.bindTemplateToModel = function (template, model) {
            var result = template;
            for (var property in model) {
                var replacedProperty = _this.bindDecorationOpen + property + _this.bindDecorationClose;
                while (result.indexOf(replacedProperty) > -1)
                    result = result.replace(replacedProperty, model[property]);
            }
            return result;
        };
    }
    return BindController;
}());
exports.BindController = BindController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9fc291cmNlL2JpbmRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQTtJQUFBO1FBQUEsaUJBY0M7UUFaRyx1QkFBa0IsR0FBVyxJQUFJLENBQUM7UUFDbEMsd0JBQW1CLEdBQVcsSUFBSSxDQUFDO1FBRTVCLHdCQUFtQixHQUFpQyxVQUFDLFFBQWdCLEVBQUUsS0FBVTtZQUNwRixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQztnQkFDckYsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN4QyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuRSxDQUFDO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUE7SUFDTCxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWRZLHNCQUFjLGlCQWMxQixDQUFBIn0=