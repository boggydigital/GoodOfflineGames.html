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
            // for (let kk = 0; kk < si.searchTerms.length; kk++) {
            //     let st = si.searchTerms[kk];
            //         let ist = inputSearchTerms[jj];
            //         indexMatched = indexMatched && (st.indexOf(ist) > -1);
            //     }
            return false;
        };
        this.matchTermsSearchIndex = function (inputSearchTerms, searchIndexTerms) {
            // let termsMatched: boolean = true;
            for (var ii = 0; ii < inputSearchTerms.length; ii++)
                // termsMatched =
                //     termsMatched &&
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19zb3VyY2Uvc2VhcmNoQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBbUJBO0lBYUksMEJBQ0ksdUJBQTRELEVBQzVELHVCQUFpRDtRQWZ6RCxpQkFxRUM7UUEvREcsdUJBQWtCLEdBQVcsWUFBWSxDQUFDO1FBQzFDLHFCQUFnQixHQUFXLFVBQVUsQ0FBQztRQUN0QyxvQkFBZSxHQUFXLFlBQVksQ0FBQztRQUN2QyxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUNuQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUNqQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQVUxQixVQUFLLEdBQUcsVUFBQyxLQUFlLEVBQUUsYUFBZ0M7WUFDN0QsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUN2QyxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6RSxDQUFDO1lBQ0QsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQztRQUVLLHFCQUFnQixHQUE4QixVQUFVLEtBQWEsRUFBRSxRQUFrQjtZQUM1RixJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENB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