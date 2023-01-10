/**
 * @description Bootcamp - Week 3 - Day 4 - Daily Challenge: Todo list
 * 
 * @author Yao Kan KOUASSI
 * @date 2023-01-10
 */

// 1. Create an empty array : const tasks = [];
let tasks = []
// 2. Create a function called addTask(). As soon as the user clicks on the button:
function addTask(e) {
    e.preventDefault()
    // check that the input is not empty, 
    let input = document.querySelector('#text'),
        text = input.value.trim()
    if (text.length) {
        // then add it to the array (ie. add the text of the task)
        // Each new task added to the array should have the properties : task_id, text and done (a boolean - false by default).
        let taskId = tasks.length
        tasks.push({
            id: taskId,
            text: text,
            done: false
        })
        // then add it to the DOM, below the form (in the <div class="listTasks"></div>) 
        // Each new task added should have
        // a “X” button. Use font awesome for the “X” button.
        // an input type="checkbox". The label of the input is the task added by the user.
        let listTasks = document.querySelector('.listTasks')

        let div = document.createElement('div')
        div.classList.add('task-item')
        div.dataset.taskId = taskId
        
        let x = document.createElement('button')
        x.classList.add('clear-task')
        x.onclick = deleteTask
        x.innerHTML = '&times;'
        div.appendChild(x)

        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.id = 'task' + taskId
        checkbox.onchange = doneTask
        div.appendChild(checkbox)
        
        let label = document.createElement('label')
        label.textContent = text
        label.setAttribute('for', 'task' + taskId)
        div.appendChild(label)
        
        let taskItems = document.querySelectorAll('.task-item')
        if(!taskItems.length) {
            listTasks.innerHTML = ''
            listTasks.appendChild(div)
        } else
            taskItems[0].parentNode.insertBefore(div, taskItems[0])
        
        input.value = ''
    }
}

/**
 * Mark a task as completed
 * @param {Event} e Checkbox element change event
 */
function doneTask(e) {
    let div = e.target.closest('.task-item')
    let label = div.querySelector('label')
    tasks[parseInt(div.dataset.taskId)].done = e.target.checked
    if(e.target.checked) {
        label.style.color = '#ff494d'
        label.style.opacity = '1'
        label.style.textDecoration = 'line-through'
    } else {
        label.style.color = 'initial'
        label.style.textDecoration = 'none'
        label.style.opacity = '0.65'
    }
}

/**
 * Delete a task from the tasks list
 * @param {Event} e Button element click event
 */
function deleteTask(e) {
    let div = e.target.closest('.task-item')
    tasks.splice(parseInt(div.dataset.taskId), 1, null)
    div.remove()
    if(!document.querySelectorAll('.task-item').length)
        document.querySelector('.listTasks').innerHTML = '<i>No task</i>'
}

// Attach event handlers
document.forms[0].addEventListener('submit', addTask)
document.querySelector('button[type=submit]').addEventListener('click', addTask)
// Remove all tasks
document.querySelector('#clear-all-tasks').addEventListener('click', () => {
    if(!document.querySelectorAll('.task-item').length) return
    if(confirm('Are you sure you want to clear all tasks?')) {
        tasks = []
        document.querySelector('.listTasks').innerHTML = '<i>No task</i>'
    }
})