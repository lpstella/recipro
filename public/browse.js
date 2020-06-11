let lastId= null;

const toggleDropDown = (e, parent, toggleStatus, id = null) => {
    lastId = id;
    let recipeListDropDown = document.getElementById('recipe-list-dropdown');
    toggleStatus ? recipeListDropDown.classList.add('visible') : recipeListDropDown.classList.remove('visible');
    toggleStatus && parent.parentElement.appendChild(recipeListDropDown);
    console.log( );
    if (toggleStatus && document.getElementById('recipe-list-dropdown').childElementCount == 0)
        window.location.replace("./login");
}

addToList = (list_id) => {
    var req = new XMLHttpRequest();
    req.open("POST", "/list-addition");
    req.onreadystatechange = () => {
        if (req.status === 200 && req.readyState === 4) {
            alert('Recipe Added!');
        } else {
            alert('Already added!');
        }
    }
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.send(JSON.stringify({ "list": list_id, "recipe": lastId}));
}

window.addEventListener('DOMContentLoaded', function () {     // Add button event listeners inside of here to be loaded after all of the dom content
});