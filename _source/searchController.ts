export class SearchController {
    
    public constructor(searchInput: HTMLInputElement) {
        searchInput.addEventListener("input", function(e) {
            console.log(searchInput.value);
        });
    }
}