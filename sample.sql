-- Query for logging in as user
SELECT user_id FROM Users WHERE display_name=:user AND password_hash=(:hashed_password)

-- Select clicked recipe by id
SELECT (recipe_name, date_posted) FROM Recipes WHERE recipe_id=:id

-- Create a Recipe
INSERT INTO Recipes (recipe_name, prep_time, directions, date_posted, user_id)
    VALUES (:name, :preptime, :directions, :date, :user);

-- Update a Recipe with id
UPDATE Recipe_Lists SET
    list_name=:name, 
    privacy_status=:private,
    user_id=:user 
WHERE list_id=:id;

-- Delete all comments for a user with user_id id
DELETE FROM Comments WHERE user_id=:id;

-- Get ingredient created from recipe of id
SELECT ingredient_name FROM Ingredients WHERE recipe_id=:id;

-- Get all recipes from list_id id
SELECT recipe_name FROM Recipes R, has_recipes HR WHERE R.recipe_id=HR.recipe_id AND HR.lisit_id=:id

-- Get recipe_id's that contain ingredient of id
SELECT recipe_id FROM contains WHERE ingredient_id=:id
