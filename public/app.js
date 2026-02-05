const API_URL = 'http://localhost:3000/api';
let todos = [];
let currentFilter = 'all';

// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const totalCount = document.getElementById('totalCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');
const filterTabs = document.querySelectorAll('.tab');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            renderTodos();
        });
    });
}

// Load Todos from API
async function loadTodos() {
    try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) throw new Error('Failed to load todos');
        todos = await response.json();
        renderTodos();
        updateStats();
    } catch (error) {
        console.error('Error loading todos:', error);
        showNotification('Failed to load todos', 'error');
    }
}

// Add Todo
async function addTodo() {
    const task = todoInput.value.trim();
    
    if (!task) {
        todoInput.focus();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });

        if (!response.ok) throw new Error('Failed to add todo');
        
        const newTodo = await response.json();
        todos.push(newTodo);
        todoInput.value = '';
        renderTodos();
        updateStats();
        showNotification('Todo added successfully!', 'success');
    } catch (error) {
        console.error('Error adding todo:', error);
        showNotification('Failed to add todo', 'error');
    }
}

// Toggle Todo Complete
async function toggleTodo(id) {
    try {
        const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
            method: 'PUT'
        });

        if (!response.ok) throw new Error('Failed to toggle todo');
        
        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === id);
        if (index !== -1) {
            todos[index] = updatedTodo;
        }
        renderTodos();
        updateStats();
    } catch (error) {
        console.error('Error toggling todo:', error);
        showNotification('Failed to update todo', 'error');
    }
}

// Delete Todo
async function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this todo?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete todo');
        
        todos = todos.filter(t => t.id !== id);
        renderTodos();
        updateStats();
        showNotification('Todo deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting todo:', error);
        showNotification('Failed to delete todo', 'error');
    }
}

// Edit Todo
async function editTodo(id, newTask) {
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: newTask })
        });

        if (!response.ok) throw new Error('Failed to update todo');
        
        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === id);
        if (index !== -1) {
            todos[index] = updatedTodo;
        }
        renderTodos();
        showNotification('Todo updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating todo:', error);
        showNotification('Failed to update todo', 'error');
    }
}

// Render Todos
function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '';
        emptyState.classList.add('show');
        return;
    }

    emptyState.classList.remove('show');
    
    todoList.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <div class="todo-content">
                <div class="todo-text">${escapeHtml(todo.task)}</div>
                <div class="todo-date">${formatDate(todo.createdAt)}</div>
            </div>
            <div class="todo-actions">
                <button class="btn-icon-only btn-edit" onclick="startEdit(${todo.id})" title="Edit">
                    ✏️
                </button>
                <button class="btn-icon-only btn-delete" onclick="deleteTodo(${todo.id})" title="Delete">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

// Get Filtered Todos
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

// Update Stats
function updateStats() {
    totalCount.textContent = todos.length;
    activeCount.textContent = todos.filter(t => !t.completed).length;
    completedCount.textContent = todos.filter(t => t.completed).length;
}

// Start Edit Mode
function startEdit(id) {
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    const todo = todos.find(t => t.id === id);
    
    if (!todo || !todoItem) return;

    todoItem.classList.add('editing');
    
    const content = todoItem.querySelector('.todo-content');
    content.innerHTML = `
        <input type="text" class="edit-input" value="${escapeHtml(todo.task)}" id="edit-input-${id}">
        <div class="edit-actions">
            <button class="btn-save" onclick="saveEdit(${id})">Save</button>
            <button class="btn-cancel" onclick="cancelEdit(${id})">Cancel</button>
        </div>
    `;
    
    const input = document.getElementById(`edit-input-${id}`);
    input.focus();
    input.select();
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit(id);
        } else if (e.key === 'Escape') {
            cancelEdit(id);
        }
    });
}

// Save Edit
function saveEdit(id) {
    const input = document.getElementById(`edit-input-${id}`);
    const newTask = input.value.trim();
    
    if (!newTask) {
        input.focus();
        return;
    }
    
    editTodo(id, newTask);
}

// Cancel Edit
function cancelEdit(id) {
    renderTodos();
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show Notification
function showNotification(message, type = 'info') {
    // Simple console notification (can be enhanced with a toast library)
    console.log(`[${type.toUpperCase()}] ${message}`);
}
