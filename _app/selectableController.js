"use strict";
var SelectableController = (function () {
    function SelectableController(selectionController, eventListenerController, container, selectableSelector) {
        this.selectedClass = "selected";
        this.selectedChangedEvent = "selectedchanged";
        this.selectedClearedEvent = "selectedcleared";
        this.clear = function () {
            var selected = this.selectionController.getAllFromContainer(this.container, this.selectedClass);
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
        this.addEventListener = function (event, callback) {
            this.eventListenerController.addEventListener(event, callback);
        };
        this.container = container;
        this.selectionController = selectionController;
        this.selectableElements = this.selectionController.getAllFromContainer(this.container, selectableSelector);
        this.eventListenerController = eventListenerController;
    }
    return SelectableController;
}());
exports.SelectableController = SelectableController;
//# sourceMappingURL=selectableController.js.map