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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdEZpbGVzQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2UvZGF0YUNvbnRyb2xsZXJzL3Byb2R1Y3RGaWxlc0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0lBQUE7SUFhQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQWJZLG1CQUFXLGNBYXZCLENBQUE7QUFlRDtJQUdJLGdDQUFtQixZQUFnQztRQUk1QyxvQkFBZSxHQUN0QixVQUFVLEVBQVU7WUFDaEIsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7WUFDM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUNuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ2hDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUNELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDLENBQUE7UUFFTSxjQUFTLEdBQ2hCLFVBQVUsRUFBVTtZQUNoQixJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFakQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUVyQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUNoRCxRQUFRLEdBQUcsUUFBUSxJQUFJLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUMzRCxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQTtRQXhCRyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBd0JMLDZCQUFDO0FBQUQsQ0FBQyxBQTdCRCxJQTZCQztBQTdCWSw4QkFBc0IseUJBNkJsQyxDQUFBIn0=