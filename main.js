let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const inputTask = document.querySelector(".input-task");
const addBtn = document.querySelector('.add-btn');
const tasksContainer = document.querySelector('.tasks-container');


addBtn.addEventListener('click', () => {
    if (inputTask.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    tasks.push({ text : inputTask.value.trim() , completed : false});
    inputTask.value = '';
    saveTasks();
    renderTasks();
});

function saveTasks () {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks () {
    tasksContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="delete-btn" onclick="deleteTask(${index})"> حذف</button>
                <button class="edit-btn" onclick="editTask(${index})"> تعديل</button>
            </div>
        `
        tasksContainer.appendChild(li);
    });
}

function editTask (index) {
    const newText = prompt('تعديل المهمه:', tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index){
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

renderTasks();