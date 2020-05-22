$(document).ready(function(){
    $(document).on("keydown", "#recipe-directions-container li" , function(e) {
        if( $(this).is('#recipe-directions-container li:last-child') && e.keyCode !== 8 && e.keyCode !== 46){
            $("#recipe-directions-container").append(`
            <li>
                <div class='recipe-direction'>
                    <input type="text" class='recipe-instruction' placeholder="Next Step" />
                    <img id="link-recipe" src="./SVG/link-icon.svg"/>
                    <img class='remove-button' src="./SVG/remove-icon.svg"/>
                </div>
            </li>`);
        }
    });

    $(document).on("keydown", "#recipe-ingredients-container li" , function(e) {
        if( $(this).is($('#recipe-ingredients-container li:last-child')) && e.keyCode !== 8 && e.keyCode !== 46){
            $("#recipe-ingredients-container").append(`
            <li>
                <div class='ingredient-info'>
                    <input type="text" class='ingredient' placeholder="New Ingredient"/>
                    <input type="number" class='ingredient-amount' placeholder="Amount"/>
                    <select class='ingredient-unit'>
                        <option value='tsp'>tsp</option>
                        <option value='tbsp'>tbsp</option>
                        <option value='floz'>fl oz</option>
                        <option value='cup'>cup</option>
                        <option value='pint'>pint</option>
                        <option value='lb'>lb</option>
                        <option value='ounce'>oz</option>
                        <option value='g'>g</option>
                    </select>
                    <img class='remove-button' src="./SVG/remove-icon.svg"/>
                </div>
            </li>`);
        }
    });

    $(document).on("click", ".remove-button" , function() {
        $(this).parent().parent().remove();
    });
});