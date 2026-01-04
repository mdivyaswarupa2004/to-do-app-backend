# Manage Daily Tasks - Backend

This is a simple backend service built with Node.js, Express, TypeScript, and Firebase Firestore.
It provides REST API endpoints to create, read, update, and delete tasks.
All tasks are stored securely in Firestore and can be used by frontend application.

## Clone the repository

```bash
git clone https://github.com/mdivyaswarupa2004/to-do-app-backend.git
cd to-do-app-backend
```

## Install dependencies

```bash
npm install
```

## Firebase setup

1. Create a Firebase project in the Firebase Console.
2. Generate a Service Account key from
   Project Settings -> Service Accounts -> Generate new private key.
3. Download the JSON file and place it root:
4. Ensure the file is ignored by Git by keeping it in `.gitignore`.

## Running the server

To start the backend in development mode:

```bash
npm run dev
```

The server runs on:

```bash
http://localhost:3000
```

API base path:

```bash
/tasks
```

## Running tests

Run all backend tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## Author

M. Divyaswarupa
GitHub:
[https://github.com/mdivyaswarupa2004](https://github.com/mdivyaswarupa2004)