"use strict";
var ProductViewModel = (function () {
    function ProductViewModel() {
    }
    return ProductViewModel;
}());
exports.ProductViewModel = ProductViewModel;
var ProductViewModelProvider = (function () {
    function ProductViewModelProvider(productsController, tagsController) {
        this.getViewModel = function (id) {
            if (id == null)
                return null;
            var product = this.productsController.getById(id);
            if (!product)
                return null;
            var productViewModel = new ProductViewModel();
            var tags = this.tagsController.getTags(id);
            productViewModel.id = id;
            productViewModel.title = product.title;
            if (tags.length) {
                productViewModel.class = tags.join(" ") + " hasTags";
                productViewModel.tags = tags.join(". ");
            }
            return productViewModel;
        };
        this.productsController = productsController;
        this.tagsController = tagsController;
    }
    return ProductViewModelProvider;
}());
exports.ProductViewModelProvider = ProductViewModelProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdFZpZXdNb2RlbFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vX3NvdXJjZS92aWV3TW9kZWxzL3Byb2R1Y3RWaWV3TW9kZWxQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBVUE7SUFBQTtJQUtBLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksd0JBQWdCLG1CQUs1QixDQUFBO0FBRUQ7SUFLSSxrQ0FDSSxrQkFBb0QsRUFDcEQsY0FBK0I7UUFLNUIsaUJBQVksR0FDbkIsVUFBVSxFQUFVO1lBRWhCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFMUIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDOUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFM0MsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUN6QixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUV2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7Z0JBQ3JELGdCQUFnQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQyxDQUFBO1FBeEJHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBdUJMLCtCQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSxnQ0FBd0IsMkJBaUNwQyxDQUFBIn0=