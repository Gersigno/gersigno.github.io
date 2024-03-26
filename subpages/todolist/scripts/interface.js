var listContainer = document.getElementById("listContainer");

/**
 * Initialize our interface when our page is fully loaded
 */
function initInterface() {
  updateFilters();
  updateList();
}

/**
 * Update our tasks list using filters when any action is performed.
 */
function updateList() {
  //Check if the tasks container element exists in our html (it should anyway).
  if (listContainer != undefined) {
    //If the container exists, we clear it's html content.
    listContainer.innerHTML = "";
    //We then obtain the amount of tasks that exist in our local storage.
    var taskAmount = parseInt(localStorage.getItem("task_amount"));
    
    for(var i = 0; i < taskAmount; i++){
      const CURRENT_TASK = localStorage.getItem("task_" + (i));
      
      if(selectedFilter == filters[0].replace(" ", "")
      || 
      (selectedFilter == filters[1].replace(" ", "") && Object.entries(JSON.parse(CURRENT_TASK))[2][1] == false)
      ||
      (selectedFilter == filters[2].replace(" ", "") && Object.entries(JSON.parse(CURRENT_TASK))[2][1] == true)
      ) {

        //Then, for each task that matches with our selected filter, we create a new element and we append it to our "listContainer" element.

        //It's probably a terrible way to create our elements, let me know if you have better ways.
        listContainer.appendChild(
          Object.assign(document.createElement("div"), {
            className: "taskElement",
            id: "task_" + i
          })
        );
  
        const TASK_ELEM = document.getElementById("task_" + i);
        TASK_ELEM.appendChild(
          Object.assign(document.createElement("button"), {
            id: "task_" + i + "_body",
            className: "taskButton"
          })
        );
  
        const TASK_BODY = document.getElementById("task_" + i + "_body");
        TASK_BODY.appendChild(
          Object.assign(document.createElement("input"), {
            type: "checkbox",
            checked: Object.entries(JSON.parse(CURRENT_TASK))[2][1],
          })
        );
        TASK_BODY.appendChild(
          Object.assign(document.createElement("h2"), {
            innerHTML: Object.entries(JSON.parse(CURRENT_TASK))[0][1]
          })
        )
        TASK_BODY.appendChild(
          Object.assign(document.createElement("p"), {
            innerHTML: Object.entries(JSON.parse(CURRENT_TASK))[1][1]
          })
        )
  
        TASK_ELEM.appendChild(
          Object.assign(document.createElement("button"), {
            className: "removeButton",
            id: "task_" + i + "_remove"
          })
        ).appendChild(
          Object.assign(document.createElement("img"), {
            src: "resources/bin.png"
          })
        );
  
        var deleteButton = document.getElementById("task_" + i + "_remove");
        deleteButton.onclick = function(){
          deleteTask(this.id.toString().replace("_remove", ""))
        };

        TASK_BODY.onclick = function(){
          changeTaskState(this.id.toString().replace("_body", ""))
        };

        if(Object.entries(JSON.parse(CURRENT_TASK))[2][1] == true) {
          TASK_ELEM.classList.add("taskDone")
        }
      }
      var amountText = document.getElementById("taskAmount");
      var plural = "";
        if(listContainer.children.length > 1) {
          plural = "s";
        }
        amountText.innerHTML = listContainer.children.length + " task" + plural;
    }
  } else {
    console.error("Error ! Cannot find any valid list container element !");
  }
}

/**
 * This function updates the selected filter when any filter button is pressed by the user (Default: **ALL**)
 * @param {*} targetButton This parameter **NEED** to be a button containing a filter present in our filters list array ("*filters*") as an **ID without spaces**.
 */
function updateFilters(
  targetButton = document.getElementById("filtersContainer").children[0]
) {
  //We obtain our button's ID, that is actually our filter's name WITHOUT SPACE.
  selectedFilter = targetButton.id;

  const CONTAINER = document.getElementById("filtersContainer");
  for (var child of CONTAINER.children) {
    //First, we remove the "buttonSelected" class of each button.
    child.classList.remove("buttonSelected");
  }
  var activeButton = document.getElementById(selectedFilter);
  //Then, we add it back to the selected filter's button
  activeButton.classList.add("buttonSelected");
  //Finally we update our list.
  updateList();
}

/**
 * This function creates an overlay with different textboxes inputs that allow our user to create a new task
 */
function newTaskOverlay() {
  document.body
    .appendChild(
      Object.assign(document.createElement("div"), {
        id: "Popup_Background",
      })
    )
    .appendChild(
      Object.assign(document.createElement("div"), {
        id: "Popup",
      })
    );
  var Popup = document.getElementById("Popup");
  Popup.appendChild(
    Object.assign(document.createElement("h2"), {
      id: "Popup_Title",
      innerHTML: "Create a new task",
    })
  );
  Popup.appendChild(
    Object.assign(document.createElement("div"), {
      class: "Popup_Description",
      innerHTML: "Task title",
    })
  );
  Popup.appendChild(
    Object.assign(document.createElement("input"), {
      type: "text",
      id: "TaskTitle",
      minlength: "4",
      maxlength: "40",
    })
  );
  Popup.appendChild(
    Object.assign(document.createElement("div"), {
      class: "Popup_Description",
      innerHTML: "Description",
    })
  );
  Popup.appendChild(
    Object.assign(document.createElement("input"), {
      type: "text",
      id: "TaskDesc",
      minlength: "4",
      maxlength: "2000",
    })
  );
  Popup.appendChild(
    Object.assign(document.createElement("button"), {
      className: "buttonSelected",
      id: "createTaskButton",
    })
  ).appendChild(
    Object.assign(document.createElement("h3"), {
      innerHTML: "Create",
    })
  );

  var createTaskButton = document.getElementById("createTaskButton");
  createTaskButton.addEventListener("click", () => {
    var taskTitle = document.getElementById("TaskTitle").value;
    var taskDesc = document.getElementById("TaskDesc").value;
    var Popup = document.getElementById("Popup_Background");
    if (taskTitle == "" || taskDesc == "") {
      //If the title/description is empty, we do not create our Task's object.
      alert("All fields need to be filled !");
    } else {
      //If the title/description is valid, we create a new Task object and we add it to our local storage using our "addTaskToStorage" function.
      var newTask = new Task(taskTitle, taskDesc);
      addTaskToStorage(newTask);
    }
  });
}

