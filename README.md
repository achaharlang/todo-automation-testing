#  Automated Testing Project – React + Node.js

##  Objective

This project, called Todo, automates the steps of entering/creating/editing/deleting tasks in different modes:

**React frontend**
**Node.js backend REST API**

Functional UI and API tests have been written using Cypress and Postman/Newman.

##  Tech Stack

| Layer        | Technology      |
|--------------|-----------------|
| Frontend     | React.js        |
| Backend      | Node.js + Express |
| UI Testing   | Cypress         |
| API Testing  | Postman + Newman |
| Package Mgmt | npm             |


##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/achaharlang/todo-automation-testing.git
cd todo-automation-testing


### 2. Install dependencies

npm install


### 3. Run the frontend

cd todo-frontend
npm start


### 4. Run the Backend (API Server):

cd todo-frontend/todo-backend
npm start
________________________________________

## Url Address

Frontend runs on: http://localhost:3000
Backend runs on: http://localhost:4000


## User Test info

Username: hr@remwaste.com
Password: P@ssword1234

_______________________________________
## How to Run Tests
//To perform the test, Cypress must be installed.


### 1. UI Automation Tests with Cypress

cd todo-frontend
npx cypress open

//todo-frontend/cypress/e2e/cypress/e2e/inegration/todo_spec.cy.js      This file is executable!
//In Cypress automation testing, for better stability, a 0.5 second pause is implemented in each action, as well as a re-entry before each action to ensure the existence of data.


### 2. API Automation Tests with Newman
//You must have Newman installed for this test.
//npm install -g newman

#### API Automation Test

cd todo-frontend
newman run REMWASTETASKS.postman_collection.json

#### API Manual Test with cURL

cd todo-frontend
Open todo-api-curl-collection.txt

//You can manually test each action individually by importing the cURL commands from this file into Postman. In cases 5 and 6, replace the ID at the end of the URL with the ID obtained from Get all API.


#### Result

All requests should return status 200 OK, including:

Login (valid/invalid)
Create todos
Edit todos
Delete todos

_________________________________________

##  Project Structure

//todo-frontend Directory is Project Root

├── todo-frontend/             # React App
├── todo-frontend/todo-backend/              # Node.js API
├── todo-frontend/cypress/              # Cypress tests
├── todo-frontend/REMWASTETASKS.postman_collection.json/              # Postman collection for API testing
├── todo-frontend/README.md             # This file
└── todo-frontend/Testplan.md           # Test Strategy Document


