import * as fs from 'fs';
import * as path from 'path';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  createdAt: string;
}

class TodoCLI {
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

  private readTodos(): Todo[] {
    const data = fs.readFileSync(this.todosFile, 'utf-8');
    return JSON.parse(data);
  }

  private writeTodos(todos: Todo[]): void {
    fs.writeFileSync(this.todosFile, JSON.stringify(todos, null, 2));
  }

  public addTodo(task: string): void {
    const todos = this.readTodos();
    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      task,
      completed: false,
      createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    this.writeTodos(todos);
    console.log(`✅ Todo added successfully! (ID: ${newTodo.id})`);
  }

  public listTodos(): void {
    const todos = this.readTodos();
    
    if (todos.length === 0) {
      console.log('📋 No todos found. Add one with: npm start add "Your task"');
      return;
    }

    console.log('\n📋 Your Todo List:\n');
    todos.forEach(todo => {
      const status = todo.completed ? '✓' : '○';
      const date = new Date(todo.createdAt).toLocaleDateString();
      console.log(`  [${status}] ${todo.id}. ${todo.task} (${date})`);
    });
    console.log('');
  }

  public deleteTodo(id: number): void {
    const todos = this.readTodos();
    const initialLength = todos.length;
    const filteredTodos = todos.filter(todo => todo.id !== id);

    if (filteredTodos.length === initialLength) {
      console.log(`❌ Todo with ID ${id} not found.`);
      return;
    }

    this.writeTodos(filteredTodos);
    console.log(`🗑️  Todo ${id} deleted successfully!`);
  }

  public completeTodo(id: number): void {
    const todos = this.readTodos();
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      console.log(`❌ Todo with ID ${id} not found.`);
      return;
    }

    todo.completed = !todo.completed;
    this.writeTodos(todos);
    console.log(`${todo.completed ? '✅' : '○'} Todo ${id} marked as ${todo.completed ? 'completed' : 'incomplete'}!`);
  }

  public showHelp(): void {
    console.log(`
📝 Todo List CLI - Usage:

  npm start add "Task description"    - Add a new todo
  npm start list                      - List all todos
  npm start delete <id>               - Delete a todo by ID
  npm start complete <id>             - Toggle todo completion status
  npm start help                      - Show this help message

Examples:
  npm start add "Buy groceries"
  npm start list
  npm start complete 1
  npm start delete 2
    `);
  }
}

// Main CLI logic
const [,, command, ...args] = process.argv;
const todoCLI = new TodoCLI();

switch (command) {
  case 'add':
    if (args.length === 0) {
      console.log('❌ Please provide a task description.');
      console.log('Usage: npm start add "Task description"');
    } else {
      todoCLI.addTodo(args.join(' '));
    }
    break;

  case 'list':
    todoCLI.listTodos();
    break;

  case 'delete':
    const deleteId = parseInt(args[0]);
    if (isNaN(deleteId)) {
      console.log('❌ Please provide a valid todo ID.');
      console.log('Usage: npm start delete <id>');
    } else {
      todoCLI.deleteTodo(deleteId);
    }
    break;

  case 'complete':
    const completeId = parseInt(args[0]);
    if (isNaN(completeId)) {
      console.log('❌ Please provide a valid todo ID.');
      console.log('Usage: npm start complete <id>');
    } else {
      todoCLI.completeTodo(completeId);
    }
    break;

  case 'help':
    todoCLI.showHelp();
    break;

  default:
    if (!command) {
      todoCLI.listTodos();
    } else {
      console.log(`❌ Unknown command: ${command}`);
      todoCLI.showHelp();
    }
}
