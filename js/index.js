//const { TaskManager } = require('./taskmanager.js');
const manager = new TaskManager();

//load and render tasks from local storage
manager.load();
manager.render();

const taskForm = document.querySelector('#taskForm');
dueDate.min = new Date().toISOString().split("T")[0];

taskForm.addEventListener("submit", (eventHandler) => {
    //prevent default
    eventHandler.preventDefault();
    //variables to hold inputs
    const taskName = document.querySelector('#nameOfTheTask');
    const taskDescription = document.querySelector('#taskDescription');
    const taskAssignedTo = document.querySelector('#assignedTo');
    const taskDueDate = document.querySelector('#dueDate');
    const taskStatus = document.querySelector('#status');

    //get the values of the inputs
    let name = taskName.value;
    let description = taskDescription.value;
    let assignedTo = taskAssignedTo.value;
    let dueDate = taskDueDate.value;
    let status = taskStatus.value;
    if (status === '1') {
        status = 'To Do';
    } else if (status === '2') {
        status = 'In Progress';
    } else if (status === '3') {
        status = 'Review';
    } else {
        status = 'Done';
    }

    //calling addTask and render function
    manager.addTask(
        name,
        description,
        assignedTo,
        dueDate,
        status
    );
    //Alert is a new task is created 
    alert("A new task was created successfully");
    //save and render task
    manager.save();
    manager.render();
    //Reset form to default values
    document.querySelector('#taskForm').reset();
});


const taskList = document.querySelector("#task-list");
// Add an onClick event listener to the Tasks List
taskList.addEventListener("click", (event) => {
    // Check if a "Mark As Done" button was clicked
    if (event.target.classList.contains("done-button")) {
        // Use console.log(event.target.parentElement) to see
        const parentTask = event.target.parentElement;
        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);
        let task = manager.getTaskById(taskId);
        // Update the task status to 'DONE'
        task.status = 'DONE';
        // Render the tasks
        manager.save();
        manager.render();
    }
    //functionality to delete task after clicking delete button
    if (event.target.classList.contains("delete-button")) {
        const parentTask = event.target.parentElement;
        const taskId = Number(parentTask.dataset.taskId);
        //delete the task
        manager.deleteTask(taskId);
        //save and render task
        manager.save();
        manager.render();
    }

});