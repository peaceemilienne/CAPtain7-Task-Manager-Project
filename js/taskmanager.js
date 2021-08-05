// Create createTaskHtml function
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {

        const taskCard = `
        <div class="card" data-task-id=${id}>
            <div class="card-image bubbles">
                <h3 class="aligned-cent"><strong>${status}</strong></h3><hr>
            </div>
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted"> ${description}</h6>
            <p class="card-text">Assigned to: <em>${assignedTo}</em></p>
            <h6 class="card-subtitle mb-2 text-muted">Due Date: ${dueDate}</h6>
            <button class="btn btn-outline-success done-button">Mark As Done</button>
            <button class="btn btn-outline-danger delete-button">Delete</button>
        </div>`;

        return taskCard;



    }
    //Function to display Icon incase the task array is empty
const icon = () => {
        return ` <figure>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg " width="200 " height="200 " fill="currentColor " class="bi bi-calendar2-check-fill " viewBox="0 0 16 16 ">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-2.6
                5.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z "
                />
                </svg>
                <p class="icon-text"><strong>Well Done!</strong></p>
                <p class="icon-text"> Your task list is empty, Check back soon! </p>
                
            </div>
        </figure>`

    }
    //1. Created TaskManager class
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
    addTask(name, description, assignedTo, dueDate, status) {
        const task = {
                //incrementing currentId
                id: this.currentId++,
                name: name,
                description: description,
                assignedTo: assignedTo,
                dueDate: dueDate,
                status: status
            }
            //pushing task into tasks array
        this.tasks.push(task);
    }
    render() {
            const tasksHtmlList = [];
            //Checking if the array is empty
            if (this.tasks.length === 0) {
                const taskListEmpty = document.querySelector("#task-list");
                taskListEmpty.innerHTML = icon();
            } else {

                for (let i = 0; i < this.tasks.length; i++) {
                    let taskValue = this.tasks[i];
                    let date = new Date(taskValue.dueDate);
                    let formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
                    let taskHtml = createTaskHtml(taskValue.id, taskValue.name, taskValue.description, taskValue.assignedTo,
                        formattedDate, taskValue.status);
                    tasksHtmlList.push(taskHtml);
                }
                let tasksHtml = tasksHtmlList.join('\n');
                //adding taskcard into task-list section
                const taskList = document.querySelector("#task-list");
                taskList.innerHTML = tasksHtml;
            }
        }
        //method to retrieve task by ID
    getTaskById(taskId) {

            let foundTask;

            this.tasks.forEach(currentTask => {
                let task = currentTask;
                if (task.id === taskId) {
                    foundTask = task;
                }
            })
            return foundTask;
        }
        //method to store created tasks into a local storage
    save() {
        // to create JSON string of tasks
        const tasksJson = JSON.stringify(this.tasks);
        //storing JSON string in the local storage
        localStorage.setItem("tasks", tasksJson);
        //converting currentID into a string
        const currentId = String(this.currentId);
        //storing currentId in local storage
        localStorage.setItem("currentId", currentId);

    }

    //method to load tasks back to the app
    load() {
        if (localStorage.getItem("tasks")) {
            // get json tasks from local storage
            const tasksJson = localStorage.getItem("tasks");
            // converting and storing tasks back into array 
            this.tasks = JSON.parse(tasksJson);
        }
        //check to see if current ID stored in the tasks
        if (localStorage.getItem("currentId")) {
            // grabing saved current ID from local storage
            const currentId = localStorage.getItem("currentId");
            // convert current ID into a number and store it in the Task Manager
            this.currentId = Number(currentId);
        }
    }

    //method to delete task by the ID
    deleteTask(taskId) {
        //empty array for tasks
        const newTasks = [];

        //loop through the tasks and check if the task id different from the task passed as the parameter
        this.tasks.forEach(task => {
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        })

        this.tasks = newTasks;
    }


}


module.exports = TaskManager;