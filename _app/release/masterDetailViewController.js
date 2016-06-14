"use strict";
var MasterDetailViewController = (function () {
    // masterListViewController: IListViewController;
    // detailsViewController: IDetailsViewController;
    function MasterDetailViewController(masterListViewController, detailsViewController) {
        masterListViewController.addEventCallback("selectedChanged", function (e) {
            detailsViewController.showDetails(e);
        });
    }
    return MasterDetailViewController;
}());
exports.MasterDetailViewController = MasterDetailViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzdGVyRGV0YWlsVmlld0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9fc291cmNlL21hc3RlckRldGFpbFZpZXdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQTtJQUVJLGlEQUFpRDtJQUNqRCxpREFBaUQ7SUFFakQsb0NBQW1CLHdCQUE2QyxFQUM1RCxxQkFBNkM7UUFFN0Msd0JBQXdCLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxDQUFDO1lBQzNELHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxpQ0FBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksa0NBQTBCLDZCQVl0QyxDQUFBIn0=