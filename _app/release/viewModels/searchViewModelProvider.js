"use strict";
var SearchViewModel = (function () {
    function SearchViewModel() {
    }
    return SearchViewModel;
}());
exports.SearchViewModel = SearchViewModel;
var ProductSearchViewModelProvider = (function () {
    function ProductSearchViewModelProvider(productViewModelProvider) {
        this.getViewModel = function (id) {
            if (id == null)
                return null;
            var searchParts = [];
            if (this.productViewModelProvider) {
                var productViewModel = this.productViewModelProvider.getViewModel(id);
                searchParts.push(productViewModel.title.toLocaleLowerCase());
                searchParts.push(productViewModel.id);
                searchParts.push(productViewModel.tags.toLocaleLowerCase());
            }
            var searchViewModel = new SearchViewModel();
            searchViewModel.id = id;
            searchViewModel.searchString = searchParts.join(" ");
            return searchViewModel;
        };
        this.productViewModelProvider = productViewModelProvider;
    }
    return ProductSearchViewModelProvider;
}());
exports.ProductSearchViewModelProvider = ProductSearchViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoVmlld01vZGVsUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdNb2RlbHMvc2VhcmNoVmlld01vZGVsUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBO0lBQUE7SUFHQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHVCQUFlLGtCQUczQixDQUFBO0FBRUQ7SUFJSSx3Q0FBbUIsd0JBQThEO1FBSTFFLGlCQUFZLEdBQUcsVUFBVSxFQUFVO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU1QixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RSxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7Z0JBQzdELFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBRUQsSUFBSSxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUM1QyxlQUFlLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUN4QixlQUFlLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUMzQixDQUFDLENBQUE7UUFuQkcsSUFBSSxDQUFDLHdCQUF3QixHQUFHLHdCQUF3QixDQUFDO0lBQzdELENBQUM7SUFtQkwscUNBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDO0FBekJZLHNDQUE4QixpQ0F5QjFDLENBQUEifQ==