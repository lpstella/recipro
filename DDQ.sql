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

INSERT INTO Users (display_name, email, password_hash) VALUES
("Adam", "adam@email.org", "f3fd8f664c016fec4372773c6b6ac06d0789857297b2473bcd33fba523dad5fc"),
("Beth", "bth@supersecret.co", "dc565f311328834d77175f95def110a6e549cc29cc75d7098038cc2a47a45c7f"),
("Charles", "charliesemail@ungoogle.com", "0a12239c5adb15e8ac218581f12101fc736f32d4f007d7d9a6dbbf18c3359257"),
("Debra", "debs@people.org", "0dbf6afeb6be2e262aff00c3bdf7d8e5a9877effcbecf3b6e224cc3b0e27c25f"),
("Eric", "erickson@fbi.gov", "269cca9cdacda99cf8f01578379463311aa0d2d283abb069bf2d601e5d20c531"),
("Francesca", "france@userbase.edu", "c3d03b51181efddd687c7202dcdf855500ca219e125eecbc843e76463b805014"),
("Garret", "garry@home.com", "8a4f5c7851cc86ee9bce216dc9dbe5e019e6a827fe99678e60962b773a80a6b8"),
("Heather", "hthr@56.239.235.91", "03f8becfbd61469e29630c27a0eaf30496c38dfa943cf800dbbb9853bb607670"),
("Ian", "ianspersonal@bigcorporation.org", "23943530efebde62b6e56c507ecaeed82498a0df2549d80c0a594e55d11d1d3b"),
("Janet", "jan@jan.com", "531e7359e4683cedd3bbceeda134688b0324210350ca557d6913b683b2aa356e"),
("Admin", "admin@10.0.0.1", "fc8252c8dc55839967c58b9ad755a59b61b67c13227ddae4bd3f78a38bf394f7");

INSERT INTO Recipe_Lists (list_name, privacy_status, user_id) VALUES
("Important Recipes", 1, (SELECT user_id FROM Users WHERE display_name="Eric")),
("My Secret Recipes", 1, (SELECT user_id FROM Users WHERE display_name="Heather")),
("Test Recipes 1", 0, (SELECT user_id FROM Users WHERE display_name="Admin")),
("Test Recipes 2", 0, (SELECT user_id FROM Users WHERE display_name="Admin")),
("Test Recipes 3", 0, (SELECT user_id FROM Users WHERE display_name="Admin")),
("Test Recipes 4", 0, (SELECT user_id FROM Users WHERE display_name="Admin")),
("Test Recipes 5", 0, (SELECT user_id FROM Users WHERE display_name="Admin")),
("Test Recipes 6", 0, (SELECT user_id FROM Users WHERE display_name="Admin")),
("Test Recipes 7", 0, (SELECT user_id FROM Users WHERE display_name="Admin")),
("Test Recipes 8", 0, (SELECT user_id FROM Users WHERE display_name="Admin"));

INSERT INTO Recipes (recipe_name, directions, recipe_id, date_posted, prep_time, user_id) VALUES
("Test Recipe #1", "This is a test recipe", NULL, "2020-05-06", 60, (SELECT user_id FROM Users WHERE display_name="Admin")), 
("Test Recipe #2", "This is a test recipe", NULL, "2020-05-06", 60, (SELECT user_id FROM Users WHERE display_name="Admin")), 
("Test Recipe #3", "This is a test recipe", NULL, "2020-05-06", 60, (SELECT user_id FROM Users WHERE display_name="Admin")), 
("Test Recipe #4", "This is a test recipe", NULL, "2020-05-06", 60, (SELECT user_id FROM Users WHERE display_name="Admin")), 
("Test Recipe #5", "This is a test recipe", NULL, "2020-05-06", 60, (SELECT user_id FROM Users WHERE display_name="Admin")), 
("Test Recipe #6", "This is a test recipe", NULL, "2020-05-06", 60, (SELECT user_id FROM Users WHERE display_name="Admin")), 
("Test Recipe #7", "This is a test recipe", NULL, "2020-05-06", 60, (SELECT user_id FROM Users WHERE display_name="Admin")), 
("Test Recipe #8", "This is a test recipe", NULL, "2020-05-06", 60, (SELECT user_id FROM Users WHERE display_name="Admin")), 
("Test Recipe #9", "This is a test recipe", NULL, "2020-05-06", 60, (SELECT user_id FROM Users WHERE display_name="Admin")), 
("Test Recipe #10", "This is a test recipe", NULL, "2020-05-06", 60, (SELECT user_id FROM Users WHERE display_name="Admin"));

