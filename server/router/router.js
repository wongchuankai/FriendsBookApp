const express = require('express')
const jwt = require('jsonwebtoken')
const usersAccountController = require('../controllers/usersAccountController')
const friendsController = require('../controllers/friendsController')
const router = express.Router()
const passport = require('passport');
require('dotenv').config()

router.post('/signup', usersAccountController.usersignup)

router.post('/login', 
    async (req, res, next) => {
        passport.authenticate(
        'login', {session: false},
        async (err, user, info) => {
            try {
                if (err) {
                    const error = new Error(err);
                    return next(error);
                }
                if(!user) {
                    const error = new Error("Error occured");
                    return next(error);
                }
                const token = jwt.sign({
                    user
                }, process.env.JWT_SECRET)
                const data = {
                    success: info.success, msg: info.message, token: token
                }
                return res.status(200).json(data)
            } catch (error) {
                return next(error);
            }
        }
        )(req, res, next);
    }
)
router.post('/findUserFriends', friendsController.findUserFriends)
router.post('/getPeopleYouMayKnow', friendsController.getPeopleYouMayKnow)
router.post('/findUserFriendsAndRequest', friendsController.findUserFriendsAndRequest)
router.post('/sendFriendRequest', friendsController.sendFriendRequest)
router.post('/getFriendRequestToUser', friendsController.getFriendRequestToUser)
router.post('/getFriendRequestFromUser', friendsController.getFriendRequestFromUser)
router.post('/acceptFriendRequest', friendsController.acceptFriendRequest)
router.post('/getStatusBetween2Users', friendsController.getStatusBetween2Users)

module.exports = router