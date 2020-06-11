CREATE TABLE Users
(
  display_name VARCHAR(18) NOT NULL UNIQUE,
  user_id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(40) NOT NULL UNIQUE,
  password_hash BINARY(64) NOT NULL,
  profile_img varchar(100),
  PRIMARY KEY (user_id),
  CONSTRAINT user_name UNIQUE (display_name)
);

CREATE TABLE Recipe_Lists
(
  list_name VARCHAR(18) NOT NULL,
  list_id INT NOT NULL AUTO_INCREMENT,
  privacy_status INT NOT NULL,
  user_id INT,
  PRIMARY KEY (list_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Recipes
(
  recipe_name VARCHAR(18) NOT NULL,
  directions TEXT NOT NULL,
  recipe_id INT NOT NULL AUTO_INCREMENT,
  date_posted DATE NOT NULL,
  prep_time INT NOT NULL,
  user_id INT NOT NULL,
  recipe_img VARCHAR(100),
  PRIMARY KEY (recipe_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ingredients
(
  ingredient_id INT NOT NULL AUTO_INCREMENT,
  ingredient_name VARCHAR(18) NOT NULL,
  recipe_id INT,
  PRIMARY KEY (ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
  CONSTRAINT reusable_ingredients UNIQUE (ingredient_name)
);

CREATE TABLE Comments
(
  comment_body TEXT NOT NULL,
  recipe_rating INT NOT NULL,
  recipe_difficulty INT NOT NULL,
  comment_id INT NOT NULL AUTO_INCREMENT,
  post_date DATE NOT NULL,
  recipe_id INT NOT NULL,
  user_id INT,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Contains
(
  amount VARCHAR(18) NOT NULL,
  recipe_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  modifier VARCHAR(18),
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
);

CREATE TABLE Has_recipes
(
  list_id INT NOT NULL,
  recipe_id INT NOT NULL,
  PRIMARY KEY (list_id, recipe_id),
  FOREIGN KEY (list_id) REFERENCES Recipe_Lists(list_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);

CREATE TABLE Has_ingredient
(
  amount INT NOT NULL,
  ingredient_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (ingredient_id, user_id),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE sessions(
  session_id VARCHAR(128) NOT NULL,
  expires INT NOT NULL,
  data MEDIUMTEXT
);