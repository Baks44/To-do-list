{
    let tasks = [];
    const removeTask = (taskIndex) => {
        tasks = tasks.filter((_, index) => index !== taskIndex);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) =>
            index === taskIndex ? { ...task, done: !task.done } : task
        );
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            },
        ];
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
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
        const taskListElement = document.querySelector(".js-tasks");

        if (!taskListElement) return;

        taskListElement.innerHTML = tasks
            .map(
                (task) => `
                <li class="task__item">
                    <button class="task__button task__button--toggleDone js-done ${task.done ? "task__button--done" : "task__button--not-done"
                    }">
                        ${task.done ? "&#x2713;" : "&nbsp;"}
                    </button>
                    <span class="task__content ${task.done ? "task__content--done" : ""
                    }">${task.content}</span>
                    <button class="task__button task__button--remove js-remove">
                        &#128465;
                    </button>
                </li>
            `
            )
            .join("");

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