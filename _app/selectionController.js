"use strict";
var SelectionController = (function () {
    function SelectionController() {
        this.getById = function (id) {
            return document.getElementById(id);
        };
        this.getFromContainer = function (container, selector) {
            return container && container.querySelector(selector);
        };
        this.getAll = function (selector) {
            return document.querySelectorAll(selector);
        };
        this.getAllFromContainer = function (container, selector) {
            return container && container.querySelectorAll(selector);
        };
    }
    return SelectionController;
}());
exports.SelectionController = SelectionController;
//# sourceMappingURL=selectionController.js.map