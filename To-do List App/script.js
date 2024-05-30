document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage when the page loads
    loadTasks();

    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTasks();
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="deleteBtn">Delete</button>
      `;
        taskList.appendChild(li);

        // Add event listener for the delete button
        const deleteBtn = li.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', function () {
            li.remove();
            saveTasks();
        });

        // Add event listener for the checkbox
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function () {
            const taskSpan = li.querySelector('span');
            if (checkbox.checked) {
                taskSpan.classList.add('completed');
            } else {
                taskSpan.classList.remove('completed');
            }
            saveTasks();
        });
    }

    function saveTasks() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll('li');
        taskElements.forEach(taskElement => {
            const taskText = taskElement.querySelector('span').innerText;
            const isCompleted = taskElement.querySelector('input[type="checkbox"]').checked;
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text);
            const taskElement = taskList.lastChild;
            const checkbox = taskElement.querySelector('input[type="checkbox"]');
            const taskSpan = taskElement.querySelector('span');
            if (task.completed) {
                checkbox.checked = true;
                taskSpan.classList.add('completed');
            }
        });
    }
})
