const express = require('express');
const FeedController = require('../controllers/FeedController')
const friendsController = require('../controllers/friendsController')
const securerouter = express.Router();

securerouter.get(
  '/verify',
  (req, res, next) => {
    return res.json({
      message: 'Your token is valid',
      user: req.user
    })
  }
);

securerouter.get(
  '/profile',
  (req, res, next) => {
    return res.json({
      message: 'You made it to the secure route',
      user: req.user
    })
  }
);

securerouter.post('/newpost', FeedController.uploadNewPost)
securerouter.post('/retrievePostsByUser', FeedController.retrievePostsByUser)
securerouter.post('/getPublicPostWithUser', FeedController.retrievePublicPostsUser)
securerouter.post('/userlikepost', FeedController.userLikePost)
securerouter.post('/userUnlikePost', FeedController.userUnlikePost)

securerouter.post('/findUserFriends', friendsController.findUserFriends)
securerouter.post('/findUserFriendsByUsername', friendsController.findUserFriendsByUsername)
securerouter.post('/getPeopleYouMayKnow', friendsController.getPeopleYouMayKnow)
securerouter.post('/findUserFriendsAndRequest', friendsController.findUserFriendsAndRequest)
securerouter.post('/sendFriendRequest', friendsController.sendFriendRequest)
securerouter.post('/getFriendRequestToUser', friendsController.getFriendRequestToUser)
securerouter.post('/getFriendRequestFromUser', friendsController.getFriendRequestFromUser)
securerouter.post('/acceptFriendRequest', friendsController.acceptFriendRequest)
securerouter.post('/rejectFriendRequest', friendsController.rejectFriendRequest)
securerouter.post('/getStatusBetween2Users', friendsController.getStatusBetween2Users)
securerouter.post('/getUserIDbyUsername', friendsController.getUserIDbyUsername)
securerouter.post('/retrievePublicPrivatePostsByUser', FeedController.retrievePublicPrivatePostsByUser)
securerouter.post('/retrievePrivatePostsByUser', FeedController.retrievePrivatePostsByUser)

module.exports = securerouter;