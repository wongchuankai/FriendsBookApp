const getUserIDbyUsername = "SELECT userid FROM users WHERE username=$1"
const userSignUp = "INSERT INTO users(username, password) VALUES($1, $2);"
const userLogin = "SELECT * FROM users WHERE username = $1;"
const uploadPost = "INSERT INTO posts(username, post_text, ispublic) VALUES($1, $2, $3);"
const retrievePublicPostsUser = "SELECT * FROM posts WHERE username=$1 OR ispublic=true order by posts.created_at DESC;"
const retrievePrivatePostsUser = ""
const retrievePostsByUser= "select posts.postid, username, post_text, created_at, ispublic, " +
"case when likedtable.liked >0 then likedtable.liked else 0 end as like_count , " +
"case when $1 in (select username_like from likedposts where likedposts.postid = posts.postid) THEN true else false end as isUserLike " +
"from ( select count(likedposts.username_like) as liked, postid from likedPosts group by postid) AS likedtable  full outer join posts on posts.postid = likedtable.postid " + 
"where username = $1 order by posts.created_at DESC;"
const retrievePublicPrivatePostsByUser = "select posts.postid, username, post_text, created_at, ispublic, " +
    "case when likedtable.liked >0 then likedtable.liked else 0 end as like_count , " +
    "case when $1 in (select username_like from likedposts where likedposts.postid = posts.postid) THEN true else false end as isUserLike " +
    "from ( select count(likedposts.username_like) as liked, postid from likedPosts group by postid) AS likedtable  full outer join posts on posts.postid = likedtable.postid " + 
    "where username = $1 or ispublic = true or username in( " +
    "SELECT username FROM (Select * FROM ( " +
    "select first_user_id as myfriends from friendsList where (first_user_id=$2 or second_user_id=$2) and status = 2 " + 
    "UNION select second_user_id from friendsList where (first_user_id=$2 or second_user_id=$2) and status = 2 " +  
    ") AS myfriendlist WHERE myfriends != $2) AS userfriends INNER JOIN users on users.userid = userfriends.myfriends " +
    ") order by posts.created_at DESC;"
const retrievePrivatePostsByUser = "select posts.postid, username, post_text, created_at, ispublic, " +
"case when likedtable.liked >0 then likedtable.liked else 0 end as like_count , " +
"case when $1 in (select username_like from likedposts where likedposts.postid = posts.postid) THEN true else false end as isUserLike " +
"from ( select count(likedposts.username_like) as liked, postid from likedPosts group by postid) AS likedtable  full outer join posts on posts.postid = likedtable.postid " + 
"where username = $1 or username in( " +
"SELECT username FROM (Select * FROM ( " +
"select first_user_id as myfriends from friendsList where (first_user_id=$2 or second_user_id=$2) and status = 2 " + 
"UNION select second_user_id from friendsList where (first_user_id=$2 or second_user_id=$2) and status = 2 " +  
") AS myfriendlist WHERE myfriends != $2) AS userfriends INNER JOIN users on users.userid = userfriends.myfriends " +
") order by posts.created_at DESC;"        

const retrievePublicPostsUser2 = "select posts.postid, username, post_text, created_at, ispublic, " +
"case when likedtable.liked >0 then likedtable.liked else 0 end as like_count , " +
"case when $1 in (select username_like from likedposts where likedposts.postid = posts.postid) THEN true else false end as isUserLike " +
"from ( select count(likedposts.username_like) as liked, postid from likedPosts group by postid) AS likedtable  full outer join posts on posts.postid = likedtable.postid " + 
"where username = $1 or ispublic = true order by posts.created_at DESC;"
const userLikePost = "insert into likedposts(postid, username_like) values($1, $2);"
const userUnLikePost = "delete from likedposts where username_like = $1 and postid = $2;"
const findUserFriends = "SELECT username, users.userid FROM (Select * FROM (" +
    "select first_user_id as myfriends from friendsList where (first_user_id=$1 or second_user_id=$1) and status = 2 " +
    "UNION select second_user_id from friendsList where (first_user_id=$1 or second_user_id=$1) and status = 2 " + 
    ") AS myfriendlist WHERE myfriends != $1) AS userfriends INNER JOIN users on users.userid = userfriends.myfriends;"
const findUserFriendsAndRequest = "Select * FROM (" +
    "select first_user_id as myfriends from friendsList where (first_user_id=$1 or second_user_id=$1) " +
    "UNION select second_user_id from friendsList where (first_user_id=$1 or second_user_id=$1) " + 
    ") AS myfriendlist WHERE myfriends != $1;"
const getPeopleYouMayKnow = "Select username, userid from users where userid not in ( " + 
    "Select * FROM (" +
    "select first_user_id as myfriends from friendsList where (first_user_id=$1 or second_user_id=$1) " +
    "UNION select second_user_id from friendsList where (first_user_id=$1 or second_user_id=$1) " + 
    ") AS myfriendlist);"
const sendFriendRequestFirstToSecond = "insert into friendsList values($1, $2, 0);"
const sendFriendRequestSecondToFirst = "insert into friendsList values($1, $2, 1);"
const findFriendRequestToUser = "Select userid, username FROM (" +
    "select first_user_id as friendrequest, created_at from friendsList where second_user_id=$1 and status = 0 " +
    "UNION select second_user_id, created_at from friendsList where first_user_id=$1 and status = 1 " +
    ") AS myfriendlist INNER JOIN users on friendrequest = userid order by myfriendlist.created_at DESC;"
const countFriendRequestToUser = ""
const findFriendRequestFromUser = "Select userid, username FROM (" +
"select second_user_id as friendrequest, created_at from friendsList where first_user_id=$1 and status = 0 " +
"UNION select first_user_id, created_at from friendsList where second_user_id=$1 and status = 1 " +
") AS myfriendlist INNER JOIN users on friendrequest = userid order by myfriendlist.created_at DESC;"
const acceptFriendRequest = "UPDATE friendslist SET status = 2 WHERE first_user_id = $1 and second_user_id = $2;"
const rejectFriendRequest = "UPDATE friendslist SET status = 3 WHERE first_user_id = $1 and second_user_id = $2;"
const getStatusBetween2Users = "SELECT CASE " +
    "WHEN status=2 THEN 'friend' WHEN (status=0 and first_user_id=$3) or (status=1 and second_user_id=$3) THEN 'send' " +
    "WHEN (status=0 and second_user_id=$3) or (status=1 and first_user_id=$3) THEN 'receive' " +
    "ELSE 'rejected' END AS relationshipstatus FROM friendslist where (first_user_id=$1 and second_user_id=$2);"
const adminAddUserAsFriend = ""
module.exports = {
    getUserIDbyUsername,
    userSignUp,
    userLogin,
    uploadPost,
    retrievePublicPostsUser,
    retrievePublicPostsUser2,
    userLikePost,
    userUnLikePost,
    findUserFriends,
    findUserFriendsAndRequest,
    getPeopleYouMayKnow,
    sendFriendRequestFirstToSecond,
    sendFriendRequestSecondToFirst,
    findFriendRequestToUser,
    countFriendRequestToUser,
    findFriendRequestFromUser,
    acceptFriendRequest,
    rejectFriendRequest,
    retrievePostsByUser,
    getStatusBetween2Users,
    retrievePublicPrivatePostsByUser,
    retrievePrivatePostsByUser,
    adminAddUserAsFriend
}