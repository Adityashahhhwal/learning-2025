let todoList = [];

function addTask() {
    const inputElement = document.querySelector('.js-task-input'); // Get the task input element
    const dateInputElement = document.querySelector('.js-due-date-input'); // Get the due date input element
    const feedbackElement = document.querySelector('.js-feedback'); // Get the feedback element


    const name = inputElement.value.trim(); // Trim whitespace from the task name
    const dueDate = dateInputElement.value; // Get the due date value

    if (!name || !dueDate) { // Show feedback message
        feedbackElement.textContent = 'Please enter both a task and a due date.'; 
        feedbackElement.style.color = 'red'; // Set text color to red
        return;
    }

    feedbackElement.textContent = '';

    // Add the new task to the list
    todoList.push({ name, dueDate }); 

    renderTodoList(); // Re-render the list to show the new task

    // Clear input fields
    inputElement.value = ''; 
    dateInputElement.value = ''; 
}

function renderTodoList() {
    const listElement = document.getElementById('todo-list');
    listElement.innerHTML = ''; // Clear the old list before rendering

    todoList.forEach(function(task, i) {
        const li = document.createElement('li'); // new list item

        const nameSpan = document.createElement('span'); // span for task name
        nameSpan.textContent = task.name;
        nameSpan.style.marginRight = '10px'; //spacing

        const dateSpan = document.createElement('span'); // span for due date
        dateSpan.textContent = task.dueDate; // Set due date text
        dateSpan.style.marginRight = '10px'; // spacing

        const deleteBtn = document.createElement('button'); // delete button
        deleteBtn.textContent = 'Delete'; // Set button text
        deleteBtn.className = 'delete-todo-button'; // Add a class for styling
        deleteBtn.onclick = () => deleteTask(i); // Attach the delete function

        // ✅ append lets us add text + elements in one call
        li.append(nameSpan, dateSpan, deleteBtn);

        listElement.appendChild(li); // Append the list item to the list element
    });
}

function deleteTask(index) {
    todoList.splice(index, 1); // Remove one item at that index
    renderTodoList(); // Re-render the updated list
}
