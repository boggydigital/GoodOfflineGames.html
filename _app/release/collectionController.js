"use strict";
var CollectionController = (function () {
    function CollectionController() {
        this.contstructor = function (collection) {
            this.collection = collection;
        };
        this.check = function (item) {
            for (var ii = 0; ii < this.collection.length; ii++) {
                if (this.collection[ii] === item)
                    return true;
            }
            return false;
        };
    }
    return CollectionController;
}());
exports.CollectionController = CollectionController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9fc291cmNlL2NvbGxlY3Rpb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQTtJQUFBO1FBSVcsaUJBQVksR0FBRyxVQUFVLFVBQW9CO1lBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLENBQUMsQ0FBQTtRQUVELFVBQUssR0FBc0IsVUFBVSxJQUFPO1lBQ3hDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUM7b0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNsRCxDQUFDO1lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUE7SUFDTCxDQUFDO0lBQUQsMkJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWRZLDRCQUFvQix1QkFjaEMsQ0FBQSJ9