"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SearchViewModel = (function () {
    function SearchViewModel() {
    }
    return SearchViewModel;
}());
exports.SearchViewModel = SearchViewModel;
var SearchViewModelProvider = (function () {
    function SearchViewModelProvider() {
        this.getViewModel = function (data) {
            return null;
        };
    }
    return SearchViewModelProvider;
}());
exports.SearchViewModelProvider = SearchViewModelProvider;
var ProductCoreSearchViewModelProvider = (function (_super) {
    __extends(ProductCoreSearchViewModelProvider, _super);
    function ProductCoreSearchViewModelProvider() {
        _super.apply(this, arguments);
        this.getViewModel = function (data) {
            if (data == null)
                return null;
            var searchViewModel = new SearchViewModel();
            searchViewModel.id = data.id;
            searchViewModel.searchString = data.title.toLocaleLowerCase();
            return searchViewModel;
        };
    }
    return ProductCoreSearchViewModelProvider;
}(SearchViewModelProvider));
exports.ProductCoreSearchViewModelProvider = ProductCoreSearchViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoVmlld01vZGVsUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdNb2RlbC9zZWFyY2hWaWV3TW9kZWxQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQTtJQUFBO0lBR0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSx1QkFBZSxrQkFHM0IsQ0FBQTtBQVVEO0lBQUE7UUFDVyxpQkFBWSxHQUFHLFVBQUMsSUFBVztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCw4QkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSnFCLCtCQUF1QiwwQkFJNUMsQ0FBQTtBQUVEO0lBQXdELHNEQUFvQztJQUE1RjtRQUF3RCw4QkFBb0M7UUFDakYsaUJBQVksR0FBRyxVQUFTLElBQWlCO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM5QixJQUFJLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzVDLGVBQWUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM3QixlQUFlLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM5RCxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQzNCLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCx5Q0FBQztBQUFELENBQUMsQUFSRCxDQUF3RCx1QkFBdUIsR0FROUU7QUFSWSwwQ0FBa0MscUNBUTlDLENBQUEifQ==