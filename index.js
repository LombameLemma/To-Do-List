// Get references to the HTML elements
const addButton = document.getElementById('addButton');
const doneButton = document.getElementById('doneButton'); // Reference to the Done button
const taskList = document.getElementById('taskList');
const container = document.querySelector('.container');

// Add a click event listener to the "Add" button
addButton.addEventListener('click', () => {
    // Check if an input field already exists to prevent multiple from appearing
    const existingInputArea = document.querySelector('.input-area');
    if (existingInputArea) {
        return;
    }

    // Create a new div to hold the input field and save button
    const inputArea = document.createElement('div');
    inputArea.className = 'input-area';

    // Create the input field
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'newActivity';
    input.placeholder = 'Enter new activity...';

    // Create the "Save" button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'save-button';

    // Append the input and save button to the new div
    inputArea.appendChild(input);
    inputArea.appendChild(saveButton);

    // Insert the input area just before the button container
    const buttonContainer = document.querySelector('.button-container');
    container.insertBefore(inputArea, buttonContainer);

    // Automatically focus on the new input field
    input.focus();

    // Add a click event listener to the "Save" button
    saveButton.addEventListener('click', () => {
        const newActivityText = input.value.trim();

        if (newActivityText !== '') {
            // Create a new list item
            const newLi = document.createElement('li');
            newLi.textContent = newActivityText;

            // Add a click event listener to the new list item
            newLi.addEventListener('click', () => {
                newLi.classList.toggle('completed');
            });

            // Add the new list item to the task list
            taskList.appendChild(newLi);

            // Remove the input area after the task is added
            inputArea.remove();
        } else {
            // Use a simple alert to notify the user of an empty input
            // In a real application, a custom modal or message would be better
            alert('Please enter an activity!');
        }
    });

    // Add an event listener to the input field for the 'Enter' key
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            saveButton.click(); // Trigger the save button click
        }
    });
});

// Add a click event listener to the "Done" button
doneButton.addEventListener('click', () => {
    const listItems = taskList.querySelectorAll('li');
    let hasCompletedTask = false;
    listItems.forEach(item => {
        if (item.classList.contains('completed')) {
            item.remove();
            hasCompletedTask = true;
        }
    });

    if (hasCompletedTask) {
        // You can add a message here to indicate tasks were removed,
        // but for now we'll just remove them.
    } else {
        alert('No tasks selected to be marked as done!');
    }
});
