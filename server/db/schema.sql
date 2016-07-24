-- DROP DATABASE Planner;
CREATE DATABASE Planner;

USE Planner;

CREATE TABLE Users (
  id INT AUTO_INCREMENT not null,
  username VARCHAR(16) not null UNIQUE,
  password VARCHAR(255) not null,
  firstName VARCHAR(16),
  lastName VARCHAR(16),
  PRIMARY KEY (id)
);


CREATE TABLE Itineraries (
  id INT AUTO_INCREMENT not null,
  name VARCHAR(50),
  activities VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE Activity (
  id INT AUTO_INCREMENT not null,
  name VARCHAR(100),
  location VARCHAR(200),
  startTime time,
  endTime time,
  day date,
  likes INTEGER default 0,
  itinerary_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE Users_itineraries (
  id INT AUTO_INCREMENT not null,
  user_id INT,
  itinerary_id INT,
  PRIMARY KEY (id)
);

ALTER TABLE `Users_Itineraries` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `Users_Itineraries` ADD FOREIGN KEY (itinerary_id) REFERENCES `Itineraries` (`id`);
ALTER TABLE `Activity` ADD FOREIGN KEY (itinerary_id) REFERENCES `Itineraries` (`id`);

