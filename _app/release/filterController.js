"use strict";
var FilterItemViewModel = (function () {
    function FilterItemViewModel(name) {
        this.name = name;
    }
    return FilterItemViewModel;
}());
var FilterController = (function () {
    function FilterController(templateController, bindController, eventCallbackController) {
        var _this = this;
        this.selectionChangedEvent = "selectionChanged";
        this.setFilters = function (filters) {
            var html = new Array();
            var optionTemplate = _this.templateController.getTemplate("filterOption");
            filters.forEach(function (option) {
                html.push(_this.bindController.bindTemplateToModel(optionTemplate, new FilterItemViewModel(option)));
            });
            _this.filterControl.innerHTML += html.join("");
        };
        this.addEventCallback = function (event, callback) {
            this.eventCallbackController.addEventCallback(event, callback);
        };
        this.hide = function () {
            _this.filterControl.classList.add("hidden");
            _this.filterDisabled.classList.remove("hidden");
        };
        this.show = function () {
            _this.filterControl.classList.remove("hidden");
            _this.filterDisabled.classList.add("hidden");
        };
        this.templateController = templateController;
        this.bindController = bindController;
        this.eventCallbackController = eventCallbackController;
        this.filterControl = document.querySelector("#filter select");
        this.filterDisabled = document.querySelector("#filter .disabled");
        this.filterControl.addEventListener("change", function (e) {
            _this.eventCallbackController.fire(_this.selectionChangedEvent, e.target.value);
        });
    }
    return FilterController;
}());
exports.FilterController = FilterController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19zb3VyY2UvZmlsdGVyQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBbUJBO0lBR0ksNkJBQW1CLElBQVk7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFFRDtJQVlJLDBCQUNJLGtCQUF1QyxFQUN2QyxjQUFvRCxFQUNwRCx1QkFBaUQ7UUFmekQsaUJBMkRDO1FBakRHLDBCQUFxQixHQUFHLGtCQUFrQixDQUFDO1FBcUJwQyxlQUFVLEdBQ2pCLFVBQUMsT0FBc0I7WUFDbkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUMvQixJQUFJLGNBQWMsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3pFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO2dCQUNsQixJQUFJLENBQUMsSUFBSSxDQUNMLEtBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQ25DLGNBQWMsRUFDZCxJQUFJLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFBO1FBRU0scUJBQWdCLEdBQThCLFVBQVUsS0FBYSxFQUFFLFFBQWtCO1lBQzVGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFBO1FBRU0sU0FBSSxHQUNYO1lBQ0ksS0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUE7UUFFTSxTQUFJLEdBQ1g7WUFDSSxLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQTtRQTFDRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFFckMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO1FBRXZELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBc0IsQ0FBQztRQUNuRixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7WUFDNUMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FDN0IsS0FBSSxDQUFDLHFCQUFxQixFQUN6QixDQUFDLENBQUMsTUFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE4QkwsdUJBQUM7QUFBRCxDQUFDLEFBM0RELElBMkRDO0FBM0RZLHdCQUFnQixtQkEyRDVCLENBQUEifQ==