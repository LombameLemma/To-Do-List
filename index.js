const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');
        const messageContainer = document.createElement('div');
        messageContainer.className = 'fixed bottom-5 right-5 p-4 rounded-lg text-white font-semibold transition-opacity duration-500 opacity-0';
        document.body.appendChild(messageContainer);

        function showMessage(text, isError = false) {
            messageContainer.textContent = text;
            messageContainer.style.backgroundColor = isError ? '#ef4444' : '#10b981';
            messageContainer.style.opacity = '1';
            setTimeout(() => {
                messageContainer.style.opacity = '0';
            }, 3000);
        }

        function createTaskElement(taskText) {
            const li = document.createElement('li');
            li.className = 'bg-gray-100 p-4 rounded-lg flex items-center justify-between text-gray-700 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-md cursor-pointer';

            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;
            li.appendChild(taskSpan);

            const doneButton = document.createElement('button');
            doneButton.textContent = 'Done';
            doneButton.className = 'done-btn bg-green-500 text-white px-3 py-1 text-sm rounded-md hover:bg-green-600 transition-colors';
            li.appendChild(doneButton);

            doneButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the li click event from firing
                li.classList.add('line-through', 'opacity-50', 'bg-gray-200');
                li.classList.remove('cursor-pointer');
                doneButton.remove();
                showMessage('Task completed!');
            });
            
            li.addEventListener('click', () => {
                li.classList.toggle('bg-blue-100');
            });
            
            return li;
        }

        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                const newTask = createTaskElement(taskText);
                taskList.appendChild(newTask);
                taskInput.value = '';
                showMessage('Task added successfully!');
            } else {
                showMessage('Please enter a task!', true);
            }
        });

        // Event listener for "Enter" key on the input field
        taskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                addTaskBtn.click();
            }
        });
