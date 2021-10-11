const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const pool = require('../db/db')
const queries = require('../controllers/queries/queries')
const bcrypt = require('bcrypt')
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

function comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}

passport.use(
    'login',
    new localStrategy((username, password, done) => {
        // console.log("WH HERE")
        pool.query(queries.userLogin, [username], (error, results) => {
            if(error) {
                return done(null, false, { success: false, message: 'error occured when querying database' });
            }
            if(results.rows.length == 0) {
                return done("Username not found", false, { success: false, message: 'Invalid username' });
            }
            const result = results.rows[0]
            const resultPassword = result.password
            const compare = comparePassword(password, resultPassword)
            if(compare) {
                const user = {
                    userid: result.userid, username, 
                }
                return done(null, user, { success: true, message: "Logged in successfully"})
            } else {
                return done("wrong password", false, { success: false, message: "Wrong password"})
            }
        })
      }
    )
  );