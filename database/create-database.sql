create database if not exists flexpath_final;
use flexpath_final;

drop table if exists users, roles, books, collections, book_collections;

create table users (
    username varchar(255) primary key,
    password varchar(255)
);

create table roles (
    username varchar(255) not null,
    role varchar(250) not null,
    primary key (username, role),
    foreign key (username) references users(username) on delete cascade
);
create table books (
	id int not null auto_increment primary key,
	title varchar(255) not null,
	author varchar(255) not null,
	review varchar(1000),
	rating int not null,
	genre varchar(255) not null,
	mood varchar(255),
	privacy bool not null,
	username varchar(255) not null,
	foreign key (username) references users(username)
);
create table collections (
	id int not null auto_increment primary key,
	name varchar(255) not null,
	description varchar(500) not null,
	favorite bool not null,
	privacy bool not null,
	username varchar(255) not null,
	foreign key (username) references users(username)
);
create table book_collections (
	book_id int not null,
	collection_id int not null,
	primary key (book_id, collection_id),
	foreign key (book_id) references books(id),
	foreign key (collection_id) references collections(id)
);

insert into users (username, password) values ('admin', '$2a$10$rdrt3j7YkAaVTQJcGnPX.ORrpMZ3ZXUMZqhfx0jR68vLaqB2jvsH2');
insert into roles (username, role) values ('admin', 'ADMIN');

insert into users (username, password) values ('user', '$2a$10$rdrt3j7YkAaVTQJcGnPX.ORrpMZ3ZXUMZqhfx0jR68vLaqB2jvsH2');
insert into roles (username, role) values ('user', 'USER');
