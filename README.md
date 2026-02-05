# TypeScript Todo List CLI & Web App

A beautiful and functional todo list application with both CLI and Web UI interfaces, written in TypeScript.

## ✨ Features

### CLI Features
- ✅ Add new todos
- 📋 List all todos
- 🗑️ Delete todos by ID
- ✓ Mark todos as complete/incomplete
- 💾 Persistent storage using JSON file

### Web UI Features
- 🎨 Beautiful modern interface with gradient design
- 📊 Real-time statistics (Total, Active, Completed)
- 🔍 Filter todos (All, Active, Completed)
- ✏️ Edit todos inline
- 📱 Responsive design for mobile and desktop
- 🎭 Smooth animations and transitions
- 🔄 RESTful API backend

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Option 1: Run the Web UI (Recommended)

Start the web server:

```bash
npm run server
```

Then open your browser and visit:
```
http://localhost:3000
```

### Option 2: Use the CLI

Build the project:

```bash
npm run build
```

Then use CLI commands:

```bash
# Add a new todo
npm start add "Buy groceries"

# List all todos
npm start list

# Mark todo as complete
npm start complete 1

# Delete a todo
npm start delete 2

# Show help
npm start help
```

## 📖 CLI Usage

### Add a new todo

```bash
npm start add "Buy groceries"
npm start add "Finish TypeScript project"
```

### List all todos

```bash
npm start list
# or simply
npm start
```

### Complete/Uncomplete a todo

```bash
npm start complete 1
```

### Delete a todo

```bash
npm start delete 1
```

### Show help

```bash
npm start help
```

## 🌐 Web UI Usage

1. **Start the server**: `npm run server`
2. **Open browser**: Navigate to `http://localhost:3000`
3. **Add todos**: Type in the input field and click "Add Task" or press Enter
4. **Mark complete**: Click the checkbox next to any todo
5. **Edit todo**: Click the ✏️ edit button
6. **Delete todo**: Click the 🗑️ delete button
7. **Filter todos**: Use the All/Active/Completed tabs

## 🛠️ Development

### Run CLI in dev mode (without building)

```bash
npm run dev list
npm run dev add "Test task"
```

### Run server in dev mode

```bash
npm run server:dev
```

## 📂 Project Structure

```
.
├── index.ts              # CLI application
├── server.ts             # Express REST API server
├── public/               # Web UI files
│   ├── index.html       # Main HTML page
│   ├── styles.css       # CSS styling
│   └── app.js           # Frontend JavaScript
├── dist/                # Compiled JavaScript
├── todos.json           # JSON data storage
├── tsconfig.json        # TypeScript config
├── package.json         # Dependencies & scripts
└── README.md           # This file
```

## 🔌 API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update todo text
- `PUT /api/todos/:id/toggle` - Toggle completion status
- `DELETE /api/todos/:id` - Delete a todo

## 💾 Data Storage

Todos are stored in a `todos.json` file in the project directory. Each todo contains:
- `id` - Unique identifier
- `task` - Task description
- `completed` - Completion status
- `createdAt` - Creation timestamp

## 🎨 Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Express** - Web server framework
- **Node.js** - JavaScript runtime
- **Vanilla JavaScript** - Frontend (no framework needed!)
- **CSS3** - Modern styling with gradients and animations

## 📝 Examples

### CLI Examples
```bash
# Add some todos
npm start add "Learn TypeScript"
npm start add "Build a CLI app"
npm start add "Push to GitHub"

# List them
npm start list

# Complete the first one
npm start complete 1

# Delete the second one
npm start delete 2
```

### API Examples (using curl)

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Add a new todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"task":"Learn TypeScript"}'

# Toggle completion
curl -X PUT http://localhost:3000/api/todos/1/toggle

# Delete a todo
curl -X DELETE http://localhost:3000/api/todos/1
```

## 🚀 Deployment

The application can be deployed to any Node.js hosting platform:
- Heroku
- Vercel
- Railway
- DigitalOcean
- AWS

Just set the `PORT` environment variable and run `npm run server`.

## 📄 License

ISC

---

Built with TypeScript, Express & ❤️
