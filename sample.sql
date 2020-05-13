-- Query for logging in as user
SELECT user_id FROM User WHERE display_name=:user AND password_hash=(:hashed_password)

-- Select clicked recipe by id
SELECT (recipe_name, date_posted) FROM Recipe WHERE recipe_id=:id

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
