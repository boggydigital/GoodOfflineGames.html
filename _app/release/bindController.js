"use strict";
var BindController = (function () {
    function BindController() {
        var _this = this;
        this.bindDecorationOpen = "{{";
        this.bindDecorationClose = "}}";
        this.bindTemplateToModel = function (template, viewModel) {
            var result = template;
            for (var property in viewModel) {
                var replacedProperty = _this.bindDecorationOpen + property + _this.bindDecorationClose;
                while (result.indexOf(replacedProperty) > -1)
                    result = result.replace(replacedProperty, viewModel[property]);
            }
            return result;
        };
    }
    return BindController;
}());
exports.BindController = BindController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9fc291cmNlL2JpbmRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQTtJQUFBO1FBQUEsaUJBZUM7UUFiRyx1QkFBa0IsR0FBVyxJQUFJLENBQUM7UUFDbEMsd0JBQW1CLEdBQVcsSUFBSSxDQUFDO1FBRTVCLHdCQUFtQixHQUN0QixVQUFDLFFBQWdCLEVBQUUsU0FBb0I7WUFDdkMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3JGLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDeEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkUsQ0FBQztZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSxzQkFBYyxpQkFlMUIsQ0FBQSJ9