"use strict";
var EventListener = (function () {
    function EventListener(event, callback) {
        this.create = function (event, callback) {
            return new EventListener(event, callback);
        };
        this.event = event;
        this.callback = callback;
    }
    return EventListener;
}());
exports.EventListener = EventListener;
//# sourceMappingURL=eventListener.js.map