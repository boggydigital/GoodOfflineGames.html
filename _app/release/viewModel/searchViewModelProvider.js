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
var SeachViewModelProvider = (function () {
    function SeachViewModelProvider() {
        this.getViewModel = function (data) {
            return null;
        };
    }
    return SeachViewModelProvider;
}());
exports.SeachViewModelProvider = SeachViewModelProvider;
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
}(SeachViewModelProvider));
exports.ProductCoreSearchViewModelProvider = ProductCoreSearchViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoVmlld01vZGVsUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdNb2RlbC9zZWFyY2hWaWV3TW9kZWxQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTtJQUFBO0lBR0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSx1QkFBZSxrQkFHM0IsQ0FBQTtBQW1CRDtJQUFBO1FBQ1csaUJBQVksR0FBRyxVQUFDLElBQVc7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7SUFDTCxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpxQiw4QkFBc0IseUJBSTNDLENBQUE7QUFFRDtJQUF3RCxzREFBbUM7SUFBM0Y7UUFBd0QsOEJBQW1DO1FBQ2hGLGlCQUFZLEdBQUcsVUFBUyxJQUFpQjtZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDOUIsSUFBSSxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUM1QyxlQUFlLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDN0IsZUFBZSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDOUQsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUMzQixDQUFDLENBQUE7SUFDTCxDQUFDO0lBQUQseUNBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBd0Qsc0JBQXNCLEdBUTdFO0FBUlksMENBQWtDLHFDQVE5QyxDQUFBIn0=