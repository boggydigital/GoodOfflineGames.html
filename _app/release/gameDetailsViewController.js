"use strict";
var GameDetailsViewController = (function () {
    function GameDetailsViewController(parentElement) {
        this.showDetails = function (id) {
            this.parentElement.innerHTML = "<h1>" + id + "</h1>";
        };
        this.parentElement = parentElement;
    }
    return GameDetailsViewController;
}());
exports.GameDetailsViewController = GameDetailsViewController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19zb3VyY2UvZ2FtZURldGFpbHNWaWV3Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFJSSxtQ0FBbUIsYUFBc0I7UUFJbEMsZ0JBQVcsR0FDbEIsVUFBVSxFQUFVO1lBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ3pELENBQUMsQ0FBQTtRQU5HLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFNTCxnQ0FBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksaUNBQXlCLDRCQVlyQyxDQUFBIn0=