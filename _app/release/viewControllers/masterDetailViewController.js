"use strict";
var MasterDetailViewController = (function () {
    function MasterDetailViewController(masterListViewController, detailsViewController) {
        masterListViewController.addEventCallback("selectedChanged", function (e) {
            detailsViewController.showDetails(e);
        });
    }
    return MasterDetailViewController;
}());
exports.MasterDetailViewController = MasterDetailViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzdGVyRGV0YWlsVmlld0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL3ZpZXdDb250cm9sbGVycy9tYXN0ZXJEZXRhaWxWaWV3Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0E7SUFFSSxvQ0FBbUIsd0JBQTZDLEVBQzVELHFCQUE2QztRQUU3Qyx3QkFBd0IsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLENBQUM7WUFDM0QscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGlDQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSxrQ0FBMEIsNkJBU3RDLENBQUEifQ==