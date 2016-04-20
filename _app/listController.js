"use strict";
var ListController = (function () {
    function ListController(eventListenerController, container, selectableSelector) {
        this.selectedClass = "selected";
        this.selectedChangedEvent = "selectedchanged";
        this.selectedClearedEvent = "selectedcleared";
        this.clear = function () {
            var selected = this.container.querySelectorAll(this.selectedClass);
            if (selected === undefined)
                return;
            for (var ii = 0; ii < selected.length; ii++) {
                selected[ii].classList.remove(this.selectedClass);
            }
        };
        this.select = function (element) {
            this.clear();
            if (element === undefined || element === null)
                return;
            element.classList.add(this.selectedClass);
            this.eventListenerController.fire(this.selectedChangedEvent, element);
        };
        this.addEventCallback = function (event, callback) {
            this.eventListenerController.addEventCallback(event, callback);
        };
        this.container = container;
        this.selectableElements = this.container.querySelectorAll(selectableSelector);
        this.eventListenerController = eventListenerController;
    }
    return ListController;
}());
exports.ListController = ListController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9fc291cmNlL2xpc3RDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFvQkE7SUFXSSx3QkFDSSx1QkFBaUQsRUFDakQsU0FBa0IsRUFDbEIsa0JBQTBCO1FBWDlCLGtCQUFhLEdBQVcsVUFBVSxDQUFDO1FBR25DLHlCQUFvQixHQUFHLGlCQUFpQixDQUFDO1FBQ3pDLHlCQUFvQixHQUFHLGlCQUFpQixDQUFDO1FBYWxDLFVBQUssR0FBbUI7WUFDM0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbkUsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQzFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN0RCxDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBRU0sV0FBTSxHQUFvQixVQUFVLE9BQWdCO1lBQ3ZELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDdEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQTtRQUVNLHFCQUFnQixHQUE4QixVQUFTLEtBQWEsRUFBRSxRQUFrQjtZQUMzRixJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQTtRQXZCRyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyx1QkFBdUIsR0FBRyx1QkFBdUIsQ0FBQztJQUMzRCxDQUFDO0lBcUJMLHFCQUFDO0FBQUQsQ0FBQyxBQXZDRCxJQXVDQztBQXZDWSxzQkFBYyxpQkF1QzFCLENBQUEifQ==