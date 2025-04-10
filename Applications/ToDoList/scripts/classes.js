/**
 * We create a "Task" class, to easily create new task's objects later.
 */
class Task {
    //We require a Title and a descriptor parameter in our constructor.
    constructor(Title, Description) {
        this.title = Title;
        this.description = Description;
        this.isDone = false; //This property will be used by our filters to sort our tasks.
        this.creationDate; //We also store the task's creation date, it's not used yet but it could be displayed or used to sort our tasks by date. The variable is defined later in our createTask() function.
        if(this.title == "" || this.description == "") {
            //Check if our task has any valid Title/Description.
            alert("All fields need to be filled !");
        } else {
            //If our task has a valid Title & description, we create our task.
            this.createTask(this.title, this.description);
        }
        
    }
    /**
     * This function is called if the new task is valid, it defines the "creationDate" parameter and remove our UI's popup.
     */
    createTask() {
        //We first define the current date/time in our "currentDate" class' parameter
        var currentTime = new Date();
        this.creationDate = currentTime.getDate() + "/" + (currentTime.getMonth() + 1) + "/" + currentTime.getFullYear() + " " + currentTime.getHours() + ":" + currentTime.getMinutes();
        //After that, we get rid of our popup.
        var Popup = document.getElementById("Popup_Background");
        Popup.remove();
    }
}