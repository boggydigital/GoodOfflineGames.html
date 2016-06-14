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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoVmlld01vZGVsUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdNb2RlbHMvc2VhcmNoVmlld01vZGVsUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7SUFBQTtJQUdBLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksdUJBQWUsa0JBRzNCLENBQUE7QUFVRDtJQUFBO1FBQ1csaUJBQVksR0FBRyxVQUFDLElBQVc7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7SUFDTCxDQUFDO0lBQUQsOEJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpxQiwrQkFBdUIsMEJBSTVDLENBQUE7QUFFRDtJQUF3RCxzREFBb0M7SUFJeEYsNENBQW1CLHdCQUEyRTtRQUMxRixpQkFBTyxDQUFDO1FBSUwsaUJBQVksR0FBRyxVQUFVLElBQWlCO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU5QixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4RSxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7Z0JBQzdELFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBRUQsSUFBSSxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUM1QyxlQUFlLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDN0IsZUFBZSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDM0IsQ0FBQyxDQUFBO1FBbkJHLElBQUksQ0FBQyx3QkFBd0IsR0FBRyx3QkFBd0IsQ0FBQztJQUM3RCxDQUFDO0lBbUJMLHlDQUFDO0FBQUQsQ0FBQyxBQTFCRCxDQUF3RCx1QkFBdUIsR0EwQjlFO0FBMUJZLDBDQUFrQyxxQ0EwQjlDLENBQUEifQ==