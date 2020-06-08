const db = require('../server/db');


function deleteRecipe(recipe_id) {
    db.deleteRecipe(recipe_id).then((value) => {
        console.log("recipe delete call: " + value);
    )}, (SQLerror) => console.log(SQLerror));
}


function deleteList(list_id) {

}

function deleteComment(comment_id) {

}
