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
("A Murder is Announced", "Agatha Christie", "Mystery"),
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

INSERT INTO collections (name, description, favorite, privacy, username) VALUES 
("TBR", "To Be Read: Books I want to read", true, true, "admin" ),
("Whodunit", "Mystery books!", false, false, "admin" ),
("Unlock Your Potential", "Books to become my best self", true, false, "admin" ),
("Favorites", "Books I loved!", true, false, "user" ),
("Fantasy", "Books with magic and adventure", true, true, "user" );

INSERT INTO book_collections (collection_id, book_id) VALUES
(1, 31), (1,27), (1,25), (1,18), (1,13),
(2,8), (2,10), (2,16), (2,24), (2,29), (2,3),
(3,1), (3,22), (3,23), (3,30), 
(4,1), (4,8), (4,28), (4,11), (4,12), (4,5),
(5,21), (5,6), (5,18);

INSERT INTO reviews (book_id, rating, content, privacy, username) VALUES
(1, 5, "Atomic Habits is hands down one of the most impactful self-improvement books I’ve ever read. Its down-to-earth, practical approach to creating lasting habits truly works!", false, "admin"),
(1, 4, "Bitesize chapters make this book super easy to read! The ideas are not revolutionary, but the suggested systems are doable and the anecdotes are motivating.", false, "user"),
(8, 2, "The characters were self-absorbed and hard to relate to, and after the plot twist, the story became very predictable and boring.", true, "admin"),
(8, 5, "This books was the definition of a page turner from start to finish! There were so many times I wanted to peek at the end, but the wait was worth it!", true, "user");


