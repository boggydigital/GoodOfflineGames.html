"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var searchViewModel_1 = require("./searchViewModel");
var searchViewModelProvider_1 = require("./searchViewModelProvider");
var ProductCoreSearchViewModelProvider = (function (_super) {
    __extends(ProductCoreSearchViewModelProvider, _super);
    function ProductCoreSearchViewModelProvider() {
        _super.apply(this, arguments);
        this.getViewModel = function (data) {
            if (data == null)
                return null;
            var searchViewModel = new searchViewModel_1.SearchViewModel();
            searchViewModel.id = data.id;
            searchViewModel.searchString = data.title;
            return searchViewModel;
        };
    }
    return ProductCoreSearchViewModelProvider;
}(searchViewModelProvider_1.SeachViewModelProvider));
exports.ProductCoreSearchViewModelProvider = ProductCoreSearchViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdFNlYXJjaFZpZXdNb2RlbFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3TW9kZWwvcHJvZHVjdFNlYXJjaFZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGdDQUE4QixtQkFBbUIsQ0FBQyxDQUFBO0FBQ2xELHdDQUFxQywyQkFBMkIsQ0FBQyxDQUFBO0FBRWpFO0lBQXdELHNEQUFtQztJQUEzRjtRQUF3RCw4QkFBbUM7UUFDaEYsaUJBQVksR0FBRyxVQUFTLElBQWlCO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM5QixJQUFJLGVBQWUsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztZQUM1QyxlQUFlLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDN0IsZUFBZSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDM0IsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUFELHlDQUFDO0FBQUQsQ0FBQyxBQVJELENBQXdELGdEQUFzQixHQVE3RTtBQVJZLDBDQUFrQyxxQ0FROUMsQ0FBQSJ9