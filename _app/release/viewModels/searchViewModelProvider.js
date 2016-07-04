"use strict";
var SearchViewModel = (function () {
    function SearchViewModel() {
    }
    return SearchViewModel;
}());
exports.SearchViewModel = SearchViewModel;
var SearchViewModelProvider = (function () {
    function SearchViewModelProvider(productsController, tagsController, productsDataController) {
        this.getViewModel = function (id) {
            if (id == null)
                return null;
            var searchTerms = [];
            var product = this.productsController.getById(id);
            if (!product)
                return null;
            searchTerms.push(product.title.toLocaleLowerCase());
            searchTerms.push(product.id.toString());
            if (this.tagsController) {
                var tags = this.tagsController.getTags(id);
                tags.forEach(function (t) {
                    searchTerms.push(t.toLocaleLowerCase());
                });
            }
            if (this.productsDataController) {
                var productData = this.productsDataController.getById(id);
                if (productData && productData.developer)
                    searchTerms.push(productData.developer.name.toLocaleLowerCase());
                if (productData && productData.publisher)
                    searchTerms.push(productData.publisher.name.toLocaleLowerCase());
            }
            var searchViewModel = new SearchViewModel();
            searchViewModel.id = id;
            searchViewModel.searchTerms = searchTerms;
            return searchViewModel;
        };
        this.productsController = productsController;
        this.tagsController = tagsController;
        this.productsDataController = productsDataController;
    }
    return SearchViewModelProvider;
}());
exports.SearchViewModelProvider = SearchViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoVmlld01vZGVsUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdNb2RlbHMvc2VhcmNoVmlld01vZGVsUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BO0lBQUE7SUFHQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHVCQUFlLGtCQUczQixDQUFBO0FBRUQ7SUFNSSxpQ0FBbUIsa0JBQXdELEVBQ3ZFLGNBQStCLEVBQy9CLHNCQUE0RDtRQU16RCxpQkFBWSxHQUFHLFVBQVUsRUFBVTtZQUN0QyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFNUIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBRXJCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUUxQixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRXhDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQ1YsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQztvQkFBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztnQkFDM0csRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUM7b0JBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDL0csQ0FBQztZQUVELElBQUksZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDNUMsZUFBZSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDeEIsZUFBZSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFFMUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUMzQixDQUFDLENBQUE7UUFsQ0csSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztJQUN6RCxDQUFDO0lBZ0NMLDhCQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQztBQTVDWSwrQkFBdUIsMEJBNENuQyxDQUFBIn0=