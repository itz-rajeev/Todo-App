let todo = [];


document.addEventListener("DOMContentLoaded", () => {
    loadTodos();
    display();
    document.querySelector("#btn-add").addEventListener("click", addTodo);
});

function addTodo() {
    const text = document.querySelector("#todo-input").value.trim();
    const date = document.querySelector("#todo-date").value;
    const priority = document.querySelector("#todo-priority").value;
    const tags = document.querySelector("#todo-tags").value.trim();

    if (text === "" || date === "") {
        alert("Please fill in all required fields.");
        return;
    }

    todo.push({
        item: text,
        dueDate: date,
        priority: priority,
        tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
        subtasks: [],
    });

    saveTodos(); 
    document.querySelector("#todo-input").value = "";
    document.querySelector("#todo-date").value = "";
    document.querySelector("#todo-tags").value = "";
    display();
}

function display() {
    const itemsContainer = document.querySelector(".todo-container");
    itemsContainer.innerHTML = ""; 


    const priorityOrder = { high: 1, medium: 2, low: 3 };
    todo.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    todo.forEach((task, index) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        todoItem.innerHTML = `
            <div class="todo-item-header">
                <span>${task.item}</span>
                <span class="priority-${task.priority}">${task.priority.toUpperCase()}</span>
                <button class="btn-delete" data-index="${index}">Delete</button>
            </div>
            <div>
                <span>Due: ${task.dueDate}</span>
            </div>
            <div>
                <span>Tags: ${task.tags.join(", ") || "None"}</span>
            </div>
        `;

        itemsContainer.appendChild(todoItem);
    });

    
    itemsContainer.querySelectorAll(".btn-delete").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            deleteTodo(index);
        });
    });
}

function deleteTodo(index) {
    todo.splice(index, 1);
    saveTodos(); 
    display();
}


function saveTodos() {
    localStorage.setItem("todoList", JSON.stringify(todo));
}


function loadTodos() {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
        todo = JSON.parse(savedTodos);
    }
}