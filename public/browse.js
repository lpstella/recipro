const toggleDropDown = (e, parent, toggleStatus) => {   
    let recipeListDropDown = document.getElementById('recipe-list-dropdown');
    toggleStatus ? recipeListDropDown.classList.add('visible') : recipeListDropDown.classList.remove('visible');
    toggleStatus && parent.parentElement.appendChild(recipeListDropDown);
    console.log( );
    if (toggleStatus && document.getElementById('recipe-list-dropdown').childElementCount == 0)
        window.location.replace("./login");
}

window.addEventListener('DOMContentLoaded', function () {     // Add button event listeners inside of here to be loaded after all of the dom content
});