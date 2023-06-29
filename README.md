# Petfinder SPA

Welcome to the Petfinder SPA (Single Page Application) repository! This project is an application similar to the Petfinder website, allowing users to search for and adopt pets. It includes basic CRUD (Create, Read, Update, Delete) functionality and utilizes JavaScript, Node.js, and PostgreSQL.

Of note, these pets are not actually up for adoption. It is simulated.

## Features

- Search and browse available pets
- Create new pet listings
- Update existing pet information
- Delete pet listings
- Store and retrieve images using the path module

Please note that the image storage feature in this project is not currently optimized for scalability.

## Installation

To run this project locally, please follow these steps:

1. Clone the repository to your local machine using the following command:

git clone https://github.com/your-username/petfinder-spa.git


2. Install the necessary dependencies by navigating to the project directory and running:

'npm install'

3. Set up the PostgreSQL database by executing the the following PSQL scripts. Make sure to update the database connection details in the configuration file if needed.

'psql postgres'
'\i  db/seed.sql'


4. Create an `.env` file in the root directory of the project and provide the following environment variables:

PORT=8000
DATABASE_URL=your-database-url

5. Start the application by running the following command:

'npm run server'

6. Open your web browser and visit `http://localhost:8000` to access the Petfinder SPA or with live serer. Once on page, please zoom your page out to 75%.

## Usage

- Upon accessing the application, you will be able to search and browse the available pets. Use the provided search filters to narrow down your results.
- To create a new pet listing, click on the "Add New Listing" button and fill out the required information.
- To update an existing pet's details, click on the "Edit" button in the respective pet listing.
- To delete a pet listing, click on the "Delete" button in the respective pet listing.





