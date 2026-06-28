const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {

        const li = document.createElement("li");
        li.className = task.completed ? "task completed" : "task";
        li.dataset.id = task.id;

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">
                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

}

// Add Task
addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    displayTasks(currentFilter);

});

// Event Delegation
taskList.addEventListener("click", (e) => {

    const li = e.target.closest(".task");

    if (!li) return;

    const id = Number(li.dataset.id);

    const task = tasks.find(t => t.id === id);

    if (e.target.classList.contains("complete-btn")) {

        task.completed = !task.completed;

    }

    if (e.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(t => t.id !== id);

    }

    if (e.target.classList.contains("edit-btn")) {

        const newText = prompt("Edit Task", task.text);

        if (newText && newText.trim() !== "") {

            task.text = newText.trim();

        }

    }

    saveTasks();
    displayTasks(currentFilter);

});

// Filters
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        displayTasks(currentFilter);

    });

});

// Load tasks
displayTasks(currentFilter);
