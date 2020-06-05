const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');


const db = require('../server/db');

// const redirectLogin = (req, res, next) => {
//      if (!req.session.userId) {
//           res.redirect('/login');
//      } else {
//           next();
//      }
// };

const redirectHome = (req, res, next) => {
     if (req.session.userId) {
          res.redirect('/profile');
     } else {
          next();
     }
};

router.get('/browse', function (req, res) {
     const criteria = {
          name: req.query.name ? req.query.name : '',
     }
     db.getRecipes(criteria).then((results) =>
          db.getAllIngredients(criteria).then((ingredients) => {
               if (req.session.passport){
                    db.getUserRecipeLists(req.session.passport.user.user_id).then((userRecipeLists) => {
                         res.render('browse', {recipes: results, criteria_name: criteria.name, recipelists: userRecipeLists, ingredients});
                    })
               } else{
                    res.render('browse', {recipes: results, criteria_name: req.query.name || '', recipelists: null})
               }
          })
     )
});

router.get('/profile', authenticationMiddleware(), function (req, res) {        // Profile page is only loaded if the authenticationMiddleware function determines the user is
     res.redirect('/profile/' + req.session.passport.user.user_id);                                                     // authenticated and listed in the db, otherwise it redirects to /login
});

router.get('/new-recipe', authenticationMiddleware(), function (req, res) {        // New Recipe page is only loaded if the authenticationMiddleware function determines the user is
     res.render('new-recipe');                                                     // authenticated and listed in the db, otherwise it redirects to /login
});

router.post('/submit', authenticationMiddleware(), function (req, res) {

     // Need to add image once it is in the database
     let recipe = {
          "recipe_name": req.body.recipe_name,
          "directions": req.body.directions,
          "date_posted": req.body.date,
          "recipe_id": null,
          "prep_time": null,
          "user_id": req.session.passport.user.user_id,
     }

     db.insertRecipe(recipe).then((value)=>{
          recipe.recipe_id = value;
          console.log("Created recipe #"+value);
          res.status(200);

          for(i = 0; i < req.body.ingredient.length; i++){
               // Insert
               // Ingredients
               let ing = {
                    "ingredient_id" : null,
                    "ingredient_name": null,
                    "recipe_id" : null
               };

               ing.ingredient_name = req.body.ingredient[i].ingredient_name.toLowerCase();

               // This might be problem over multiple ingredients
               let cont = {
                    "amount": req.body.ingredient[i].amount+" "+req.body.ingredient[i].unit,
                    "recipe_id": value,
                    "ingredient_id": null,
                    "modifier": null,
               };

               db.insertIngredient(ing).then((val)=>{

                    //Insert
                    //Contains
                    cont.ingredient_id = val;
                    db.insertContains(cont);

               }, (SQLerror) => console.log(SQLerror));
          }

     /*   Tried this didn't work
          res.redirect('recipe/'+value);
     */

     }, (SQLerror) => console.log(SQLerror));

     // This doesn't work either but recipes are getting added
     res.sendStatus(200);
});

router.get('/login', function (req, res) {
     //const { userId } = req.session;
     console.log(req.flash('error'));
     res.render('login');
});


// When a post request is sent to /login, passport's authenticate function determines if the data supplied in the form matches any records in the db
// If they do, they are redirected to the profile page and logged in
// If they do not, they are redirected to /login

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'Invalid username or password!' }), function (req, res) {
     return res.redirect('/profile');
});

router.get('/logout', function (req, res) {
     req.logout();                           // Log the user out using passport's logout function
     req.session.destroy();                  // destroy the current user session by creating a clean, empty, unauthorized session
     res.redirect('/');                   // Redirect user to home page
})

router.get('/register', redirectHome, function (req, res) {
     res.render('register');
});

router.post('/register',
     [                                                      // express-validator validation of form fields
          check('email').isEmail().normalizeEmail(),        // converts email to lowercase and checks if it is in valid email format
          check('password').isLength({ min: 6 }),           // checks if password is at least 6 characters
          //check('display-name').isLength({ min: 4 }),       // checks if display name is at least 4 characters -- for some reason this was causing displayName to be set to undefined
          //check('repeatPass').equals('password')            // checks if password fields match
     ],
     function (req, res) {
          console.log("req.body: ", req.body);
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
               console.log(errors);
               return res.status(422).render('register');     // If there are any errors, log them and reload register page
          }

          let email = req.body.email;                // Assigning form values passed from post request into variables
          let displayName = req.body.displayName;
          let password = req.body.password;
          let repeatPass = req.body.repeatPass;

          if (password === repeatPass) {                                                   // Checks to see if passwords match
               console.log('Passwords match and user input is valid...creating new user');
               console.log('Email: ', email);
               console.log('Display Name: ', displayName);
               console.log('Password: ', password);
               console.log('Repeat Password', repeatPass);

               bcrypt.hash(password, saltRounds, function (err, hash) {       // Hashes plaintext password using bcrypt hashing algorithm
                    let newUser =
                    {
                         display_name: displayName,    // Builds a newUser JSON object routing the db attributes to the variables created above
                         email: email,                 // This is passed to to the db query
                         password_hash: hash
                    };
                    console.log("newUser: ", newUser);

                    db.insertNewUser(newUser, req, res);              // Insert New User data into MySQL db
               });

               //res.status(200).render('home');  -- causes a second send request to be sent and causes
          }
     });

router.get('/home', (req, res, next) => {
     res.render('home');
});

router.get('/', (req, res, next) => {
     console.log(req.user);
     console.log('isAuthenticated: ', req.isAuthenticated());         // Logs every user id and whether or not that user is authenticated in the server console
     res.render('home');
});

// This is the authentication middleware that checks whether or not the user sending the post request
// is a valid user who is logged in or a guest user
// reference: https://gist.github.com/christopher4lis/f7121a07740e5dbca860c9beb2910565

function authenticationMiddleware() {
     return (req, res, next) => {
          console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

          if (req.isAuthenticated()) return next();
          res.redirect('/login')
     }
}

router.get('/recipe/:recipeId', (req, res, next) => {
     db.queryRecipeId(req.params.recipeId).then((value) => {
          db.getIngredientsForRecipe(req.params.recipeId).then((ingredients) =>
               db.queryComments(req.params.recipeId).then((comments) => {
                    const recipe_data = value[0];
               recipe_data['ingredients'] = ingredients;
               recipe_data['comments'] = comments
               res.render('recipe', recipe_data);
               console.log(recipe_data);
               })
          )}, (SQLerror) => console.log(SQLerror));
});

router.get('/profile', (req, res, next) => {
     res.redirect('/profile/' + req.session.passport.user.user_id);
});

router.get('/profile/:userId', (req, res, next) => {
    db.queryUserProfile(req.params.userId).then((value) => {
        db.queryUserRecipes(req.params.userId).then((recipes) => {
            db.queryUserLists(req.params.userId).then((lists) => {
                db.queryUserComments(req.params.userId).then((comments) => {
                    db.queryUserIngredients(req.params.userId).then((ingredients) => {
                        const profile_data = value[0];
                        profile_data['recipes'] = recipes;
                        profile_data['lists'] = lists;
                        profile_data['comments'] = comments;
                        profile_data['ingredients'] = ingredients;
                        res.render('profile', profile_data);
                    }
                )}
            )}
        )}
    )}, (SQLerror) => console.log(SQLerror));
});

module.exports = router;
