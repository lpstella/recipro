$(document).ready(function () {
     $(document).on("keydown", "#recipe-directions-container li", function (e) {
          if ($(this).is('#recipe-directions-container li:last-child') && e.keyCode !== 8 && e.keyCode !== 46) {
               $("#recipe-directions-container").append(`
            <li>
                <div class='recipe-direction'>
                    <input type="text" class='recipe-instruction' placeholder="Next Step" />
                    <img id="link-recipe" src="/static/SVG/link-icon.svg"/>
                    <img class='remove-button' src="/static/SVG/remove-icon.svg"/>
                </div>
            </li>`);
          }
     });

     $(document).on("keydown", "#recipe-ingredients-container li", function (e) {
          if ($(this).is($('#recipe-ingredients-container li:last-child')) && e.keyCode !== 8 && e.keyCode !== 46) {
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
                    <img class='remove-button' src="/static/SVG/remove-icon.svg"/>
                </div>
            </li>`);
          }
     });

     $(document).on("click", ".remove-button", function () {
          $(this).parent().parent().remove();
     });
     // });


     $(document).on("click", "#submitRecipe", function (e) {
          e.preventDefault();

          let createJson = {
               "recipe_name": null,
               "directions": null,
               "ingredient": [],
               "date": null,
               "prep_time": null,
               "user_id": null,
               "recipe_img": null
          };

          createJson.recipe_name = document.getElementById("recipe-title").value;
          console.log(createJson.recipe_name);

          // Define createJSON.recipe_img here

          createJson.recipe_img = document.getElementById('recipe-img-upload').files[0];
          console.log(createJson.recipe_img);

          let elements = document.getElementsByClassName("recipe-instruction");

          // For each direction not counting the empty
          for (i = 0; i < elements.length - 1; i++) {
               if (i == 0) {
                    createJson.directions = elements[i].value;
               } else {
                    createJson.directions += elements[i].value;
               }

               // Terminate each new line with a '\0'
               if (i != elements.length - 2) {
                    createJson.directions += '\0'
               }
          }
          console.log("Directons " + createJson.directions);


          elements = document.getElementsByClassName("ingredient");

          let amount = document.getElementsByClassName("ingredient-amount");
          let units = document.getElementsByClassName("ingredient-unit");

          // Add each ingredient not counting empty
          for (i = 0; i < elements.length - 1; i++) {
               if (elements[i].value === "" || amount[i].value === "" || (elements[i].value === "" && amount[i].value === "")) {
                    alert("Missing ingredient fields!");
                    return;
               }
               createJson.ingredient[i] = {
                    "ingredient_name": elements[i].value,
                    "amount": amount[i].value,
                    "unit": units[i].options[units[i].selectedIndex].value
               }

               // Printing ingredients to console
               console.log("Ingredient #" + (i + 1) + ":\n" +
                    "Name:\t" + createJson.ingredient[i].ingredient_name + "\n" +
                    "Amount:\t" + createJson.ingredient[i].amount + "\n" +
                    "Unit:\t" + createJson.ingredient[i].unit
               );
          }
          let d = new Date();
          createJson.date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
          console.log("Posted: " + createJson.date);

          /*
          Need to do
          JSON.prep_time we don't have this anywhere on the page
          JSON.image && IMPLEMENT INTO DATABASE
          */

          // if (createJson.recipe_img != null) {
          //      let req = new XMLHttpRequest();

          //      req.open("POST", "/new-recipe");
          //      req.setRequestHeader("Content-Type", "multipart/form-data");
          //      req.send()
          // } else {
          //      alert("Missing recipe image!");
          // }

          if (createJson.recipe_name != null && createJson.directions != null && createJson.ingredient.length > 0 && createJson.date != null) {
               // let req = new XMLHttpRequest();

               // req.onreadystatechange = () => {
               //      if (this.status === 200 && this.readyState === 4) {
               //           this.value = "Submitted";
               //      }
               // }

               // req.open("POST", "/new-recipe");
               // // req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
               // req.setRequestHeader("Content-Type", "multipart/form-data; ");
               // req.send(JSON.stringify(createJson));

               // // Prevent resubmitting
               // this.disabled = true;
               // this.value = "Working..."


               sendFile(createJson.recipe_img, createJson);

          } else {
               alert("Missing required fields!");
          }

     });
});

function sendFile(file, recipe) {

     let form = document.getElementById('recipe-form');

     var formData = new FormData();
     var req = new XMLHttpRequest();

     formData.append("recipe-img", file, file.name);
     formData.append("recipeJSON", JSON.stringify(recipe));

     req.open("POST", "/new-recipe", true);

     // req.onreadystatechange = function () {
     //      if (req.readyState === 4) {
     //           if (req.status === 200) {
     //                console.log(req.responseText);
     //           } else {
     //                console.error(req.statusText);
     //           }
     //      }
     // };

     req.onreadystatechange = () => {
          if (this.status === 200 && this.readyState === 4) {
               console.log(req.responseText);
               // window.location.replace('/profile/' + req.responseText);
          }
     }

     req.send(formData);
}
