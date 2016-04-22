"use strict";
var SearchController = (function () {
    function SearchController(searchInput) {
        searchInput.addEventListener("input", function (e) {
            console.log(searchInput.value);
        });
    }
    return SearchController;
}());
exports.SearchController = SearchController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL19zb3VyY2Uvc2VhcmNoQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7SUFFSSwwQkFBbUIsV0FBNkI7UUFDNUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUM7WUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQVBZLHdCQUFnQixtQkFPNUIsQ0FBQSJ9