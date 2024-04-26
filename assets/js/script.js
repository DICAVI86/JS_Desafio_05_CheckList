document.getElementById('input').addEventListener('submit', function (e) {
    e.preventDefault();

    const nuevaTarea = document.getElementById('nuevaTarea').value;
    if (nuevaTarea === '') {
        alert('Por favor anota una tarea.');
        return;
    } 

    const listaTareas = document.getElementById('listaTareas');
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox">
    <span>${nuevaTarea}</span>
    <button class="delete">❌</button>
    `;

    listaTareas.appendChild(li);

    updateStats();

    document.getElementById('nuevaTarea').value = '';
});

document.getElementById('listaTareas').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentNode.remove();
        updateStats();
    } else if (e.target.type === 'checkbox') {
        e.target.parentNode.classList.toggle('completada');
        updateStats();
    }
});

function updateStats() {
    const totalTareas = document.querySelectorAll('#listaTareas li').length;
    const tareasRealizadas = document.querySelectorAll('#listaTareas input[type="checkbox"]:checked').length;
    document.getElementById('totalTareas').textContent = totalTareas;
    document.getElementById('tareasRealizadas').textContent = tareasRealizadas;
}



