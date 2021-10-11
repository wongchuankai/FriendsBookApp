insert into users(username, password) VALUES('user1', 'b');
insert into users(username, password) VALUES('user2', 'b');
insert into users(username, password) VALUES('user3', 'b');
insert into users(username, password) VALUES('user4', 'b');
insert into users(username, password) VALUES('user5', 'b');

select * from users;

insert into posts(username, post_text, ispublic) VALUES('user1', 'post1', true);
insert into posts(username, post_text, ispublic) VALUES('user4', 'post2', false);
insert into posts(username, post_text, ispublic) VALUES('user2', 'post3', false);
insert into posts(username, post_text, ispublic) VALUES('user2', 'post4', true);
insert into posts(username, post_text, ispublic) VALUES('user3', 'post5', true);

select * from posts;

insert into likedposts(postid, username_like) values(1, 'user1');
insert into likedposts(postid, username_like) values(2, 'user2');
insert into likedposts(postid, username_like) values(3, 'user3');
insert into likedposts(postid, username_like) values(4, 'user2');
insert into likedposts(postid, username_like) values(2, 'user3');
insert into likedposts(postid, username_like) values(2, 'user4');

insert into friendsList(first_user_id, second_user_id, status) VALUES(1,2,2);

select posts.postid, username, post_text, created_at, ispublic,
case when likedtable.liked >0 then likedtable.liked else 0 end as like_count, 
case when 'user1' in (select username_like from likedposts where likedposts.postid = posts.postid) THEN true else false end as isUserLike 
from ( select count(likedposts.username_like) as liked, postid from likedPosts group by postid) AS likedtable  full outer join posts on posts.postid = likedtable.postid where ispublic = true or username = 'user1' or username in(
SELECT username FROM (Select * FROM (
    select first_user_id as myfriends from friendsList where (first_user_id=1 or second_user_id=1) and status = 2 
    UNION select second_user_id from friendsList where (first_user_id=1 or second_user_id=1) and status = 2  
    ) AS myfriendlist WHERE myfriends != 1) AS userfriends INNER JOIN users on users.userid = userfriends.myfriends  
  ) order by posts.created_at DESC;