INSERT INTO Ingredients (ingredient_name, recipe_id) VALUES
("A", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1")),
("B", NULL),
("C", NULL),
("D", NULL),
("E", NULL),
("F", NULL),
("G", NULL),
("H", NULL),
("I", NULL),
("J", NULL),
("K", NULL);

INSERT INTO Comments (comment_body, recipe_rating, recipe_difficulty, post_date, recipe_id, user_id) VALUES
("This was a hard recipe :c", 2, 5, "2020-05-06", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1"), (SELECT user_id FROM Users WHERE display_name="Admin")),
("This was a hard recipe :c", 2, 5, "2020-05-06", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1"), (SELECT user_id FROM Users WHERE display_name="Admin")),
("This was a hard recipe :c", 2, 5, "2020-05-06", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1"), (SELECT user_id FROM Users WHERE display_name="Admin")),
("This was a hard recipe :c", 2, 5, "2020-05-06", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1"), (SELECT user_id FROM Users WHERE display_name="Admin")),
("This was a hard recipe :c", 2, 5, "2020-05-06", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1"), (SELECT user_id FROM Users WHERE display_name="Admin")),
("This was a hard recipe :c", 2, 5, "2020-05-06", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1"), (SELECT user_id FROM Users WHERE display_name="Admin")),
("This was a hard recipe :c", 2, 5, "2020-05-06", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1"), (SELECT user_id FROM Users WHERE display_name="Admin")),
("This was a hard recipe :c", 2, 5, "2020-05-06", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1"), (SELECT user_id FROM Users WHERE display_name="Admin")),
("This was a hard recipe :c", 2, 5, "2020-05-06", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1"), (SELECT user_id FROM Users WHERE display_name="Admin")),
("This was a hard recipe :c", 2, 5, "2020-05-06", (SELECT recipe_id FROM Recipes WHERE recipe_name="Test Recipe #1"), (SELECT user_id FROM Users WHERE display_name="Admin"));

INSERT INTO Contains (amount, recipe_id, ingredient_id) VALUES 
("1 Unit", 1, 1),
("1 Unit", 2, 1),
("1 Unit", 3, 1),
("1 Unit", 4, 1),
("1 Unit", 5, 1),
("1 Unit", 6, 1),
("1 Unit", 7, 1),
("1 Unit", 8, 1),
("1 Unit", 9, 1),
("1 Unit", 10, 1),
("1 Unit", 1, 2),
("1 Unit", 2, 2),
("1 Unit", 3, 2),
("1 Unit", 4, 2),
("1 Unit", 5, 2),
("1 Unit", 6, 2),
("1 Unit", 7, 2),
("1 Unit", 8, 2),
("1 Unit", 9, 2),
("1 Unit", 10, 2);

INSERT INTO Has_recipes (list_id, recipe_id) VALUES 
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10),
(5,1),
(8,3);

INSERT INTO Has_ingredient (amount, ingredient_id, user_id) VALUES 
("1 Cup", 1, 10),
("3 Bunches", 2, 10),
("2 Tsp", 3, 10),
("3 Cups", 4, 10),
("2 Cup", 5, 7),
("1 Cup", 6, 10),
("1 Cup", 7, 6),
("1 Cup", 8, 3),
("1 Cup", 9, 10),
("1 Cup", 10, 10);