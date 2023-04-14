function deleteButton(button) {
    const listItem = button.parentNode;
    listItem.remove();

    // add this removal to local storage
    const taskList = document.getElementById("task-list");
    const tasks = taskList.querySelectorAll("li");
    const tasksArray = Array.from(tasks);
    const tasksText = tasksArray.map((task) => task.querySelector(".task").innerText);
    localStorage.setItem("tasks", JSON.stringify(tasksText));
}

function taskDone(task) {
    const taskSpan = task.parentNode.querySelector(".task");
    taskSpan.classList.toggle("task-done");

    // update the classList modification in local storage
    const taskList = document.getElementById("task-list");
    const tasks = taskList.querySelectorAll("li");
    const tasksArray = Array.from(tasks);
    const tasksText = tasksArray.map((task) => task.querySelector(".task").innerText);
    localStorage.setItem("tasks", JSON.stringify(tasksText));
}

function addTaskButton() {
    const input = document.getElementById("input-task");
    const value = input.value;
    const taskList = document.getElementById("task-list"); // declare list variable here
    if (value !== "") {
        let newTask = `
                    <li>
                        <input type="checkbox" onclick="taskDone(this)">
                        <span class="task">${value}</span>
                        <button class="delete-btn" onclick="deleteButton(this)" id='${value}'>Delete</button>
                    </li>
                `;
        taskList.insertAdjacentHTML("beforeend", newTask);
        input.value = "";
    }

    // add this new task to local storage
    const tasks = taskList.querySelectorAll("li");
    const tasksArray = Array.from(tasks);
    const tasksText = tasksArray.map((task) => task.querySelector(".task").innerText);
    localStorage.setItem("tasks", JSON.stringify(tasksText));

}

// retrieve and display tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks"));
const taskList = document.getElementById("task-list");
if (tasks) {
    console.log(tasks);
    tasks.forEach((task) => {
        let newTask = `
                    <li>
                        <input type="checkbox" onclick="taskDone(this)">
                        <span class="task">${task}</span>
                        <button class="delete-btn" onclick="deleteButton(this)" id='${task}'>Delete</button>
                    </li>
                `;
        // display tasks in id="task-list"
        taskList.insertAdjacentHTML("beforeend", newTask);
    });
}
