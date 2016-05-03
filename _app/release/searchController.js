"use strict";
var SearchController = (function () {
    function SearchController(searchViewModelProvider, eventCallbackController) {
        var _this = this;
        this.indexingStartEvent = "indexingStart";
        this.indexingEndEvent = "indexingEnd";
        this.matchStartEvent = "matchStart";
        this.matchEndEvent = "matchEnd";
        this.foundEvent = "found";
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
            _this.eventCallbackController.fire(_this.matchStartEvent, new Date());
            for (var ii = 0; ii < _this.searchIndex.length; ii++) {
                if (_this.searchIndex[ii].searchString.indexOf(searchString) > -1)
                    _this.eventCallbackController.fire(_this.foundEvent, _this.searchIndex[ii].id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19zb3VyY2Uvc2VhcmNoQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBaUJBO0lBWUksMEJBQ0ksdUJBQW9ELEVBQ3BELHVCQUFpRDtRQWR6RCxpQkF3Q0M7UUFsQ0csdUJBQWtCLEdBQVcsZUFBZSxDQUFDO1FBQzdDLHFCQUFnQixHQUFXLGFBQWEsQ0FBQztRQUN6QyxvQkFBZSxHQUFXLFlBQVksQ0FBQztRQUN2QyxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUNuQyxlQUFVLEdBQVcsT0FBTyxDQUFDO1FBVXRCLFVBQUssR0FBRyxVQUFDLEtBQWU7WUFDM0IsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFDLENBQUMsRUFBRSxFQUFFLEdBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUNuQyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEYsQ0FBQztZQUNELEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUM7UUFFSyxxQkFBZ0IsR0FBOEIsVUFBUyxLQUFhLEVBQUUsUUFBa0I7WUFDM0YsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUE7UUFFTSxVQUFLLEdBQUcsVUFBQyxZQUFvQjtZQUNoQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFDLENBQUMsRUFBRSxFQUFFLEdBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDOUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwRixDQUFDO1lBQ0QsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUE7UUF4QkcsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQW1CLENBQUM7UUFDaEQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO0lBQzNELENBQUM7SUFzQkwsdUJBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLHdCQUFnQixtQkF3QzVCLENBQUEifQ==