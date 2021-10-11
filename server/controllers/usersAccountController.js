const pool = require('../db/db')
const queries = require('./queries/queries')
const bcrypt = require('bcrypt')
require('dotenv').config()

function hashPassword(password) {
    return bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT))
}

function postgresError(errorcode, res) {
    if(errorcode == "23505") {
        return res.status(400).json({
            success: false,
            msg: "username is already taken",
            results: []
        })
    } else {
        return res.status(400).json({
            success: false,
            msg: "error when user sign up",
            results: []
        })
    }
}

const usersignup = (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password
    
    if (username == "" || password == "") {
        return res.status(400).json({
            success: false,
            msg: "Username or password cannot be blank",
            results: []
        })
    }
    const hashedPassword = hashPassword(password)
    pool.query(queries.userSignUp, [username, hashedPassword], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        pool.query(queries.getUserIDbyUsername, [username], (error, results) => {
            if(error) {
                const errorcode = error.code
                return postgresError(errorcode, res)
            }
            var userid = results.rows[0].userid
            pool.query(queries.adminAddUserAsFriend, [userid], (error, results) => {
                if(error) {
                    const errorcode = error.code
                    return postgresError(errorcode, res)
                }
                return res.status(200).json({
                    success: true,
                    msg: "User has successfully sign up!",
                    results: {
                        username: username
                    }
                })
            })
        })
    })
}



module.exports = {
    usersignup
}