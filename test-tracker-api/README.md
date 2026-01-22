Task Tracker API

A simple REST API built with Node.js and Express to manage tasks, with a console-based CLI client and an example implementation of the Decorator design pattern.

Features

Create, read, update and delete tasks

Input validation and consistent error handling

Clean layered architecture (routes, controllers, services)

Decorator pattern used to extend service behaviour (logging and metrics)

Node.js console (CLI) client for end-to-end interaction

In-memory data storage for simplicity

Run
npm install
npm run dev


The API runs on:

http://localhost:3000


To run the console client (in a second terminal):

node client/cli.js

API
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id

Notes

Task IDs are generated using Node.js crypto.randomUUID()

Task status must be one of: TODO, IN_PROGRESS, DONE

The Decorator pattern is applied to the task service to add logging and performance metrics without modifying core logic