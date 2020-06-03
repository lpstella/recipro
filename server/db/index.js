const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const bcrypt = require('bcrypt');
const matchSorter = require('match-sorter');
// This file's purpose is to define all of the database queries in one place and then be able to call each function using the 'db' variable

const mysqlConnection = mysql.createConnection({
     host: 'classmysql.engr.oregonstate.edu',
     user: 'cs340_olsonpa',
     password: 'ozzyjager2013',
     database: 'cs340_olsonpa',
     multipleStatements: true
});

mysqlConnection.connect((err) => {
     if (err) {
          throw err;
     }
     console.log("MySQL connected...");
});

let db = {};

db.all = () => {

     return new Promise((resolve, reject) => {
          mysqlConnection.query('SELECT * FROM Users', (err, resolve) => {
               if (err) {
                    return reject(err);
               }
               return resolve(results);
          });
     });
};


db.insertNewUser = (newUser, req, res) => {
     let sql = 'INSERT INTO Users SET ?';                        // Inserts new user into Users table
     let loginQuery = 'SELECT LAST_INSERT_ID() AS user_id';      // Upon successful insert, select the user id of that most recent insert

     return new Promise((resolve, reject) => {

          mysqlConnection.query(sql, newUser, (err, results) => {        // Constructs a query to the db and passes the newUser object containing user info to the query
               if (err) {
                    if (err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {          // If there is a duplicate, throw the error, still need an alert on the front end for this
                         //alert('A user with those credentials already exists...');
                         return console.log("Duplicate Entry...user not added to the datebase.");
                    }
                    return reject(err);
               }


               // const user_id = results.insertId;

               // console.log(user_id);
               // req.login(user_id, function (err) {
               //      return res.status(200).redirect('/');
               // });

               mysqlConnection.query(loginQuery, (err, results) => {
                    if (err) { return next(err) };

                    const user_id = results[0];                  // Grabs the most recent user id and stores in user_id

                    console.log(user_id);
                    req.login(user_id, function (err) {       // Upon successful insert of new user, log that new user in using passport's login function and redirect them to home
                         return res.status(200).redirect('/');
                    });
               });

               return resolve(results);
          });
     });
};

db.loginValidation = (email, password, done) => {
     let sql = 'SELECT user_id, password_hash FROM Users WHERE email = ?';

     return new Promise((resolve, reject) => {
          mysqlConnection.query(sql, [email], (err, results, fields) => {
               if (err) {
                    return done(err);                  // If there is an error in the query throw the error
                    //return reject(err);
               }

               if (results.length === 0) {             // If email doesn't exist, fail the authentication
                    return done(null, false);
               }
               else {
                    //return resolve(results),         // If the email is found do the following:

                    const hash = results[0].password_hash.toString();      // Store password hash from db into hash var
                    console.log(hash);

                    bcrypt.compare(password, hash, function (err, response) {        // Compare plain text password input from login against the db hash using
                         if (response === true) {                                   // bcrypt's compare function
                              return done(null, { user_id: results[0].user_id });       // If the hash matches the password, authentication is complete, set user_id to id in db
                         }
                         else {
                              return done(null, false, { message: 'Invalid email or password!' });   // If the hash and password are not equal, fail authentication and send error
                         }
                    });
                    //return done(null, false);
               }
          });
     });
};

db.getRecipes = (criteria) => {
     let sql = 'SELECT * FROM Recipes';

     return new Promise((resolve, reject) => {
          mysqlConnection.query(sql, [], (err, results, fields) => {
               if (err) {
                    return done(err);
               }
               const sorted = matchSorter(results, criteria.name, {keys: [item => item.recipe_name]})
               return resolve(sorted);
          });
     });
}

db.queryRecipeId = (id) => {
     let sql = 'SELECT * FROM Recipes INNER JOIN Users ON Recipes.user_id=Users.user_id WHERE recipe_id = ?';
     return new Promise((resolve, reject) => {
          mysqlConnection.query(sql, [id], (err, results, fields) => {
               if(err){
                    return done(err);
               }
               return resolve(results);
          });
     });
}

db.getIngredientsForRecipe = (recipe_id) => {
     let sql = 'SELECT * FROM Contains INNER JOIN Ingredients ON Contains.ingredient_id=Ingredients.ingredient_id WHERE Contains.recipe_id = ?';
     return new Promise((resolve, reject) => {
          mysqlConnection.query(sql, [recipe_id], (err, results, fields) => {
               if(err){
                    return reject(err);
               }
               return resolve(results);
          });
     });
}

db.queryRecipeString = (nameQuery) => {
     let sql = 'SELECT * FROM Recipes WHERE recipe_name LIKE "%?%"';

     return new Promise((resolve, reject) => {
          mysqlConnection.query(sql, [nameQuery], (err, results, fields) => {
               if (err) {
                    return done(err);
               }
               return resolve(results);
          });
     });
}

// Inserts recipe into table, returns recipe_id
db.insertRecipe = (recipe, req, res) => {
     let sql = 'INSERT INTO Recipes SET ?';

     return new Promise((resolve, reject) => {

          mysqlConnection.query(sql, recipe, (err, results) => {
               if (err) {
                    return reject(err);
               }
               return resolve(results.insertId);
          });
     });
};

// Check if ingredient exists by searching name the insert,
// Return ingredient_id of new or existing ingredient.
db.insertIngredient = (ingredient) => {
     let sql = 'INSERT INTO Ingredients SET ?';
     let existanceCheck = 'SELECT ingredient_id FROM Ingredients WHERE ingredient_name = ?';
     
     return new Promise((resolve, reject) => {
          mysqlConnection.query(existanceCheck, ingredient.ingredient_name, (err, results) => {
               // Search for existing ingredient by the same name, if it exists return that id
               if(results>null){
                    return(results);
               } 
               // Else insert the ingredient and return the id
               else {
                    console.log("Creating table entry for "+ingredient.ingredient_name);
                    mysqlConnection.query(sql, ingredient, (error, res) => {
                         if (error) resolve(error);
                         return resolve(res.insertId);
                    });
               }
          });
     });
}

db.queryIngredientIdByName = (ingredientName) => {
     let sql = 'SELECT ingredient_id FROM Ingredients WHERE ingredient_name = ?';
     
     return new Promise((resolve, reject) => {
          mysqlConnection.query(sql, ingredientName, (err, results) => {
               if(err){
                    return null;
               }
               return results[0];
          });
     });
}

db.insertContains = (ingredient) => {
     let sql = 'INSERT INTO Contains SET ?';

     return new Promise((resolve, reject) => {
          mysqlConnection.query(sql, ingredient, (err, results) => {
               if(err){
                    return reject(err);
               }
               return resolve(results);
          });
     });
}


passport.serializeUser(function (user_id, done) {      // These two functions are used by passport to track user sessions
     done(null, user_id);                              // documentation can be found at: http://www.passportjs.org/docs/
});

passport.deserializeUser(function (user_id, done) {
     done(null, user_id);
});



module.exports = db;
