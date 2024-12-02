{
    const tasks = [];

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent });
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex)
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);

            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="task__item js-task">
            <button class="task__button task__button--toggleDone js-done ${task.done ? "task__button--done" : "task__button--not-done"}">
            ${task.done ? "&#x2713;" : "&#x2717;"} 
            </button> <span class="task__content ${task.done ? "task__content--done" : ""}"> ${task.content} 
            </span>

            <button class="task__button task__button--remove js-remove">&#128465;</button>
            </li> 
            `;
        }
        document.querySelector(".js-task").innerHTML = htmlString;
        bindRemoveEvents();
        bindToggleDoneEvents();

    };



    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}