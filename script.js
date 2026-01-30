const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const taskList = document.getElementById("taskList");
const actionButtons = document.getElementById("actionButtons");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

saveBtn.style.display = "none";
displayTasks();

addBtn.addEventListener("click", () => {
    if (taskInput.value === "") return alert("Entrez une tâche");

    tasks.push({
        text: taskInput.value,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    displayTasks();
});

saveBtn.addEventListener("click", () => {
    if (taskInput.value === "") return alert("Entrez une tâche");

    tasks[editIndex].text = taskInput.value;

    taskInput.value = "";
    editIndex = null;

    saveBtn.style.display = "none";
    addBtn.style.display = "inline";

    saveTasks();
    displayTasks();
});

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) li.classList.add("completed");

        const checkBtn = document.createElement("button");
        checkBtn.textContent = "Done";

        checkBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            taskInput.value = task.text;
            editIndex = index;

            addBtn.style.display = "none";
            saveBtn.style.display = "inline";
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        const actionDiv = document.createElement("div");

        actionDiv.appendChild(checkBtn);
        actionDiv.appendChild(editBtn);
        actionDiv.appendChild(deleteBtn);

        li.appendChild(actionDiv);
        taskList.appendChild(li);

    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
