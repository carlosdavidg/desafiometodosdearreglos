const botonAgregar = document.getElementById("botonAgregar");
let arrayTareas = [];
let generadorId = 1;

function eliminarTarea(idtarea) {
  const index = arrayTareas.findIndex((e) => e.id == idtarea);
  if (index >= 0) {
    arrayTareas.splice(index, 1);

    renderizarTareas();
  }
}

function marcarTareaRealizada(idtareaMarcada) {
  const index = arrayTareas.findIndex((e) => e.id == idtareaMarcada);

  //si es false, se cambia a true y viceversa

  if (arrayTareas[index].realizada == true) {
    arrayTareas[index].realizada = false;
  } else {
    arrayTareas[index].realizada = true;
  }

  renderizarTareas();
}

function renderizarTareas() {
  const htmlTareas = document.querySelector(".listaTareasBox");
  let renderizarHtml = `
    <thead>
        <tr>
        <th>ID</th> 
        <th>Tareas</th>
        <th>Realizada</hh>
        <th>Eliminar</th>
        </tr>
    </thead>
    <tbody>`;
  for (let tarea of arrayTareas) {
    if (tarea.realizada) {
      statusCheck = `checked`;
    } else {
      statusCheck = ``;
    }

    renderizarHtml += `
        <tr>
            <td>${tarea.id}</td>
            <td>${tarea.nombre}</td> 
            <td><input type="checkbox" ${statusCheck} onclick="marcarTareaRealizada(${tarea.id});"></td> 
            <td><button id="botonEliminar" onclick="eliminarTarea(${tarea.id});">Eliminar</button></td>
        </tr>`;
  }

  htmlTareas.innerHTML += `</tbody>`;
  document.getElementById("spanTotal").innerHTML = arrayTareas.length;
  htmlTareas.innerHTML = renderizarHtml;

  const ArrayTareasHechas = arrayTareas.filter((e) => e.realizada == true);
  document.getElementById("spanRealizadas").innerHTML =
    ArrayTareasHechas.length;
}

botonAgregar.addEventListener("click", function () {
  const nombretareaInput = document.getElementById("idtareainput").value;
  const contadorId = generadorId;
  generadorId++;
  const tareaRealizada = false;

  const objetoTarea = {
    id: contadorId,
    nombre: nombretareaInput,
    realizada: tareaRealizada,
  };

  arrayTareas.push(objetoTarea);

  if (nombretareaInput == "") {
    alert("Ingresa al menos una tarea");
  } else {
    renderizarTareas();
  }
});
