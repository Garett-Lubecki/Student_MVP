DROP DATABASE IF EXISTS petsdb;

CREATE DATABASE petsdb;

\c petsdb;

DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    pet_id serial PRIMARY KEY,
    name varchar NOT NULL,
    breed varchar,
    size varchar,
    gender varchar,
    age varchar,
    about text,
    image_path VARCHAR(255),
    location varchar NOT NULL
);

INSERT INTO pets (name, breed, size, gender, age, about, location, image_path) VALUES ('Earl', 'basset hound', 'Medium', 'Male', '2 Years', 'Fun loving basset hound who loves to sleep all day.', 'Virginia Beach, VA', 'earl.jpeg');
INSERT INTO pets (name, breed, size, gender, age, about, location, image_path) VALUES ('Wilfred', 'basset hound', 'Medium', 'Male', '1 Year', 'Fun loving basset hound who loves to sleep all day.', 'Virginia Beach, VA', 'wilfred.jpeg');
INSERT INTO pets (name, breed, size, gender, age, about, location, image_path) VALUES ('Vortex', 'Some Breed', 'Large', 'Male', '4 Year', 'FHi! My name is Zeppelin! My foster mom calls me Zepp, Zepperonni, and Zeppen. I love to play with my foster brother and all of the toys. I really like sticks, too! I have been learning to walk on a leash, sit, stay, and shake. I know to only go potty on the puppy pads or outside. My foster mom showed me the dog door and I learned how to use it in less than 5 minutes. Mom says I am super smart!
', 'Virginia Beach, VA', 'smalboi.jpeg');
INSERT INTO pets (name, breed, size, gender, age, about, location, image_path) VALUES ('Goldy', 'Golder Retriever', 'Medium', 'Male', '1 Year', 'Goldy is 1-2 years old and 50 lbs. he was struck by a car and walked with a limp while he was recovering. He is now running and jumping and such a great playmate! He is a love bug! Loves his humans and will follow you everywhere. A home protector! He believes he is a lap dog and he will make that happen. He is a plushy destroyer, so tough toys are a most.', 'Virginia Beach, VA', 'mediumboi.png');