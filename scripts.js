// Selecionando elementos do DOM
const inputField = document.getElementById("write");
const createButton = document.getElementById("create-btn");
const tasksContainer = document.querySelector(".tasks");
const noTasksMessage = document.querySelector(".no-tasks");
const taskCountElement = document.querySelector(".count .purple");
const completedCountElement = document.querySelector(".count .green");

let taskCount = 0;
let completedCount = 0;

// Função para atualizar a exibição das contagens de tarefas
function updateTaskCounts() {
    taskCountElement.textContent = taskCount;
    completedCountElement.textContent = completedCount;
}

// Função para exibir ou ocultar a mensagem "sem tarefas"
function toggleNoTasksMessage() {
    if (taskCount === 0) {
        noTasksMessage.style.display = "block";
    } else {
        noTasksMessage.style.display = "none";
    }
}

// Função para criar uma nova tarefa
function createTask() {
    const taskText = inputField.value.trim();

    if (taskText === "") {
        alert("Por favor, digite uma tarefa.");
        return;
    }

    // Criando elementos da tarefa
    const task = document.createElement("div");
    task.classList.add("task");

    const statusIcon = document.createElement("img");
    statusIcon.src = "Assets/circleregular.svg";
    statusIcon.classList.add("status-icon");
    statusIcon.alt = "Ícone de checkbox";

    const taskDescription = document.createElement("p");
    taskDescription.textContent = taskText;

    const trashIcon = document.createElement("img");
    trashIcon.src = "Assets/TrashRegular.png";
    trashIcon.classList.add("trash-icon");
    trashIcon.alt = "Ícone de deletar";

    // Adicionando elementos ao container da tarefa
    task.appendChild(statusIcon);
    task.appendChild(taskDescription);
    task.appendChild(trashIcon);

    // Adicionando evento de marcar como concluída
    statusIcon.addEventListener("click", () => {
        if (!task.classList.contains("completed")) {
            task.classList.add("completed");
            statusIcon.src = "Assets/checkcircle.svg";
            completedCount++;
        } else {
            task.classList.remove("completed");
            statusIcon.src = "Assets/circleregular.svg";
            completedCount--;
        }
        updateTaskCounts();
    });

    // Adicionando evento de exclusão da tarefa
    trashIcon.addEventListener("click", () => {
        task.remove();
        taskCount--;
        if (task.classList.contains("completed")) {
            completedCount--;
        }
        updateTaskCounts();
        toggleNoTasksMessage();
    });

    // Adicionando a tarefa ao container de tarefas
    tasksContainer.appendChild(task);

    // Atualizando contadores e mensagem
    taskCount++;
    updateTaskCounts();
    toggleNoTasksMessage();

    // Limpando o campo de entrada
    inputField.value = "";
}

// Evento de criação de tarefa ao clicar no botão
createButton.addEventListener("click", createTask);

// Evento de criação de tarefa ao pressionar Enter no campo de entrada
inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        createTask();
    }
});

// Inicializando a mensagem "sem tarefas"
toggleNoTasksMessage();
