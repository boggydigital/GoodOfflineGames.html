"use strict";
var IndexMatchingController = (function () {
    function IndexMatchingController(viewModelProvider, eventCallbackController, filterController) {
        var _this = this;
        this.indexStartEvent = "indexStart";
        this.indexEndEvent = "indexEnd";
        this.matchStartEvent = "matchStart";
        this.matchEndEvent = "matchEnd";
        this.matchedEvent = "matched";
        this.filterAllStartEvent = "filterAllStart";
        this.filterAllEndEvent = "filterAllEnd";
        this.clearedEvent = "cleared";
        this.filterClearEvent = "filterCleared";
        this.addEventCallback = function (event, callback) {
            _this.eventCallbackController.addEventCallback(event, callback);
        };
        this.index = function (items, getIdDelegate) {
            _this.eventCallbackController.fire(_this.indexStartEvent, new Date());
            for (var ii = 0; ii < items.length; ii++) {
                var id = getIdDelegate(items[ii]);
                _this.indexStore.push(_this.viewModelProvider.getViewModelById(id));
            }
            _this.eventCallbackController.fire(_this.indexEndEvent, new Date());
        };
        this.matchTerm = function (inputTerm, indexTerms) {
            for (var ii = 0; ii < indexTerms.length; ii++)
                if (indexTerms[ii].indexOf(inputTerm) > -1)
                    return true;
            return false;
        };
        this.matchTerms = function (inputTerms, indexTerms) {
            for (var ii = 0; ii < inputTerms.length; ii++)
                if (!_this.matchTerm(inputTerms[ii], indexTerms))
                    return false;
            return true;
        };
        this.match = function (inputString) {
            if (inputString === "") {
                _this.eventCallbackController.fire(_this.clearedEvent, null);
                return;
            }
            inputString = inputString.toLowerCase();
            _this.eventCallbackController.fire(_this.matchStartEvent, null);
            var inputSearchTerms = inputString.split(" ");
            var matchedCount = 0;
            for (var ii = 0; ii < _this.indexStore.length; ii++) {
                // don't search over filtered items
                if (_this.filteredItems &&
                    _this.filteredItems.indexOf(_this.indexStore[ii].id) > -1)
                    continue;
                if (_this.matchTerms(inputSearchTerms, _this.indexStore[ii].terms)) {
                    _this.eventCallbackController.fire(_this.matchedEvent, _this.indexStore[ii].id);
                    matchedCount++;
                }
            }
            _this.eventCallbackController.fire(_this.matchEndEvent, matchedCount);
        };
        this.filterAll = function (inputString) {
            if (inputString === "") {
                _this.eventCallbackController.fire(_this.filterClearEvent, null);
                return;
            }
            _this.eventCallbackController.fire(_this.filterAllStartEvent, null);
            var filtered = new Array();
            inputString = inputString.toLowerCase();
            for (var ii = 0; ii < _this.indexStore.length; ii++)
                if (!_this.matchTerm(inputString, _this.indexStore[ii].terms))
                    filtered.push(_this.indexStore[ii].id);
            _this.eventCallbackController.fire(_this.filterAllEndEvent, filtered);
        };
        this.viewModelProvider = viewModelProvider;
        this.eventCallbackController = eventCallbackController;
        this.indexStore = new Array();
        if (filterController) {
            filterController.addEventCallback(this.filterClearEvent, function () {
                _this.filteredItems = new Array();
            });
            filterController.addEventCallback(this.filterAllEndEvent, function (filtered) {
                _this.filteredItems = filtered;
            });
        }
    }
    return IndexMatchingController;
}());
exports.IndexMatchingController = IndexMatchingController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhNYXRjaGluZ0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9fc291cmNlL2luZGV4TWF0Y2hpbmdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFnQ0E7SUFzQkksaUNBQ0ksaUJBQXlELEVBQ3pELHVCQUFpRCxFQUNqRCxnQkFBNkM7UUF6QnJELGlCQW9IQztRQWxIRyxvQkFBZSxHQUFXLFlBQVksQ0FBQztRQUN2QyxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUVuQyxvQkFBZSxHQUFXLFlBQVksQ0FBQztRQUN2QyxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUVuQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUVqQyx3QkFBbUIsR0FBVyxnQkFBZ0IsQ0FBQztRQUMvQyxzQkFBaUIsR0FBVyxjQUFjLENBQUM7UUFFM0MsaUJBQVksR0FBVyxTQUFTLENBQUM7UUFDakMscUJBQWdCLEdBQVcsZUFBZSxDQUFDO1FBMkJwQyxxQkFBZ0IsR0FDdkIsVUFBQyxLQUFhLEVBQUUsUUFBa0I7WUFDOUIsS0FBSSxDQUFDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUE7UUFFTSxVQUFLLEdBQ1osVUFBQyxLQUFlLEVBQUUsYUFBNkI7WUFDM0MsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsZUFBZSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNwRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDdkMsSUFBSSxFQUFFLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUM7UUFFTSxjQUFTLEdBQ2pCLFVBQUMsU0FBaUIsRUFBRSxVQUF5QjtZQUN6QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUN6QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDNUQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUE7UUFFTyxlQUFVLEdBQ2xCLFVBQUMsVUFBeUIsRUFBRSxVQUF5QjtZQUNqRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7UUFFTSxVQUFLLEdBQ1osVUFBQyxXQUFtQjtZQUNoQixFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMzRCxNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4QyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUQsSUFBSSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztZQUVyQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUNsRCxDQUFDO2dCQUNHLG1DQUFtQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGFBQWE7b0JBQ2xCLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQUMsUUFBUSxDQUFDO2dCQUV0RSxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDakUsQ0FBQztvQkFDRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0UsWUFBWSxFQUFFLENBQUM7Z0JBQ25CLENBQUM7WUFDTCxDQUFDO1lBRUQsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQTtRQUVNLGNBQVMsR0FDaEIsVUFBQyxXQUFtQjtZQUVoQixFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQy9ELE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVsRSxJQUFJLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ25DLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFeEMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7Z0JBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTlDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQTtRQXpGRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQWtCLENBQUM7UUFFOUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ25CLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDckQsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFBO1lBRUYsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUEsUUFBUTtnQkFDOUQsS0FBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQTZFTCw4QkFBQztBQUFELENBQUMsQUFwSEQsSUFvSEM7QUFwSFksK0JBQXVCLDBCQW9IbkMsQ0FBQSJ9