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
                if (productData) {
                    if (productData.developer)
                        searchTerms.push(productData.developer.name.toLocaleLowerCase());
                    if (productData.publisher)
                        searchTerms.push(productData.publisher.name.toLocaleLowerCase());
                    if (productData.genres)
                        productData.genres.forEach(function (g) { searchTerms.push(g.name.toLocaleLowerCase()); });
                }
            }
            ["Windows", "Mac", "Linux"].forEach(function (os) { if (product.worksOn[os])
                searchTerms.push(os.toLocaleLowerCase()); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoVmlld01vZGVsUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdNb2RlbHMvc2VhcmNoVmlld01vZGVsUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BO0lBQUE7SUFHQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHVCQUFlLGtCQUczQixDQUFBO0FBRUQ7SUFNSSxpQ0FBbUIsa0JBQXdELEVBQ3ZFLGNBQStCLEVBQy9CLHNCQUE0RDtRQU16RCxpQkFBWSxHQUFHLFVBQVUsRUFBVTtZQUN0QyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFNUIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBRXJCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUUxQixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRXhDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQ1YsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNkLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7d0JBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQzVGLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7d0JBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQzVGLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7d0JBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RyxDQUFDO1lBQ0wsQ0FBQztZQUVELENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVqSCxJQUFJLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzVDLGVBQWUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLGVBQWUsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBRTFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDM0IsQ0FBQyxDQUFBO1FBdkNHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUM7SUFDekQsQ0FBQztJQXFDTCw4QkFBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFqRFksK0JBQXVCLDBCQWlEbkMsQ0FBQSJ9