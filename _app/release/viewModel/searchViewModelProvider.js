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
    function ProductCoreSearchViewModelProvider(productViewModelProvider) {
        _super.call(this);
        this.getViewModel = function (data) {
            if (data == null)
                return null;
            var searchParts = [];
            if (this.productViewModelProvider) {
                var productViewModel = this.productViewModelProvider.getViewModel(data);
                searchParts.push(productViewModel.title.toLocaleLowerCase());
                searchParts.push(productViewModel.id);
                searchParts.push(productViewModel.tags.toLocaleLowerCase());
            }
            var searchViewModel = new SearchViewModel();
            searchViewModel.id = data.id;
            searchViewModel.searchString = searchParts.join(" ");
            return searchViewModel;
        };
        this.productViewModelProvider = productViewModelProvider;
    }
    return ProductCoreSearchViewModelProvider;
}(SearchViewModelProvider));
exports.ProductCoreSearchViewModelProvider = ProductCoreSearchViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoVmlld01vZGVsUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdNb2RlbC9zZWFyY2hWaWV3TW9kZWxQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQTtJQUFBO0lBR0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSx1QkFBZSxrQkFHM0IsQ0FBQTtBQVVEO0lBQUE7UUFDVyxpQkFBWSxHQUFHLFVBQUMsSUFBVztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFBRCw4QkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSnFCLCtCQUF1QiwwQkFJNUMsQ0FBQTtBQUVEO0lBQXdELHNEQUFvQztJQUl4Riw0Q0FBbUIsd0JBQWdFO1FBQy9FLGlCQUFPLENBQUM7UUFJTCxpQkFBWSxHQUFHLFVBQVUsSUFBaUI7WUFDN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRTlCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUVyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hFLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztnQkFDN0QsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7WUFFRCxJQUFJLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzVDLGVBQWUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM3QixlQUFlLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUMzQixDQUFDLENBQUE7UUFuQkcsSUFBSSxDQUFDLHdCQUF3QixHQUFHLHdCQUF3QixDQUFDO0lBQzdELENBQUM7SUFtQkwseUNBQUM7QUFBRCxDQUFDLEFBMUJELENBQXdELHVCQUF1QixHQTBCOUU7QUExQlksMENBQWtDLHFDQTBCOUMsQ0FBQSJ9