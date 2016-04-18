"use strict";
var EventListenerController = (function () {
    function EventListenerController(eventListener) {
        this.fire = function (event, argArray) {
            for (var ii = 0; ii < this.eventListeners.length; ii++)
                if (this.eventListeners[ii].event === event)
                    this.eventListeners[ii].callback(argArray);
        };
        this.addEventListener = function (event, callback) {
            var eventListener = this.eventListener.create(event, callback);
            this.eventListeners.push(eventListener);
        };
        this.eventListener = eventListener;
        this.eventListeners = new Array();
    }
    return EventListenerController;
}());
exports.EventListenerController = EventListenerController;
//# sourceMappingURL=eventListenerController.js.map