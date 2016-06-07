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
        this.index = function (items) {
            _this.eventCallbackController.fire(_this.indexingStartEvent, new Date());
            for (var ii = 0; ii < items.length; ii++) {
                _this.searchIndex.push(_this.searchViewModelProvider.getViewModel(items[ii]));
            }
            _this.eventCallbackController.fire(_this.indexingEndEvent, new Date());
        };
        this.addEventCallback = function (event, callback) {
            this.eventCallbackController.addEventCallback(event, callback);
        };
        this.match = function (searchString) {
            if (searchString === "") {
                _this.eventCallbackController.fire(_this.clearedEvent, null);
                return;
            }
            _this.eventCallbackController.fire(_this.matchStartEvent, new Date());
            for (var ii = 0; ii < _this.searchIndex.length; ii++) {
                if (_this.searchIndex[ii].searchString.indexOf(searchString) > -1)
                    _this.eventCallbackController.fire(_this.matchedEvent, _this.searchIndex[ii].id);
            }
            _this.eventCallbackController.fire(_this.matchEndEvent, new Date());
        };
        this.searchViewModelProvider = searchViewModelProvider;
        this.searchIndex = new Array();
        this.eventCallbackController = eventCallbackController;
    }
    return SearchController;
}());
exports.SearchController = SearchController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19zb3VyY2Uvc2VhcmNoQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBaUJBO0lBYUksMEJBQ0ksdUJBQW9ELEVBQ3BELHVCQUFpRDtRQWZ6RCxpQkE2Q0M7UUF2Q0csdUJBQWtCLEdBQVcsWUFBWSxDQUFDO1FBQzFDLHFCQUFnQixHQUFXLFVBQVUsQ0FBQztRQUN0QyxvQkFBZSxHQUFXLFlBQVksQ0FBQztRQUN2QyxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUNuQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUNqQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQVUxQixVQUFLLEdBQUcsVUFBQyxLQUFlO1lBQzNCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN2RSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLENBQUM7WUFDRCxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDO1FBRUsscUJBQWdCLEdBQThCLFVBQVMsS0FBYSxFQUFFLFFBQWtCO1lBQzNGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFBO1FBRU0sVUFBSyxHQUFHLFVBQUMsWUFBb0I7WUFDaEMsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUNELEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7WUFDcEUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUM5QyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzdELEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RGLENBQUM7WUFDRCxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQTtRQTVCRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBbUIsQ0FBQztRQUNoRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLENBQUM7SUFDM0QsQ0FBQztJQTBCTCx1QkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUE3Q1ksd0JBQWdCLG1CQTZDNUIsQ0FBQSJ9