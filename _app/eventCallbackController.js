"use strict";
var EventCallbackController = (function () {
    function EventCallbackController(createEventCallbackDelegate) {
        this.fire = function (event, argArray) {
            for (var ii = 0; ii < this.eventCallbacks.length; ii++)
                if (this.eventCallbacks[ii].event === event)
                    this.eventCallbacks[ii].callback(argArray);
        };
        this.addEventCallback = function (event, callback) {
            var eventCallback = this.createEventCallbackDelegate(event, callback);
            this.eventCallbacks.push(eventCallback);
        };
        this.createEventCallbackDelegate = createEventCallbackDelegate;
        this.eventCallbacks = new Array();
    }
    return EventCallbackController;
}());
exports.EventCallbackController = EventCallbackController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRDYWxsYmFja0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9fc291cmNlL2V2ZW50Q2FsbGJhY2tDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFlQTtJQUtJLGlDQUFtQiwyQkFBeUQ7UUFLckUsU0FBSSxHQUFrQixVQUFVLEtBQWEsRUFBRSxRQUFvQjtZQUN0RSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRTtnQkFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO29CQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUE7UUFFTSxxQkFBZ0IsR0FBOEIsVUFBVSxLQUFhLEVBQUUsUUFBa0I7WUFDNUYsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUE7UUFiRyxJQUFJLENBQUMsMkJBQTJCLEdBQUcsMkJBQTJCLENBQUM7UUFDL0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBaUIsQ0FBQztJQUNyRCxDQUFDO0lBWUwsOEJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBcEJZLCtCQUF1QiwwQkFvQm5DLENBQUEifQ==