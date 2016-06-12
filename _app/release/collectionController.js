"use strict";
var CollectionController = (function () {
    function CollectionController(collection) {
        this.check = function (item) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9fc291cmNlL2NvbGxlY3Rpb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQTtJQUlJLDhCQUFtQixVQUFvQjtRQUl2QyxVQUFLLEdBQXNCLFVBQVUsSUFBTztZQUN4QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDbEQsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFBO1FBUkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQVFMLDJCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSw0QkFBb0IsdUJBY2hDLENBQUEifQ==