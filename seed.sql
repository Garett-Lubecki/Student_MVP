DROP TABLE IF EXISTS petimages;
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