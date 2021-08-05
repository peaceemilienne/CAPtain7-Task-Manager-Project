const assert = require('assert');
const taskmanager = require('../js/taskmanager');
const manager = new taskmanager();


describe('taskmanager', () => {
    // test for the TaskManager initialization
    describe('.constructor', () => {
        it('It initializes ID and creates an empty array', () => {
            const initialID = manager.currentId;
            const initialArray = manager.tasks;

            assert.strictEqual(0, initialID);
            assert.strictEqual(0, initialArray.length);

        });
    });
    //test for add Task method
    describe('.addTask', () => {
        it('Adds a new task', () => {
            const task = {
                id: manager.currentId,
                name: "blablaname",
                description: "blabladescription",
                assignedTo: "Alex",
                dueDate: "02/03/2021",
                status: "To Do",
            };

            manager.addTask(
                task.name,
                task.description,
                task.assignedTo,
                task.dueDate,
                task.status
            );

            assert.deepStrictEqual(manager.tasks[0], task);
        });
    });

    // test for get Task by Id method 
    describe('.getTaskById', () => {
        it('Retrieves a task by it\'s ID', () => {
            const expectedTask = {
                id: manager.currentId,
                name: "Call The restaurant",
                description: "Make reservation",
                assignedTo: "Peace",
                dueDate: "08/10/2021",
                status: "To Do",
            };
            manager.addTask(
                expectedTask.name,
                expectedTask.description,
                expectedTask.assignedTo,
                expectedTask.dueDate,
                expectedTask.status
            );
            const returnedTask = manager.getTaskById(expectedTask.id);

            assert.deepStrictEqual(expectedTask, returnedTask);



        });
    });
    // test for delete Task method 
    describe('.deleteTask', () => {
        it('Deletes a task', () => {

            const oldArray = manager.tasks;
            manager.deleteTask(oldArray[0].id);
            const newArray = manager.tasks;


            assert.notDeepStrictEqual(oldArray, newArray);

        });
    });
});