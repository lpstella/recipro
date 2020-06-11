-- Select all users
SELECT * FROM Users;

-- Insert a new user
INSERT INTO Users SET :newUser;

-- Select newest user inserted
SELECT LAST_INSERT_ID() AS :userId;

-- Get user from email
SELECT user_id, password_hash FROM Users WHERE email = :email;

-- Get recipes
SELECT * FROM Recipes LEFT JOIN Users on Recipes.user_id=Users.user_id ORDER BY Recipes.recipe_id DESC;

-- Get recipes by user
SELECT * FROM Recipe_Lists WHERE user_id = :userId;

-- Get ingredients
SELECT ingredient_name FROM (
                    SELECT ingredient_id, count(ingredient_id) FROM Recipes LEFT JOIN Contains on Recipes.recipe_id=Contains.recipe_id WHERE ingredient_id IS NOT NULL GROUP BY ingredient_id ORDER BY count(ingredient_id) DESC
               ) as Counts LEFT JOIN Ingredients on Counts.ingredient_id=Ingredients.ingredient_id;

-- Get recipe by user from recipe id
SELECT * FROM Recipes INNER JOIN Users ON Recipes.user_id=Users.user_id WHERE recipe_id = :recipeId;

-- Get user from id
SELECT * FROM Users WHERE user_id = :userId;

-- Get user lists from id
SELECT * FROM Users U INNER JOIN Recipe_Lists R ON R.user_id = U.user_id WHERE R.list_id = :listId;

-- Get user recipes
SELECT * FROM Recipes R WHERE R.user_id = :userId;

-- Get user lists
SELECT * FROM Recipe_Lists WHERE list_id = :listId;

-- Get recipes from list
SELECT * FROM Recipes R INNER JOIN Has_recipes L ON R.recipe_id = L.recipe_id WHERE L.list_id = :listId;

-- Get user comments
SELECT * FROM Comments C WHERE C.user_id = :userId;

-- Get user;s ingredients
SELECT * FROM Has_ingredient HI INNER JOIN Ingredients I ON I.ingredient_id=HI.ingredient_id WHERE HI.user_id = :userId;

-- Get comments for recipe
SELECT comment_body, recipe_rating, Comments.user_id, display_name, post_date FROM Comments INNER JOIN Users ON Comments.user_id=Users.user_id WHERE recipe_id = :recipeId;

-- Get recipe's ingredients
SELECT * FROM Contains INNER JOIN Ingredients ON Contains.ingredient_id=Ingredients.ingredient_id WHERE Contains.recipe_id = :recipeId;

-- Get recipes from like string
SELECT * FROM Recipes WHERE recipe_name LIKE "%:string%";

-- Insert Recipe
INSERT INTO Recipes SET :recipes;

-- Insert Lists
INSERT INTO Recipe_Lists SET :lists;

-- Insert Recipe into List
INSERT INTO Has_recipes SET :recipes

-- Delete Recipe
DELETE FROM Recipes WHERE recipe_id = :recipeId;
DELETE FROM Comments WHERE recipe_id = :recipeId;
DELETE FROM Has_recipes WHERE recipe_id = :recipeId;

-- Delete comment
DELETE FROM Comments WHERE comment_id = :commentId;

-- Delete list
DELETE FROM Recipe_Lists WHERE list_id = :listId;
DELETE FROM Has_recipes WHERE list_id = :listId;

-- Insert ingredient or don't and return the index
INSERT IGNORE INTO Ingredients SET :ingredients;
SELECT ingredient_id FROM Ingredients WHERE ingredient_name = :name;

-- Get the ingredient by name
SELECT ingredient_id FROM Ingredients WHERE ingredient_name = :name;

-- Insert contains
INSERT INTO Contains SET :content;

-- Insert comment
INSERT INTO Comments SET :comment;

-- Unlink a recipe from a list
DELETE FROM Has_recipes WHERE recipe_id = ?\:recipeId AND list_id = :listId;