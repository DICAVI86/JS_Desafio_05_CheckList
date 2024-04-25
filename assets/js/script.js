document.getElementById('input').addEventListener('submit', function (e) {
    e.preventDefault();

    const nuevaTarea = document.getElementById('nuevaTarea').value;
    if (nuevaTarea === '') {
        alert('Por favor anota una tarea.');
        return;
    }

    const listaTareas = document.getElementById('listaTareas');
    const li = document.createElement('li');
    li.textContent = `${nuevaTarea}`;
    li.appendChild(createDeleteButton());
    li.appendChild(createCheckbox());
    listaTareas.appendChild(li);

    updateStats();

    document.getElementById('nuevaTarea').value = '';
});

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete')
    deleteButton.textContent = 'X';
    deleteButton.onclick = function (e) {
        e.target.parentNode.remove();
        updateStats();
    };
    return deleteButton;
}

function createCheckbox() {
    const checkbox = document.createElement('input');
    checkbox.type= 'checkbox';
    return checkbox;
}

document.getElementById('input').addEventListener('click', function (e) {
    if (e.target.type === 'checkbox') {
        e.target.parentNode.classList.toggle('completed');
        updateStats();
    }
});

function updateStats() {
    const totalTareas = document.querySelectorAll('#listaTareas li').length;
    //const tareasRealizadas = document.querySelectorAll('#tareasRealizadas').length;
    document.getElementById('totalTareas').textContent = totalTareas;
    //document.getElementById('tareasRealizadas').textContent = tareasRealizadas;
}



