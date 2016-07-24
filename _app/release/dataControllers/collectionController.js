"use strict";
var CollectionController = (function () {
    function CollectionController(collection) {
        this.contains = function (item) {
            if (!this.collection)
                return false;
            for (var ii = 0; ii < this.collection.length; ii++) {
                if (this.collection[ii] === item)
                    return true;
            }
            return false;
        };
        this.collection = collection;
    }
    return CollectionController;
}());
exports.CollectionController = CollectionController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fc291cmNlL2RhdGFDb250cm9sbGVycy9jb2xsZWN0aW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUE7SUFJSSw4QkFBbUIsVUFBb0I7UUFJdkMsYUFBUSxHQUF5QixVQUFVLElBQU87WUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUNqRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQztvQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2xELENBQUM7WUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQTtRQVRHLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFTTCwyQkFBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBZlksNEJBQW9CLHVCQWVoQyxDQUFBIn0=