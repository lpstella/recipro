
function deleteRecipe(recipe_id) {
    db.deleteRecipe(recipe_id).then((value), (SQLerror) => console.log(SQLerror));
}

function deleteList(list_id) {

}

function deleteComment(comment_id) {

}

function deleteIngredient(ingredient_id) {

}

$(document).ready(function() {
    $(document).on("click", ".remove-button" , function() {
        $(this).parent().remove(); //delete the vert-list-element div

        //check if the vert-list is empty (1 for button at bottom)
        console.log(document.getElementsByClassName("vert-list").childElementCount);
        if (document.getElementsByClassName("vert-list").childElementCount == 1) {
            temp = document.createElement('h5');
            temp.innerHTML = "User has no items yet";
            document.body.insertAdjacentHTML('afterbegin', temp);
        }
    });
});
