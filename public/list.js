$(document).ready(function() {
    $(document).on("click", ".remove-button" , function() { //delete recipe calls
        $(this).parent().remove(); //delete the vert-list-element div
    });
});

function removeRecipe(listId, recipeId) {
    var req = new XMLHttpRequest();
    req.open("DELETE", "/list/" + listId + "/" + recipeId, true);
    req.onload = function () {
    	if (req.readyState == 4 && req.status == "200") {
            window.location.reload();
    	} else {
    		console.error("Failed to remove recipe " + recipeId + " from list " + listId);
    	}
    }
    req.send(null);
}
