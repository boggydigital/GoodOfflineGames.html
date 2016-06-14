"use strict";
var ProductFile = (function () {
    function ProductFile() {
    }
    return ProductFile;
}());
exports.ProductFile = ProductFile;
var ProductFilesController = (function () {
    function ProductFilesController(productFiles) {
        this.getProductFiles = function (id) {
            var foundProductFiles = [];
            for (var ii = 0; ii < this.productFiles.length; ii++) {
                if (this.productFiles[ii].id === id)
                    foundProductFiles.push(this.productFiles[ii]);
            }
            return foundProductFiles;
        };
        this.validated = function (id) {
            var productFilesForId = this.getProductFiles(id);
            if (productFilesForId && productFilesForId.length === 0)
                return undefined;
            var validity = true;
            for (var ii = 0; ii < productFilesForId.length; ii++)
                validity = validity && productFilesForId[ii].validated;
            return validity;
        };
        this.productFiles = productFiles;
    }
    return ProductFilesController;
}());
exports.ProductFilesController = ProductFilesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdEZpbGVzQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19zb3VyY2UvcHJvZHVjdEZpbGVzQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7SUFBQTtJQWFBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFiRCxJQWFDO0FBYlksbUJBQVcsY0FhdkIsQ0FBQTtBQWVEO0lBR0ksZ0NBQW1CLFlBQWdDO1FBSTVDLG9CQUFlLEdBQ3RCLFVBQVUsRUFBVTtZQUNoQixJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztZQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztvQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxDQUFDO1lBQ0QsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1FBQzdCLENBQUMsQ0FBQTtRQUVNLGNBQVMsR0FDaEIsVUFBVSxFQUFVO1lBQ2hCLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVqRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDO1lBRXJCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztZQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7Z0JBQ2hELFFBQVEsR0FBRyxRQUFRLElBQUksaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFBO1FBeEJHLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUF3QkwsNkJBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLDhCQUFzQix5QkE2QmxDLENBQUEifQ==