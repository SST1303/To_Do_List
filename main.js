let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = localStorage.getItem('filter') || 'all';
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentTaskIndex = null;

const incompleteTasksEl = document.getElementById('incompleteTasks');
const completedTasksEl = document.getElementById('completedTasks');
const filterSelect = document.getElementById('filterSelect');
const subtaskModal = document.getElementById('subtaskModal');
const modalTaskTitle = document.getElementById('modalTaskTitle');
const modalTaskDescription = document.getElementById('modalTaskDescription');
const modalDueDate = document.getElementById('modalDueDate');
const subtaskList = document.getElementById('subtaskList');
const subtaskTitleInput = document.getElementById('subtaskTitleInput');
const subtaskDueDateInput = document.getElementById('subtaskDueDate');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTheme() {
    localStorage.setItem('theme', currentTheme);
}

function saveFilter() {
    localStorage.setItem('filter', currentFilter);
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    saveTheme();
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'});
}

function truncateDescription(description, maxLength = 30) {
    if (!description) return '-';
    return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
}

function openSubtaskModal(index){
    currentTaskIndex = index;
    const task = tasks[index];
    modalTaskTitle.textContent = task.title;
    modalTaskDescription.textContent = `Description: ${task.description || 'No description'}`;
    modalDueDate.textContent = `Due Date: ${formatDate(task.dueDate)}`;
    renderSubtasks();
    subtaskModal.style.display = 'flex';
}

function closeModal() {
    subtaskModal.style.display = 'none';
    currentTaskIndex = null;
    subtaskTitleInput.value = '';
}

function renderSubtasks() {
    subtaskList.innerHTML = '';
    const task = tasks[currentTaskIndex];
    if (!task.subtasks || task.subtasks.length === 0){
        subtaskList.innerHTML = '<li>No subtasks</li>';
        return;
    }
    task.subtasks.forEach((subtask, subIndex) => {
        const li = document.createElement('li');
        li.innerHTML = `
           <span>${subtask.title} ${subtask.dueDate ? '(' + formatDate(subtask.dueDate) + ')' : ''} ${subtask.completed ? '✅' : '❌'}</span>
           <div>
              <button onclick="toggleSubtaskStatus(${subIndex})">✔️</button>
              <button onclick="editSubtask(${subIndex})">✏️</button>
              <button onclick="deleteSubtask(${subIndex})">🗑️</button>
           </div>
        `;
        subtaskList.appendChild(li);
    })
}

function addSubtask() {
    const title = subtaskTitleInput.value.trim();
    const dueDate = subtaskDueDateInput.value;
    if (!title) {
        alert('Subtask title is required!');
        return;
    }
    if (!tasks[currentTaskIndex].subtasks) {
        tasks[currentTaskIndex].subtasks = [];
    }
    tasks[currentTaskIndex].subtasks.push({
        title,
        dueDate,
        completed: false,
    });
    saveTasks();
    renderSubtasks();
    subtaskTitleInput.value = '';
    subtaskDueDateInput.value = '';
}

function toggleSubtaskStatus(subIndex) {
    tasks[currentTaskIndex].subtasks[subIndex].completed = !tasks[currentTaskIndex].subtasks[subIndex].completed;
    saveTasks();
    renderSubtasks();
}

function editSubtask(subIndex) {
    const newTitle = prompt('Edit subtask title:', tasks[currentTaskIndex].subtasks[subIndex].title);
    if (newTitle !== null && newTitle.trim()) {
        tasks[currentTaskIndex].subtasks[subIndex].title = newTitle.trim();
        saveTasks();
        renderSubtasks();
    }
}

function deleteSubtask(subIndex) {
    if (confirm('Delete this subtasks?')) {
        tasks[currentTaskIndex].subtasks.splice(subIndex, 1);
        saveTasks();
        renderSubtasks();
    }
}

function renderTasks() {
  incompleteTasksEl.innerHTML = '';
  completedTasksEl.innerHTML = '';
  let filteredTasks = tasks;

  if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (filteredTasks.length === 0) {
    incompleteTasksEl.innerHTML = '<div class="empty">No tasks found</div>';
    completedTasksEl.innerHTML = '';
    return;
  }

  filteredTasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.setAttribute('draggable', 'true');
    card.setAttribute('ondragstart', `handleDragStart(event, ${index})`);
    card.innerHTML = `
      <div>
        <div onclick="openSubtaskModal(${index})" style="cursor: pointer; font-weight:600;">${task.title}</div>
        <div class="task-meta">${formatDate(task.dueDate)} · ${task.completed ? 'Completed' : 'Incomplete'}</div>
      </div>
      <div>
        <button onclick="toggleStatus(${index})">✔️</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
        <button onclick="openSubtaskModal(${index})">📋</button>
      </div>
    `;
    if (task.completed) {
      completedTasksEl.appendChild(card);
    } else {
      incompleteTasksEl.appendChild(card);
    }
  });
}

function handleDragStart(event, index){
  event.dataTransfer.setData('text/plain', String(index));
}

function allowDrop(event){
  event.preventDefault();
}

function handleDrop(event, dropToCompleted){
  event.preventDefault();
  const index = parseInt(event.dataTransfer.getData('text/plain'), 10);
  if (Number.isNaN(index)) return;
  tasks[index].completed = Boolean(dropToCompleted);
  saveTasks();
  renderTasks();
  showToast(dropToCompleted ? '🔄 Task Moved to Completed' : '🔄 Task Moved to Incomplete');
}

function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const dueDate = document.getElementById('taskDueDate').value;
  const description = document.getElementById('task-description').value.trim();

  if (!title) {
    alert('Task title is required!');
    return;
  }

  tasks.push({
    title,
    dueDate,
    description,
    completed: false,
    subtasks: [],
  });
  saveTasks();
  renderTasks();
  showToast('✅ Task Created');
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDueDate').value = '';
  document.getElementById('task-description').value = '';
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  showToast('🗑️ Task Deleted');
}

function deleteAllTasks() {
  if (confirm('Delete all tasks?')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

function toggleStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
  showToast(tasks[index].completed ? '🔄 Task Moved to Completed' : '🔄 Task Moved to Incomplete');
}

function editTask(index) {
  const newTitle = prompt('Edit task title:', tasks[index].title);
  const newDescription = prompt('Edit task description:', tasks[index].description);
  if (newTitle !== null && newTitle.trim()) {
    tasks[index].title = newTitle.trim();
    tasks[index].description = newDescription ? newDescription.trim() : tasks[index].description;
    saveTasks();
    renderTasks();
    showToast('✏️ Task Updated');
  }
}

function filterTasks(filter) {
  currentFilter = filter;
  saveFilter();
  renderTasks();
}

// Initialize theme, filter, and tasks
document.body.setAttribute('data-theme', currentTheme);
filterSelect.value = currentFilter;
renderTasks();