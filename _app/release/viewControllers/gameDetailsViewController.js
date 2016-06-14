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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURldGFpbHNWaWV3Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19zb3VyY2Uvdmlld0NvbnRyb2xsZXJzL2dhbWVEZXRhaWxzVmlld0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBO0lBSUksbUNBQW1CLGFBQXNCO1FBSWxDLGdCQUFXLEdBQ2xCLFVBQVUsRUFBVTtZQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUN6RCxDQUFDLENBQUE7UUFORyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBTUwsZ0NBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLGlDQUF5Qiw0QkFZckMsQ0FBQSJ9