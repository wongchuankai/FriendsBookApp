const pool = require('../db/db')
const queries = require('./queries/queries')
require('dotenv').config()

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


const uploadNewPost = (req, res) => {
    const body = req.body
    const username = body.username
    const postText = body.postText
    const isPublic = body.isPublic
    if (username == "" || postText == "" || isPublic == null) {
        return res.status(400).json({
            success: false,
            msg: "Username, post and ispublic option cannot be blank",
            results: []
        })
    }
    pool.query(queries.uploadPost, [username, postText, isPublic], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        return res.status(200).json({
            success: true,
            msg: "You have successfully posted a new post!",
            results: {
                username: username,
                postText
            }
        })
    })
}


const retrievePostsByUser = (req, res) => {
    const body = req.body
    const username = body.username
    if (username == "") {
        return res.status(400).json({
            success: false,
            msg: "Username option cannot be blank",
            results: []
        })
    }
    pool.query(queries.retrievePostsByUser, [username], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        return res.status(200).json({
            success: true,
            msg: "Posts retrieved.",
            results: results.rows
        })
    })
}


const retrievePublicPostsUser = (req, res) => {
    const body = req.body
    const username = body.username
    if (username == "") {
        return res.status(400).json({
            success: false,
            msg: "Username option cannot be blank",
            results: []
        })
    }
    pool.query(queries.retrievePublicPostsUser2, [username], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        return res.status(200).json({
            success: true,
            msg: "Posts retrieved.",
            results: results.rows
        })
    })
}

const userLikePost = (req, res) => {
    const body = req.body
    const username = body.username
    const postid = body.postid
    if (username == "" || postid == null) {
        return res.status(400).json({
            success: false,
            msg: "Username option cannot be blank",
            results: []
        })
    }
    pool.query(queries.userLikePost, [postid, username], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        return res.status(200).json({
            success: true,
            msg: `Post ${postid} liked by ${username}`,
            results: results.rows
        })
    })
}

const userUnlikePost = (req, res) => {
    const body = req.body
    const username = body.username
    const postid = body.postid
    if (username == "" || postid == null) {
        return res.status(400).json({
            success: false,
            msg: "Username or postID option cannot be blank",
            results: []
        })
    }
    pool.query(queries.userUnLikePost, [username, postid], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        return res.status(200).json({
            success: true,
            msg: `Post ${postid} liked by ${username}`,
            results: results.rows
        })
    })
}
module.exports = {
    uploadNewPost,
    retrievePublicPostsUser,
    userLikePost,
    userUnlikePost,
    retrievePostsByUser
}