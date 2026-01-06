# Manage Daily Tasks - Backend

This is a simple backend service built with Node.js, Express, TypeScript, and Firebase Firestore.

It provides REST API endpoints to create, read, update, and delete tasks.

All tasks are stored in Firestore safely and can be used by frontend application.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/mdivyaswarupa2004/to-do-app-backend.git
cd to-do-app-backend
```

### Install dependencies

```bash
npm install
```

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project
2. Click on Project Settings (gear icon)
3. Go to Service Accounts tab
4. Click Generate New Private Key button
5. Download the JSON file and save it as `serviceAccountKey.json` in the project root folder
6. The file is already added to `.gitignore` so it won't be uploaded to GitHub

## Environment Variables

Create a `.env` file in the root folder:

```env
NODE_ENV=development
PORT=3000
```

## Running the Server

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

All endpoints use base path `/tasks`

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task by id
- `DELETE /tasks/:id` - Delete a task by id

## Running Tests

Run all tests:

```bash
npm test
```

Check test coverage:

```bash
npm run coverage
```

## Deployment

This backend is deployed on Render. To deploy your own:

1. Push code to GitHub
2. Create account on [Render](https://render.com)
3. Create new Web Service and connect your repository
4. Add `serviceAccountKey.json` as a Secret File in Environment settings
5. Set build command: `npm install && npm run build`
6. Set start command: `npm start`

## Technologies Used

- Node.js and Express for server
- TypeScript for type safety
- Firebase Firestore for database
- Jest for testing

## License

MIT License => feel free to use this code for your own projects

## Author

M. Divyaswarupa  
GitHub: [mdivyaswarupa2004](https://github.com/mdivyaswarupa2004)