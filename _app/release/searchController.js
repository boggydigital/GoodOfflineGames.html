"use strict";
var SearchController = (function () {
    function SearchController(searchViewModelProvider, eventCallbackController) {
        var _this = this;
        this.indexingStartEvent = "indexStart";
        this.indexingEndEvent = "indexEnd";
        this.matchStartEvent = "matchStart";
        this.matchEndEvent = "matchEnd";
        this.matchedEvent = "matched";
        this.clearedEvent = "cleared";
        this.index = function (items, getIdDelegate) {
            _this.eventCallbackController.fire(_this.indexingStartEvent, new Date());
            for (var ii = 0; ii < items.length; ii++) {
                var id = getIdDelegate(items[ii]);
                _this.searchIndex.push(_this.searchViewModelProvider.getViewModel(id));
            }
            _this.eventCallbackController.fire(_this.indexingEndEvent, new Date());
        };
        this.addEventCallback = function (event, callback) {
            this.eventCallbackController.addEventCallback(event, callback);
        };
        this.matchTermSearchIndexTerms = function (inputSearchTerm, searchIndexTerms) {
            for (var ii = 0; ii < searchIndexTerms.length; ii++)
                if (searchIndexTerms[ii].indexOf(inputSearchTerm) > -1)
                    return true;
            return false;
        };
        this.matchTermsSearchIndex = function (inputSearchTerms, searchIndexTerms) {
            for (var ii = 0; ii < inputSearchTerms.length; ii++)
                if (!this.matchTermSearchIndexTerms(inputSearchTerms[ii], searchIndexTerms))
                    return false;
            return true;
        };
        this.match = function (inputSearchString) {
            if (inputSearchString === "") {
                _this.eventCallbackController.fire(_this.clearedEvent, null);
                return;
            }
            _this.eventCallbackController.fire(_this.matchStartEvent, new Date());
            var inputSearchTerms = inputSearchString.split(" ");
            for (var ii = 0; ii < _this.searchIndex.length; ii++)
                if (_this.matchTermsSearchIndex(inputSearchTerms, _this.searchIndex[ii].searchTerms))
                    _this.eventCallbackController.fire(_this.matchedEvent, _this.searchIndex[ii].id);
            _this.eventCallbackController.fire(_this.matchEndEvent, new Date());
        };
        this.searchViewModelProvider = searchViewModelProvider;
        this.searchIndex = new Array();
        this.eventCallbackController = eventCallbackController;
    }
    return SearchController;
}());
exports.SearchController = SearchController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19zb3VyY2Uvc2VhcmNoQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBbUJBO0lBYUksMEJBQ0ksdUJBQTRELEVBQzVELHVCQUFpRDtRQWZ6RCxpQkE0REM7UUF0REcsdUJBQWtCLEdBQVcsWUFBWSxDQUFDO1FBQzFDLHFCQUFnQixHQUFXLFVBQVUsQ0FBQztRQUN0QyxvQkFBZSxHQUFXLFlBQVksQ0FBQztRQUN2QyxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUNuQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUNqQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQVUxQixVQUFLLEdBQUcsVUFBQyxLQUFlLEVBQUUsYUFBZ0M7WUFDN0QsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUN2QyxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6RSxDQUFDO1lBQ0QsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQztRQUVLLHFCQUFnQixHQUE4QixVQUFVLEtBQWEsRUFBRSxRQUFrQjtZQUM1RixJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENB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