# To_Do_List

# 📝 Task Management Application

A simple and intuitive task management application built with vanilla HTML, CSS, and JavaScript. This application provides a clean interface for managing tasks with drag-and-drop functionality, persistent storage, and a modern dark/light theme toggle.

## ✨ Features

### 🎯 Core Functionality
- **Task Creation (Create)**: Add new tasks with title and optional description
- **Task Listing (Read)**: View tasks organized in Incomplete and Completed sections
- **Task Editing (Update)**: Edit task titles and descriptions
- **Task Deletion (Delete)**: Remove individual tasks or delete all tasks at once

### 🎨 User Experience
- **Drag & Drop**: Intuitive drag-and-drop functionality to move tasks between Incomplete and Completed sections
- **Persistent Storage**: All data is saved using LocalStorage and persists after page reload
- **Theme Toggle**: Switch between dark and light themes with a single click
- **Toast Notifications**: Real-time feedback for all user actions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📋 Task Management
- **Subtask Support**: Add subtasks with due dates to any main task
- **Due Date Tracking**: Set and view due dates for tasks and subtasks
- **Status Management**: Mark tasks as complete or incomplete
- **Filter Options**: Filter tasks by status (All, Completed, Pending)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks or libraries required
- **LocalStorage**: Client-side data persistence
- **Drag & Drop API**: Native browser drag-and-drop functionality

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server (optional):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     ```

3. **Start managing your tasks!**

## 📖 How to Use

### Creating Tasks
1. Enter a task title in the "Add a Task" field
2. Optionally set a due date
3. Add a description in the textarea
4. Click the "+" button to create the task

### Managing Tasks
- **Edit**: Click the ✏️ button to modify task details
- **Complete**: Click the ✔️ button or drag to the Completed section
- **Delete**: Click the 🗑️ button to remove a task
- **Subtasks**: Click the 📋 button to add and manage subtasks

### Drag & Drop
- Drag any task card from one section to another
- The task status will automatically update based on the target section
- Visual feedback shows the drag operation in progress

### Subtasks
- Click the 📋 button on any task to open the subtask modal
- Add subtasks with titles and optional due dates
- Manage subtask completion status
- Edit or delete individual subtasks

## 🎨 Theme Support

The application includes both dark and light themes:
- **Dark Theme**: Default theme with dark backgrounds and light text
- **Light Theme**: Clean light theme with dark text and light backgrounds
- **Auto-save**: Theme preference is saved and restored on page reload

## 🔔 Toast Notifications

The application provides instant feedback for all actions:
- ✅ **Task Created**: When a new task is added
- ✏️ **Task Updated**: When task details are modified
- 🗑️ **Task Deleted**: When a task is removed
- 🔄 **Task Moved to Completed**: When a task is marked complete
- 🔄 **Task Moved to Incomplete**: When a task is marked incomplete

## 💾 Data Persistence

All data is automatically saved to the browser's LocalStorage:
- Tasks and their properties
- Subtasks and their details
- Theme preference
- Filter settings

Data persists across browser sessions and page reloads.

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Shraddha Thorat**
- GitHub: [@SST1303](https://github.com/SST1303)

## 🙏 Acknowledgments

- Icons and emojis for visual feedback
- Modern CSS techniques for responsive design
- Vanilla JavaScript for lightweight performance

---

⭐ **Star this repository if you found it helpful!**

**Made with ❤️ by Shraddha Thorat**
