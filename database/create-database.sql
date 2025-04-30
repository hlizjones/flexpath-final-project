create database if not exists flexpath_final;
use flexpath_final;

drop table if exists users, roles, books, collections, book_collections, reviews;

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
	book_id int not null auto_increment primary key,
	title varchar(255) not null,
	author varchar(255) not null,
	genre varchar(255) not null,
    unique (title, author)
);
create table collections (
	collection_id int not null auto_increment primary key,
	name varchar(255) not null,
	description varchar(500),
	favorite bool not null default false,
	privacy bool not null default false,
	username varchar(255) not null,
	foreign key (username) references users(username) on delete cascade,
    unique(name, username)
);
create table book_collections (
	book_id int not null,
	collection_id int not null,
	primary key (book_id, collection_id),
	foreign key (book_id) references books(book_id)  on delete cascade,
	foreign key (collection_id) references collections(collection_id)  on delete cascade
);
create table reviews (
	review_id int not null auto_increment primary key,
    book_id int not null,
	rating int not null,
    content varchar(1000),
    privacy bool not null,
    username varchar(255) not null,
    foreign key (book_id) references books(book_id) on delete cascade,
    foreign key (username) references users(username)  on delete cascade,
    unique(book_id, username)
);

insert into users (username, password) values ('admin', '$2a$10$tBTfzHzjmQVKza3VSa5lsOX6/iL93xPVLlLXYg2FhT6a.jb1o6VDq');
insert into roles (username, role) values ('admin', 'ADMIN');

insert into users (username, password) values ('user', '$2a$10$tBTfzHzjmQVKza3VSa5lsOX6/iL93xPVLlLXYg2FhT6a.jb1o6VDq');
insert into roles (username, role) values ('user', 'USER');

INSERT INTO books (title, author, genre) 
VALUES 
("Atomic Habits", "James Clear", "Self Help"),
("Pride and Prejudice", "Jane Austen", "Romance"),
("The Adventures of Sherlock Holmes", "Sir Authur Conan Doyle", "Mystery"),
("Call of the Wild", "Jack London", "Adventure"),
("Harry Potter and the Sorcerer's Stone", "J. K. Rowling", "Fantasy"),
("The Hobbit", "J.R.R. Tolkien", "Fantasy"),
("To Kill a Mockingbird", "Harper Lee", "Historical Fiction"),
("Gone Girl", "Gillian Flynn", "Mystery"),
("The Shining", "Stephen King", "Horror"),
("Mexican Gothic", "Silvia Moreno-Garcia", "Gothic"),
("The Kite Runner", "Khaled Hosseini", "Historical Fiction"),
("Jane Eyre", "Charlotte Bronte", "Gothic"),
("Eat, Pray, Love", "Elizabeth Gilbert", "Memoir"),
("Animal Farm", "George Orwell", "Dystopian"),
("The Hunger Games", "Suzanne Collins", "Dystopian"),
("Murder on the Orient Express", "Agatha Christie", "Mystery"),
("Becoming", "Michelle Obama", "Memoir"),
("A Game of Thrones", "George R. R. Martin", "Fantasy"),
("Treasure Island", "Robert Louis Stevenson", "Adventure"),
("The Adventures of Tom Sawyer", "Mark Twain", "Adventure"),
("Mistborn: The Final Empire", "Brandon Sanderson", "Fantasy"),
("The Anxious Generation", "Jonathan Haidt", "Self Help"),
("Think Like a Monk", "Jay Shetty", "Self Help"),
("Butter", "Asako Yuzuki", "Mystery"),
("James", "Percival Everett", "Adventure"),
("The Notebook", "Nicholas Sparks", "Romance"),
("The Handmaid's Tale", "Margaret Atwood", "Dystopian"),
("The Glass Castle", "Jeannette Walls", "Memoir"),
("The Woman in Cabin 10", "Ruth Ware", "Mystery"),
("How to Win Friends and Influence People", "Dale Carnegie", "Self Help"),
("Where the Crawdads Sing", "Delia Owens", "Mystery"),
("The Great Gatsby", "F. Scott Fitzgerald", "Historical Fiction");
