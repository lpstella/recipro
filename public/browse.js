const toggleDropDown = (e, parent, toggleStatus) => {
    console.log('hover');
    let recipeListDropDown = document.getElementById('recipe-list-dropdown');
    toggleStatus ? recipeListDropDown.classList.add('visible') : recipeListDropDown.classList.remove('visible');
    toggleStatus && parent.parentElement.appendChild(recipeListDropDown);
    console.log( );
    if (toggleStatus && document.getElementById('recipe-list-dropdown').childElementCount == 0)
        window.location.replace("./login");
}

addToList = () => {
    let listSelector = document.getElementById('user-lists');
    let selected = listSelector.selectedIndex;
    let listId = listSelector.children[selected].value;

    var req = new XMLHttpRequest();
    req.open("POST", "/list-addition");
    req.onreadystatechange = () => {
        if (req.status === 200 && req.readyState === 4) {
            window.location.reload();
        }
    }
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.send(JSON.stringify({ "list": listId, "recipe": window.location.pathname.replace('/recipe/', '')}));
}

window.addEventListener('DOMContentLoaded', function () {     // Add button event listeners inside of here to be loaded after all of the dom content
});