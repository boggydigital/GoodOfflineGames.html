"use strict";
var IndexViewModel = (function () {
    function IndexViewModel() {
    }
    return IndexViewModel;
}());
exports.IndexViewModel = IndexViewModel;
var FilterViewModelProvider = (function () {
    function FilterViewModelProvider(tagsController) {
        var _this = this;
        this.getViewModelById = function (id) {
            if (id == null)
                return null;
            var filterViewModel = new IndexViewModel();
            filterViewModel.id = id;
            if (_this.tagsController)
                filterViewModel.terms = _this.tagsController.getTags(id);
            return filterViewModel;
        };
        this.tagsController = tagsController;
    }
    return FilterViewModelProvider;
}());
exports.FilterViewModelProvider = FilterViewModelProvider;
var SearchViewModelProvider = (function () {
    function SearchViewModelProvider(productsController, tagsController, productsDataController) {
        var _this = this;
        this.getViewModelById = function (id) {
            if (id == null)
                return null;
            var searchTerms = [];
            var product = _this.productsController.getById(id);
            if (!product)
                return null;
            searchTerms.push(product.title.toLocaleLowerCase());
            searchTerms.push(product.id.toString());
            if (_this.tagsController) {
                var tags = _this.tagsController.getTags(id);
                tags.forEach(function (t) {
                    searchTerms.push(t.toLocaleLowerCase());
                });
            }
            if (_this.productsDataController) {
                var productData = _this.productsDataController.getById(id);
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
            var searchViewModel = new IndexViewModel();
            searchViewModel.id = id;
            searchViewModel.terms = searchTerms;
            return searchViewModel;
        };
        this.productsController = productsController;
        this.tagsController = tagsController;
        this.productsDataController = productsDataController;
    }
    return SearchViewModelProvider;
}());
exports.SearchViewModelProvider = SearchViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhWaWV3TW9kZWxQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld01vZGVscy9pbmRleFZpZXdNb2RlbFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTtJQUFBO0lBR0EsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSxzQkFBYyxpQkFHMUIsQ0FBQTtBQUVEO0lBSUksaUNBQW1CLGNBQStCO1FBSnRELGlCQXFCQztRQWJVLHFCQUFnQixHQUN2QixVQUFDLEVBQVU7WUFFUCxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFNUIsSUFBSSxlQUFlLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUMzQyxlQUFlLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUV4QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDO2dCQUNwQixlQUFlLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTVELE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDM0IsQ0FBQyxDQUFBO1FBZkcsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQWVMLDhCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQXJCWSwrQkFBdUIsMEJBcUJuQyxDQUFBO0FBRUQ7SUFNSSxpQ0FBbUIsa0JBQXdELEVBQ3ZFLGNBQStCLEVBQy9CLHNCQUE0RDtRQVJwRSxpQkFrREM7UUFwQ1UscUJBQWdCLEdBQ3ZCLFVBQUMsRUFBVTtZQUNQLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU1QixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFckIsSUFBSSxPQUFP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