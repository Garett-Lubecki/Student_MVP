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
    location varchar NOT NULL
);

CREATE TABLE petimages (
    image_id serial,
    imageString text,
    pet_id int,
    FOREIGN KEY(pet_id) REFERENCES pets(pet_id)
);

INSERT INTO pets (name, breed, size, gender, age, about, location) VALUES ('Earl', 'Basset Hound', 'Medium', 'Male', '2 Years', 'Fun loving basset hound who loves to sleep all day.', 'Virginia Beach, VA');
INSERT INTO pets (name, breed, size, gender, age, about, location) VALUES ('Wilfred', 'Basset Hound', 'Medium', 'Male', '1 Year', 'Fun loving basset hound who loves to sleep all day.', 'Virginia Beach, VA');