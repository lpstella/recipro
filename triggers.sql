--| Deleting a recipe
--  Remove the recipe
DELETE FROM Recipes WHERE recipe_id=:delete_this;
--  Remove any comments on the recipe
DELETE FROM Comments WHERE recipe_id=:delete_this;
--  Unset ingredients that have that recipe_id set
UPDATE Ingredients SET recipe_id=NULL WHERE recipe_id=:delete_this;
--  Remove recipe from any recipe lists
DELETE FROM Has_recipes WHERE recipe_id=:delete_this;
