#  Test Plan – Todo App (React + Node.js)

## 1. Objective
This test plan outlines the strategy for testing a simple Todo web application consisting of a React frontend and a Node.js backend. The goal is to ensure core functionalities (login, CRUD operations) are working as expected through both UI and API testing.

_________________________________________

## 2. Scope

The following features are under test:

- **Frontend (React)**: UI interactions for login, creating, editing, and deleting todos
- **Backend (Node.js + Express)**: REST API endpoints for todo operations and authentication

_________________________________________

## 3. Test Types

| Test Type          | Tool Used         |
|--------------------|-------------------|
| UI Functional Test | Cypress           |
| API Functional Test| Postman + Newman  |
| Positive/Negative  | ✅ Both Covered   |

_________________________________________

## 4. Tools & Environment

| Layer     | Tech/Tool             |
|-----------|------------------------|
| Frontend  | React.js              |
| Backend   | Node.js + Express     |
| UI Tests  | Cypress               |
| API Tests | Postman / Newman CLI  |
| Package   | npm                   |

**Local URLs:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000`

_________________________________________

## 5. Test Data

| Field     | Value                |
|-----------|----------------------|
| Email     | `automationtest`   |
| Password  | `P@ssword1234`      |

Sample request body for creating a todo:
```json
{
  "title": "Test Task",
  "completed": false
}
```

________________________________________

## 6. Test Execution

### UI Test (Cypress)
```bash
cd todo-frontend
npx cypress open
# Run todo_spec.cy.js
```

### API Test (Newman)
```bash
cd todo-frontend
newman run REMWASTETASKS.postman_collection.json
```

_______________________________________

## 7. Assumptions & Limitations

- The backend must be running on port 4000 before test execution.
- A user with the given credentials is assumed to exist in the database.
- Tests are executed on a local machine only (no CI pipeline).
- No performance or security testing is included.

_______________________________________

## 8. Test Coverage Summary

| Scenario                    | Covered via |
|-----------------------------|-------------|
| Login with valid credentials| UI & API    |
| Login with invalid data     | UI & API    |
| Create a todo               | UI & API    |
| Edit a todo                 | UI & API    |
| Delete a todo               | UI & API    |
| Data presence assertions    | UI          |

_______________________________________

## ✅ Conclusion

This plan ensures critical paths of the Todo application are validated both via user interface and API layers, increasing confidence in application stability.
