let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const inputTask = document.querySelector(".input-task");
const addBtn = document.querySelector('.add-btn');
const tasksContainer = document.querySelector('.tasks-container');
const deleteAllBtn = document.querySelector('.delete-all-btn');

addBtn.addEventListener('click', () => {
    if (inputTask.value.trim() === '') {
        alert('من فضلك اكتب مهمه');
        return;
    }

    tasks.push({ text : inputTask.value.trim() , completed : false});
    inputTask.value = '';
    saveTasks();
    renderTasks();
});

inputTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (inputTask.value.trim() === '') {
            alert('من فضلك اكتب مهمه');
            return;
        }
    
        tasks.push({ text : inputTask.value.trim() , completed : false});
        inputTask.value = '';
        saveTasks();
        renderTasks();
    }
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

deleteAllBtn.addEventListener('click', () => {
    if (confirm('هل أنت متأكد أنك تريد مسح كل المهام؟')) {
        tasks = [];
        localStorage.removeItem('tasks');
        renderTasks();
    }
});

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

// function toggleCompleted (index) {
//     tasks[index].completed = !tasks[index].completed;
//     saveTasks();
//     renderTasks();
// }

renderTasks();