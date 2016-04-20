"use strict";
var EventCallback = (function () {
    function EventCallback(event, callback) {
        this.create = function (event, callback) {
            return new EventCallback(event, callback);
        };
        this.event = event;
        this.callback = callback;
    }
    return EventCallback;
}());
exports.EventCallback = EventCallback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRDYWxsYmFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL19zb3VyY2UvZXZlbnRDYWxsYmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUE7SUFJSSx1QkFBbUIsS0FBYSxFQUFFLFFBQWtCO1FBSzdDLFdBQU0sR0FBaUMsVUFBVSxLQUFhLEVBQUUsUUFBa0I7WUFDckYsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUE7UUFORyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBS0wsb0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLHFCQUFhLGdCQVl6QixDQUFBIn0=