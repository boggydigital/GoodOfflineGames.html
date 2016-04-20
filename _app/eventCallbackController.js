"use strict";
var EventCallback = (function () {
    function EventCallback(event, callback) {
        this.event = event;
        this.callback = callback;
    }
    return EventCallback;
}());
exports.EventCallback = EventCallback;
var EventCallbackController = (function () {
    function EventCallbackController() {
        this.fire = function (event, argArray) {
            for (var ii = 0; ii < this.eventCallbacks.length; ii++)
                if (this.eventCallbacks[ii].event === event)
                    this.eventCallbacks[ii].callback(argArray);
        };
        this.addEventCallback = function (event, callback) {
            this.eventCallbacks.push(new EventCallback(event, callback));
        };
        this.eventCallbacks = new Array();
    }
    return EventCallbackController;
}());
exports.EventCallbackController = EventCallbackController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRDYWxsYmFja0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9fc291cmNlL2V2ZW50Q2FsbGJhY2tDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUtJLHVCQUFtQixLQUFhLEVBQUUsUUFBa0I7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSxxQkFBYSxnQkFTekIsQ0FBQTtBQWVEO0lBSUk7UUFJTyxTQUFJLEdBQWtCLFVBQVUsS0FBYSxFQUFFLFFBQW9CO1lBQ3RFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUNsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQTtRQUVNLHFCQUFnQixHQUE4QixVQUFVLEtBQWEsRUFBRSxRQUFrQjtZQUM1RixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUE7UUFYRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksS0FBSyxFQUFpQixDQUFDO0lBQ3JELENBQUM7SUFXTCw4QkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksK0JBQXVCLDBCQWlCbkMsQ0FBQSJ9