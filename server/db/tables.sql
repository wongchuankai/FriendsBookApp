CREATE TABLE users(
  userid serial PRIMARY KEY,
  username varchar(255) unique,
  password varchar(255)
);

CREATE TABLE posts(
  postid serial PRIMARY KEY,
  username varchar(255) NOT NULL,
  post_text varchar(255) NOT NULL,
  image varchar(255),
  created_at timestamp DEFAULT now() ,
  isPublic BOOLEAN DEFAULT FALSE NOT NULL,
  FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE likedPosts(
  postid integer,
  username_like varchar(255) not null,
  CONSTRAINT userlikepost PRIMARY KEY (postid, username_like),
  FOREIGN KEY (username_like) REFERENCES users(username),
  FOREIGN KEY (postid) REFERENCES posts(postid)
);

CREATE TABLE friendshipStatus(
  status integer PRIMARY KEY,
  value varchar(20) not null
);

CREATE TABLE friendsList(
  first_user_id INTEGER not null,
  second_user_id INTEGER not null,  
  status integer not null,
  created_at timestamp DEFAULT now(),
  CONSTRAINT friends_pair PRIMARY KEY (first_user_id,second_user_id),
  FOREIGN KEY (status) REFERENCES friendshipStatus(status),
  FOREIGN KEY (first_user_id) REFERENCES users(userid),
  FOREIGN KEY (second_user_id) REFERENCES users(userid),
  CHECK(first_user_id < second_user_id)
);


insert into friendshipStatus VALUES(0, 'pending_first_second'); -- first user send to second user
insert into friendshipStatus VALUES(1, 'pending_second_first'); -- second user send to first user
insert into friendshipStatus VALUES(2, 'friends');
insert into friendshipStatus VALUES(3, 'rejected');

 insert into friendsList values(1,2, 0); 
 insert into friendsList values(2,3, 0); 
 insert into friendsList values(1,3, 0); 
 insert into friendsList values(3,4, 0); 
 

select first_user_id, second_user_id, value from friendsList inner join friendshipStatus on friendsList.status = friendshipStatus.status;

select first_user_id, second_user_id, value from friendsList inner join friendshipStatus on friendsList.status = friendshipStatus.status where first_user_id=2 or second_user_id=2;
  
Select * FROM (
select first_user_id as myfriends from friendsList where first_user_id=2 or second_user_id=2
UNION
select second_user_id from friendsList where first_user_id=2 or second_user_id=2
) AS myfriendlist WHERE myfriends != 2;


