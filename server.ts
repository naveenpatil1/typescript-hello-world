import express, { Request, Response } from 'express';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  createdAt: string;
}

class TodoManager {
  private todosFile: string;

  constructor() {
    this.todosFile = path.join(__dirname, 'todos.json');
    this.initializeTodosFile();
  }

  private initializeTodosFile(): void {
    if (!fs.existsSync(this.todosFile)) {
      fs.writeFileSync(this.todosFile, JSON.stringify([], null, 2));
    }
  }

  public readTodos(): Todo[] {
    const data = fs.readFileSync(this.todosFile, 'utf-8');
    return JSON.parse(data);
  }

  private writeTodos(todos: Todo[]): void {
    fs.writeFileSync(this.todosFile, JSON.stringify(todos, null, 2));
  }

  public addTodo(task: string): Todo {
    const todos = this.readTodos();
    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      task,
      completed: false,
      createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    this.writeTodos(todos);
    return newTodo;
  }

  public deleteTodo(id: number): boolean {
    const todos = this.readTodos();
    const initialLength = todos.length;
    const filteredTodos = todos.filter(todo => todo.id !== id);

    if (filteredTodos.length === initialLength) {
      return false;
    }

    this.writeTodos(filteredTodos);
    return true;
  }

  public toggleComplete(id: number): Todo | null {
    const todos = this.readTodos();
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return null;
    }

    todo.completed = !todo.completed;
    this.writeTodos(todos);
    return todo;
  }

  public updateTodo(id: number, task: string): Todo | null {
    const todos = this.readTodos();
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return null;
    }

    todo.task = task;
    this.writeTodos(todos);
    return todo;
  }
}

const app = express();
const PORT = process.env.PORT || 3000;
const todoManager = new TodoManager();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.get('/api/todos', (req: Request, res: Response) => {
  const todos = todoManager.readTodos();
  res.json(todos);
});

app.post('/api/todos', (req: Request, res: Response) => {
  const { task } = req.body;
  
  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'Task description is required' });
  }

  const newTodo = todoManager.addTodo(task.trim());
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id/toggle', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }

  const todo = todoManager.toggleComplete(id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json(todo);
});

app.put('/api/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }

  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'Task description is required' });
  }

  const todo = todoManager.updateTodo(id, task.trim());
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json(todo);
});

app.delete('/api/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }

  const success = todoManager.deleteTodo(id);
  
  if (!success) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json({ message: 'Todo deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Todo Server running on http://localhost:${PORT}`);
  console.log(`📋 Open http://localhost:${PORT} in your browser`);
});
