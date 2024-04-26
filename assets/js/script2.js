// Seleccionar los elementos del DOM
const nuevaTareaInput = document.querySelector("#nuevaTarea");
const agregarTarea = document.querySelector("#agregarTarea");
const [totalSpan, realizadasSpan] = document.querySelectorAll("#contadores span");

// Arreglo para almacenar tareas
const tareas = [];

// Objeto para almacenar el resumen de tareas
let resumen = {
    total: 0,
    realizadas: 0
};

// Función para agregar un tarea a la lista
const addTarea = (toDo) => {
    const idd = Math.floor(Math.random() * 99);
    const tarea = {
        toDo,
        idd,
        realizada: false
    };
    tareas.push(tarea);
};

// Función para marcar un tarea como realizada o no realizada
const checkInput = (idd) => {
    const tarea = tareas.find((tarea) => tarea.idd === idd);
    tarea.realizada = !tarea.realizada;
    refresh();

    const spanElement = document.querySelector(`#listaTareas li input[id="${idd}"]`);

    if (tarea.realizada) {
        spanElement.classList.add('texto-realizado');
    } else {
        spanElement.classList.remove('texto-realizado');
    }
};

// Función para eliminar un tarea de la lista
const deleteTarea = (idd) => {
    const index = tareas.findIndex((tarea) => tarea.idd === idd);
    tareas.splice(index, 1);
    refresh();
};

const fillList = () => {
    const listaTareas = document.querySelector("#listaTareas");
    listaTareas.innerHTML = ""; // Limpiar la lista antes de agregar elementos

    tareas.forEach(({toDo, idd, realizada}) => {
        const listItem = document.createElement("li");

        // Agregar contenido al elemento <li>
        listItem.innerHTML = `
            <input onchange="checkInput(${idd})" ${realizada ? "checked" : ""} type="checkbox"/>
            <span>${idd}</span>
            <span>${toDo}</span>
            <span onclick="deleteTarea(${idd})">❌</span>
        `;

        listaTareas.appendChild(listItem); // Agregar el elemento <li> a la lista
    });
};


// Función para actualizar la lista y el resumen
const refresh = () => {
    fillList(); // Llenar la lista en lugar de la tabla
    calculateResumen();
    updateResumen();
};

// Función para calcular el resumen de tareas
const calculateResumen = () => {
    resumen.total = tareas.length;
    resumen.realizadas = tareas.filter(({realizada}) => realizada).length;
};

// Función para actualizar el resumen en la interfaz
const updateResumen = () => {
    const {total, realizadas} = resumen;
    totalSpan.textContent = total;
    realizadasSpan.textContent = realizadas;
};



// Event listener para el botón de agregar tarea
agregarTarea.addEventListener("click", () => {
    const nuevaTarea = nuevaTareaInput.value.trim();
    if (nuevaTarea) {
        addTarea(nuevaTarea);
        refresh();
        nuevaTareaInput.value = "";
    } else {
        alert("Debe ingresar una tarea.");
    }
});

// Llenar la tabla inicial con algunos tareas predefinidos
addTarea("Barrer la vereda");
addTarea("Regar las plantas");
addTarea("Pasear al perro");
refresh();