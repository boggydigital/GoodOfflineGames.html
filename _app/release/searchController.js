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
            var searchTerms = searchString.split(" ");
            for (var ii = 0; ii < _this.searchIndex.length; ii++) {
                var indexMatched = true;
                for (var jj = 0; jj < searchTerms.length; jj++)
                    indexMatched = indexMatched && (_this.searchIndex[ii].searchString.indexOf(searchTerms[jj]) > -1);
                if (indexMatched)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19zb3VyY2Uvc2VhcmNoQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBaUJBO0lBYUksMEJBQ0ksdUJBQW9ELEVBQ3BELHVCQUFpRDtRQWZ6RCxpQkFpREM7UUEzQ0csdUJBQWtCLEdBQVcsWUFBWSxDQUFDO1FBQzFDLHFCQUFnQixHQUFXLFVBQVUsQ0FBQztRQUN0QyxvQkFBZSxHQUFXLFlBQVksQ0FBQztRQUN2QyxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUNuQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUNqQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQVUxQixVQUFLLEdBQUcsVUFBQyxLQUFlO1lBQzNCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN2RSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLENBQUM7WUFDRCxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDO1FBRUsscUJBQWdCLEdBQThCLFVBQVMsS0FBYSxFQUFFLFFBQWtCO1lBQzNGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFBO1FBRU0sVUFBSyxHQUFHLFVBQUMsWUFBb0I7WUFDaEMsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUNELEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQzlDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRTtvQkFDdEMsWUFBWSxHQUFHLFlBQVksSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyRyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7b0JBQUMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEcsQ0FBQztZQUNELEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFBO1FBaENHLElBQUksQ0FBQyx1QkFBdUIsR0FBRyx1QkFBdUIsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksS0FBSyxFQUFtQixDQUFDO1FBQ2hELElBQUksQ0FBQyx1QkFBdUIsR0FBRyx1QkFBdUIsQ0FBQztJQUMzRCxDQUFDO0lBOEJMLHVCQUFDO0FBQUQsQ0FBQyxBQWpERCxJQWlEQztBQWpEWSx3QkFBZ0IsbUJBaUQ1QixDQUFBIn0=