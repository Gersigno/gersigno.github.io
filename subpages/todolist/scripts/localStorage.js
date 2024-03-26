/**
 * Add a new task to local storage
 * @param {*} newTask Task's object instance.
 */
function addTaskToStorage(newTask) {
    //We first need to know how many tasks already exist in our local storage.
    var taskAmount = parseInt(readAllTaskFromLocal().length);
    //We then set our "task_amount" item to the tasks amount + one because we create a new task that will be added to our storage.
    localStorage.setItem("task_amount", (taskAmount + 1));
    //After that, we add our task to the storage. We create a new key named "task_" + our new task ID, with our task stringified as json format as a value.
    localStorage.setItem("task_" + taskAmount, JSON.stringify(newTask));
    //We finally update our list.
    updateList();
}

/**
 * Return every existing tasks in our local storage as an array.
 * @returns Tasks array.
 */
function readAllTaskFromLocal() {
    //We first obtain the amount of tasks by reading the "task_amount" item, we then parse it's value as an interger.
    var taskAmount = parseInt(localStorage.getItem("task_amount"));
    if(taskAmount != null) {
        //If our "taskAmount" item exist, we return each task by storing them in a temporary array ("tasks").
        var tasks = new Array();
        for(var i = 0; i < taskAmount; i++){
            tasks.push(localStorage.getItem("task_" + (i)));
        }
        return tasks;
    } else {
        //If "taskAmount" doesn't exist, we return an empty array.
        return [];
    }
}

/**
 * Delete a task of the local storage.
 * @param {*} target task's name (example : "task_3")
 */
function deleteTask(target) {
    //We first store all of our tasks in an array.
    var oldTasks = readAllTaskFromLocal();

    //We then create an empty array that will be filled with all of our tasks except of for the one we want to delete.
    var tasks = new Array();
    for(var i = 0; i < oldTasks.length; i++){
        if(target != "task_" + i)
        {
            //If the task is not the one that we want to delete, we push it into our "tasks" array.
            tasks.push(localStorage.getItem("task_" + (i)));
        }
    }
    //After that, we clear the whole local storage.
    localStorage.clear();
    //Then, we create our "task_amount" item again with the new amount of tasks.
    localStorage.setItem("task_amount", (tasks.length));
    for(var i = 0; i < tasks.length; i++) {
        //Afterward, we recreate each task item from our new tasks array ("tasks").
        localStorage.setItem("task_" + i, tasks[i]);
    }
    //Finally, we update our list.
    updateList();
}

/**
 * Update the target task "isDone" status.
 * @param {*} target The target task's name (example: "tesk_3")
 */
function changeTaskState(target) {
    //First, we obtain the value of the "isDone" key from the target task.
    var STATE = Object.entries(JSON.parse(localStorage.getItem(target)))[2][1];
    //We then get the whole value of the target task (Title, description, creationDate etc..)
    var oldValue = localStorage.getItem(target);
    //Then, we invert the "isDone" value of the task. (true to false/false to true).
    var newState = !STATE;
    //After that we rewrite the task's item with the new "isDone" value.
    localStorage.setItem(target, oldValue.replace(STATE.toString(), newState.toString()));
    //Finally, we update our list.
    updateList();
}