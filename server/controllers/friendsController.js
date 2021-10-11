const pool = require('../db/db')
const queries = require('./queries/queries')
require('dotenv').config()

function postgresError(errorcode, res) {
    if(errorcode == "23505") {
        return res.status(400).json({
            success: false,
            msg: "Pending friend request already exist or Friends have already been formed.",
            results: []
        })
    } else {
        return res.status(400).json({
            success: false,
            msg: "Unknown error",
            results: []
        })
    }
}

const sendFriendRequest = (req, res) => {
    const body = req.body
    const requestSender = body.requestSender
    const requestReceiver = body.requestReceiver
    
    if (requestSender == null || requestReceiver == null) {
        return res.status(400).json({
            success: false,
            msg: "userids option cannot be blank",
            results: []
        })
    }

    if (requestSender <  requestReceiver) {
        pool.query(queries.sendFriendRequestFirstToSecond, [requestSender, requestReceiver], (error, results) => {
            if(error) {
                const errorcode = error.code
                return postgresError(errorcode, res)
            }
            return res.status(200).json({
                success: true,
                msg: `Friend request sent to userID: ${requestReceiver} by userID: ${requestSender}`,
                results: results.rows
            })
        })
    } else {
        pool.query(queries.sendFriendRequestSecondToFirst, [requestReceiver, requestSender], (error, results) => {
            if(error) {
                const errorcode = error.code
                return postgresError(errorcode, res)
            }
            return res.status(200).json({
                success: true,
                msg: `Friend request sent to userID: ${requestReceiver} by userID: ${requestSender}`,
                results: results.rows
            })
        })
    }

}


const getFriendRequestToUser = (req, res) => {
    const body = req.body
    const userid = body.userid
    if (userid == null) {
        return res.status(400).json({
            success: false,
            msg: "userid option cannot be blank",
            results: []
        })
    }
    pool.query(queries.findFriendRequestToUser, [userid], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        console.log(results.rows)
        return res.status(200).json({
            success: true,
            msg: `Find friend requests to userid: ${userid}`,
            results: results.rows
        })
    })
}


const getFriendRequestFromUser = (req, res) => {
    const body = req.body
    const userid = body.userid
    if (userid == null) {
        return res.status(400).json({
            success: false,
            msg: "userid option cannot be blank",
            results: []
        })
    }
    pool.query(queries.findFriendRequestFromUser, [userid], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        console.log(results.rows)
        return res.status(200).json({
            success: true,
            msg: `Find friend requests to userid: ${userid}`,
            results: results.rows
        })
    })
}

const findUserFriends = (req, res) => {
    const body = req.body
    const userid = body.userid
    if (userid == null) {
        return res.status(400).json({
            success: false,
            msg: "userid option cannot be blank",
            results: []
        })
    }
    pool.query(queries.findUserFriends, [userid], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        return res.status(200).json({
            success: true,
            msg: `return friends of userid: ${userid}`,
            results: results.rows
        })
    })
}

const getUserIDbyUsername = (req, res) => {
    const body = req.body
    const username = body.username
    if (username == "") {
        return res.status(400).json({
            success: false,
            msg: "username option cannot be blank",
            results: []
        })
    }
    pool.query(queries.getUserIDbyUsername, [username], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        console.log(results.rows)
        return res.status(200).json({
            success: true,
            msg: `return userid`,
            results: results.rows
        })
    })
}

const findUserFriendsByUsername = (req, res) => {
    const body = req.body
    const username = body.username
    if (username == "") {
        return res.status(400).json({
            success: false,
            msg: "username option cannot be blank",
            results: []
        })
    }
    pool.query(queries.getUserIDbyUsername, [username], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        const userid = results.rows[0].userid
        pool.query(queries.findUserFriends, [userid], (error, results) => {
            if(error) {
                const errorcode = error.code
                return postgresError(errorcode, res)
            }
            return res.status(200).json({
                success: true,
                msg: `return friends of userid: ${userid}`,
                results: results.rows
            })
        })
    })
}

const getPeopleYouMayKnow = (req, res) => {
    const body = req.body
    const userid = body.userid
    if (userid == null) {
        return res.status(400).json({
            success: false,
            msg: "userid option cannot be blank",
            results: []
        })
    }
    pool.query(queries.getPeopleYouMayKnow, [userid], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        return res.status(200).json({
            success: true,
            msg: `return friends of userid: ${userid}`,
            results: results.rows
        })
    })
}


