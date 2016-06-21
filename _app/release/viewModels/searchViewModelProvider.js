"use strict";
var SearchViewModel = (function () {
    function SearchViewModel() {
    }
    return SearchViewModel;
}());
exports.SearchViewModel = SearchViewModel;
var ProductSearchViewModelProvider = (function () {
    function ProductSearchViewModelProvider(productViewModelProvider, productsDataController) {
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
            if (this.productsDataController) {
                var productData = this.productsDataController.getById(id);
                if (productData && productData.developer)
                    searchParts.push(productData.developer.name.toLocaleLowerCase());
                if (productData && productData.publisher)
                    searchParts.push(productData.publisher.name.toLocaleLowerCase());
            }
            var searchViewModel = new SearchViewModel();
            searchViewModel.id = id;
            searchViewModel.searchString = searchParts.join(" ");
            return searchViewModel;
        };
        this.productViewModelProvider = productViewModelProvider;
        this.productsDataController = productsDataController;
    }
    return ProductSearchViewModelProvider;
}());
exports.ProductSearchViewModelProvider = ProductSearchViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoVmlld01vZGVsUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdNb2RlbHMvc2VhcmNoVmlld01vZGVsUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BO0lBQUE7SUFHQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHVCQUFlLGtCQUczQixDQUFBO0FBRUQ7SUFLSSx3Q0FBbUIsd0JBQThELEVBQzdFLHNCQUE0RDtRQUt6RCxpQkFBWSxHQUFHLFVBQVUsRUFBVTtZQUN0QyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFNUIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBRXJCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEUsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RCxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0QyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDaEUsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDO29CQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRyxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQztvQkFBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUMvRyxDQUFDO1lBRUQsSUFBSSxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUM1QyxlQUFlLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUN4QixlQUFlLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUMzQixDQUFDLENBQUE7UUExQkcsSUFBSSxDQUFDLHdCQUF3QixHQUFHLHdCQUF3QixDQUFDO1FBQ3pELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztJQUN6RCxDQUFDO0lBeUJMLHFDQUFDO0FBQUQsQ0FBQyxBQWxDRCxJQWtDQztBQWxDWSxzQ0FBOEIsaUNBa0MxQyxDQUFBIn0=