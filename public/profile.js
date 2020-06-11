function deleteRecipe(recipe_id) {
    var req = new XMLHttpRequest();
    req.open("DELETE", "/recipe/" + recipe_id, true);
    req.onload = function () {
    	if (req.readyState == 4 && req.status == "200") {
            window.location.reload();
    	} else {
    		console.error("Failed to delete recipe " + recipe_id);
    	}
    }
    req.send(null);
}

function deleteList(list_id) {
    var req = new XMLHttpRequest();
    req.open("DELETE", "/list/" + list_id, true);
    req.onload = function () {
        if (req.readyState == 4 && req.status == "200") {
            window.location.reload();
        } else {
            console.error("Failed to delete recipe list " + list_id);
        }
    }
    req.send(null);
}

function deleteComment(comment_id) {
    var req = new XMLHttpRequest();
    req.open("DELETE", "/comment/" + comment_id, true);
    req.onload = function () {
    	if (req.readyState == 4 && req.status == "200") {
            window.location.reload();
    	} else {
    		console.error("Failed to delete comment " + comment_id);
    	}
    }
    req.send(null);
}

function deleteIngredient(ingredient_id) {
    var req = new XMLHttpRequest();
    req.open("DELETE", "/ingredient/" + ingredient_id, true);
    req.onload = function () {
    	if (req.readyState == 4 && req.status == "200") {
            window.location.reload();
    	} else {
    		console.error("Failed to delete ingredient " + ingredient_id);
    	}
    }
    req.send(null);
}

function changeDisplayName(newName) {
    var req = new XMLHttpRequest();
    
    req.open("POST", "/update-name", true);
    req.onreadystatechange = () => {
        if (req.status === 200 && req.readyState === 4) {
            window.location.reload();
        }
    }
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.send(JSON.stringify({ "newName": newName}));
}

function getChildCount(element) {
    var childCount = -1;
    if ('childElementCount' in element) {
        childCount = element.childElementCount;
    } else {
        if (element.children) {
            childCount = element.children.length;
        } else {  // Firefox before version 3.5
            var child = element.firstChild;
            while (child) {
                if (child.nodeType == 1 /*Node.ELEMENT_NODE*/) {
                    childCount++;
                }
                child = child.nextSibling;
            }
        }
    }
    return childCount;
}

$(document).ready(function() {
    $(document).on("click", ".remove-button" , function() { //delete recipe calls
        $(this).parent().remove(); //delete the vert-list-element div

        //var childCount = getChildCount(document.getElementsByClassName("vert-list"));

        // if (childCount == 0) {
        //     temp = document.createElement('h5');
        //     temp.innerHTML = "User has no items yet";
        //     document.write(temp);
        //     document.body.insertAdjacentHTML('afterbegin', temp);
        // }
    });
    $(document).on("blur", '#profile-display-name', () => {
        changeDisplayName($('#profile-display-name').val());
    })
});