const findUserFriendsAndRequest = (req, res) => {
    const body = req.body
    const userid = body.userid
    if (userid == null) {
        return res.status(400).json({
            success: false,
            msg: "userid option cannot be blank",
            results: []
        })
    }
    pool.query(queries.findUserFriendsAndRequest, [userid], (error, results) => {
        if(error) {
            const errorcode = error.code
            return postgresError(errorcode, res)
        }
        return res.status(200).json({
            success: true,
            msg: `return friends of userid: ${userid}`,
            results: results.rows
        })
    })
}

const acceptFriendRequest = (req, res) => {
    const body = req.body
    const requestSender = body.requestSender
    const requestReceiver = body.requestReceiver

    if (requestSender == null || requestReceiver == null) {
        return res.status(400).json({
            success: false,
            msg: "userids option cannot be blank",
            results: []
        })
    }
    if (requestSender < requestReceiver) {
        pool.query(queries.acceptFriendRequest, [requestSender, requestReceiver], (error, results) => {
            if(error) {
                const errorcode = error.code
                return postgresError(errorcode, res)
            }
            return res.status(200).json({
                success: true,
                msg: `userid: ${requestSender} and userid: ${requestReceiver} are now friends.`,
                results: results.rows
            })
        })
    } else {
        pool.query(queries.acceptFriendRequest, [requestReceiver, requestSender], (error, results) => {
            if(error) {
                const errorcode = error.code
                return postgresError(errorcode, res)
            }
            return res.status(200).json({
                success: true,
                msg: `userid: ${requestSender} and userid: ${requestReceiver} are now friends.`,
                results: results.rows
            })
        })
    }
}


const rejectFriendRequest = (req, res) => {
    const body = req.body
    const requestSender = body.requestSender
    const requestReceiver = body.requestReceiver

    if (requestSender == null || requestReceiver == null) {
        return res.status(400).json({
            success: false,
            msg: "userids option cannot be blank",
            results: []
        })
    }
    if (requestSender < requestReceiver) {
        pool.query(queries.rejectFriendRequest, [requestSender, requestReceiver], (error, results) => {
            if(error) {
                const errorcode = error.code
                return postgresError(errorcode, res)
            }
            return res.status(200).json({
                success: true,
                msg: `userid: ${requestSender} and userid: ${requestReceiver} are not friend anymore.`,
                results: results.rows
            })
        })
    } else {
        pool.query(queries.rejectFriendRequest, [requestReceiver, requestSender], (error, results) => {
            if(error) {
                const errorcode = error.code
                return postgresError(errorcode, res)
            }
            return res.status(200).json({
                success: true,
                msg: `userid: ${requestSender} and userid: ${requestReceiver} are not friend anymore.`,
                results: results.rows
            })
        })
    }
}


const getStatusBetween2Users = (req, res) => {
    const body = req.body
    const userid = body.userid
    const userid1 = body.userid1
    const userid2 = body.userid2

    if (userid == null || userid1 == null || userid2 == null) {
        return res.status(400).json({
            success: false,
            msg: "userids option cannot be blank",
            results: []
        })
    }
    if (userid1 < userid2) {
        pool.query(queries.getStatusBetween2Users, [userid1, userid2, userid], (error, results) => {
            if(error) {
                const errorcode = error.code
                return postgresError(errorcode, res)
            }
            return res.status(200).json({
                success: true,
                msg: `users relationship status return.`,
                results: results.rows
            })
        })
    } else {
        pool.query(queries.getStatusBetween2Users, [userid2, userid1, userid], (error, results) => {
            if(error) {
                const errorcode = error.code
                return postgresError(errorcode, res)
            }
            return res.status(200).json({
                success: true,
                msg: `users relationship status return.`,
                results: results.rows
            })
        })
    }
}

module.exports = {
    sendFriendRequest,
    findUserFriends,
    findUserFriendsByUsername,
    getPeopleYouMayKnow,
    getUserIDbyUsername,
    findUserFriendsAndRequest,
    getFriendRequestToUser,
    getFriendRequestFromUser,
    acceptFriendRequest,
    rejectFriendRequest,
    getStatusBetween2Users
}