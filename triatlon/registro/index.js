
const atletas = [
] //Almacenara los datos siempre y cuando no se reinicie la pag

// Recibe el evento del formulario y evita recargar la pagina para que los datos se guarden en la lista
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    agregarAtleta();
  });
});


// 
function agregarAtleta(){
 
  // Capturamos los datos del input
  let nombre = document.getElementById("nombre").value
  let apellido = document.getElementById("apellido").value
  let cedula = document.getElementById("cedula").value
  let municipio = document.getElementById("municipio").value
  let edad = document.getElementById("edad").value 

  // Validamos si la cedula se registro anteriormente
  const cedulaValidada = validarCedula(cedula)

  // Validamos que la edad sea mayor a 18
  if ((parseInt(edad) < 18) || (parseInt(edad) > 70)){
    alert("El atleta debe ser mayor de edad y menor a 70 años")
    document.getElementById("edad").value = "";
   
    return false  
  }


  else if(cedulaValidada === false){
    alert("Cedula ya registrada")
    document.getElementById("cedula").value = "";
    return false
}
  else if(typeof cedulaValidada === "string" && /[a-zA-Z]/.test.apply(cedulaValidada)){
    alert("Ingrese una cedula valida.");
  }
  
  // Creamos objeto de tipo atleta
  const atleta = {
    nombre:nombre,
    apellido:apellido,
    cedula:cedula,
    municipio:municipio,
    edad:edad,
    asistencia:false,
    horasTriatlon: {
      hiCaminata:0,
      hfCaminata:0,
      hiNatacion:0,
      hfNatacion:0,
      hiCiclismo:0,
      hfCiclismo:0

    },
    triatlon: {
      tiempoT:0,
      caminata:0,
      natacion:0,
      ciclismo:0,   
    }
  }


  atletas.push(atleta)//Almacenamos el atleta registrado a nuestra lista
  agregarAtletaTabla(atleta)// Agreamos al atleta a la tabla

  // Vaciamos los inputs del formulario
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("cedula").value = "";
  document.getElementById("municipio").value = "";
  document.getElementById("edad").value = "";

  alert("Atleta registrado exitosamente")
  
}


//Valida si la  cedula existe en la lista de atletas
function validarCedula(cedula){

  for (let atleta of atletas){
    if(atleta.cedula === cedula){
      return false
    }
  }

  return true
}

// Agrega el atleta a la tabla
function agregarAtletaTabla(atleta){
  let table = document.getElementById("table");
  let fila = document.createElement("tr");
  fila.innerHTML = "<td>" + atleta.nombre + "</td><td>" + atleta.apellido + "</td><td>" + atleta.cedula + "</td><td>" + atleta.municipio + "</td><td>" + atleta.edad + "</td><td><span class='remove-product' onclick='removeElement(this)'>x</span></td>";
  table.appendChild(fila);
}

// Elimina un atleta
function removeElement(element) {
  const row = element.parentNode.parentNode;
  const cedula = row.getElementsByTagName("td")[2].innerHTML;
  row.parentNode.removeChild(row);
  
  //Elimino el atleta de la lista
  for (let atleta of atletas){
    if (atleta.cedula===cedula){
      atletas.splice(atletas.indexOf(atleta),1)
      break
    }
  }
}

document.getElementById('nombre').addEventListener('input', function() {
    // Expresión regular para validar que no haya números
    var regex = /^[^\d]+$/;
    var textoInput = this.value;
    
    if (!regex.test(textoInput)) {
      this.value = textoInput.replace(/\d/g, ''); // Elimina los números del valor del input
    }
  });

document.getElementById('apellido').addEventListener('input', function() {
    // Expresión regular para validar que no haya números
    var regex = /^[^\d]+$/;
    var textoInput = this.value;
    
    if (!regex.test(textoInput)) {
      this.value = textoInput.replace(/\d/g, ''); // Elimina los números del valor del input
    }
});

document.getElementById('municipio').addEventListener('input', function() {
    // Expresión regular para validar que no haya números
    var regex = /^[^\d]+$/;
    var textoInput = this.value;
    
    if (!regex.test(textoInput)) {
      this.value = textoInput.replace(/\d/g, ''); // Elimina los números del valor del input
    }
});

function validateInput() {
  var input = document.getElementById("ValidateC").value;
  var numbers = /^[0-9]+$/;
  
  if (!input.match(numbers)) {
    alert("Ingresa un valor de cédula valido");
    document.getElementById("ValidateC").value = "";
  }

  else{
    checkAtleta()
  }
}

//Comprueba que el atleta ingresado al evento se inscribio previamente
function checkAtleta(){
  const cedula = document.getElementById("ValidateC").value;

  const validacion = validarCedula(cedula)

  if(validacion === true){

    document.getElementById("ValidateC").value = "";
    alert("Atleta no inscrito")
  }
  
  else{
    //agregamos atleta a la tabla
    let atleta = "";
    for (let persona of atletas){
      if(persona.cedula === cedula){
        atleta =persona
      }
    }

    if (atleta.asistencia === true){
      alert("Atleta ya registrado")
      document.getElementById("ValidateC").value = "";
    }else{
      atleta.asistencia = true;
      agregarAtletaTabla2(atleta);
      alert("Atleta registrado")
    }
  }

}

function agregarAtletaTabla2(atleta){
let table = document.getElementById("table-competition");
let tbody = table.querySelector("tbody");
let fila = document.createElement("tr");
fila.innerHTML = "<td>" + atleta.nombre + "</td><td>" + atleta.apellido + "</td><td>" + atleta.cedula + "</td><td>" + atleta.municipio + "</td><td>" + atleta.edad + "</td>";

tbody.appendChild(fila);
}


function comenzarTriatlon(){

  for (let atleta of atletas){
    
    if (atleta.asistencia=== true){   
    const boton = document.getElementById("start");
    // Deshabilitar el botón
    boton.disabled = true;     
            
      return Triatlon()
    }
  }

  alert("No hay nadie registrado para comenzar el triatlon")
}


function Triatlon(){
  
  const distanciaMaraton = 10
  const distanciaNatacion = 10
  const distanciaCiclismo = 30
  const velocidadMaratonKH = 7
  const velocidadNatacionKH = 6.19
  const velocidadCiclismoKH = 45

  var ahora = new Date();
  var hora = ahora.getHours();
  var minuto = ahora.getMinutes();
  var segundo = ahora.getSeconds();

  // Obtener todas las filas del cuerpo de la tabla
  var filas = document.querySelectorAll("#table-competition tbody tr");
    filas.forEach(function(fila) {
    var nuevaColumna = document.createElement("td");
    nuevaColumna.textContent = `${hora}:${minuto}:${segundo}`;
    fila.appendChild(nuevaColumna);
});

for (let atleta of atletas){

  if (atleta.asistencia === true){
    atleta.horasTriatlon.hiCaminata = `${hora}:${minuto}:${segundo}`
    simularMaraton(atleta,distanciaMaraton,velocidadMaratonKH)
    simularNatacion(atleta,distanciaNatacion,velocidadNatacionKH)
    simularCiclismo(atleta,distanciaCiclismo,velocidadCiclismoKH)
    
    

  }

}

c1 = []
c2 = []
c3 = []
c4 = []
c5 = []
c6 = []

for (let atleta of atletas){

  c1.push(atleta.horasTriatlon.hfCaminata)
  c2.push(atleta.horasTriatlon.hiNatacion)
  c3.push(atleta.horasTriatlon.hfNatacion)
  c4.push(atleta.horasTriatlon.hiCiclismo)
  c5.push(atleta.horasTriatlon.hfCiclismo)

  let horaI = parseInt(atleta.horasTriatlon.hiCaminata.slice(0,2))
  let horaF = parseInt(atleta.horasTriatlon.hfCiclismo.slice(0,2))
 

  let minutoI = parseInt(atleta.horasTriatlon.hiCaminata.slice(3,5))
  let minutoF = parseInt(atleta.horasTriatlon.hfCiclismo.slice(3,5))

  let hora, minuto;

// Calcular la diferencia de horas
if (horaF < horaI) {
    // Atraviesa la medianoche, ajustar la diferencia de horas
    hora = 24 - (horaI - horaF);
} else {
    hora = horaF - horaI;
}

// Calcular la diferencia de minutos
if (minutoF < minutoI) {
    // Necesita ajuste debido a que los minutos finales son menores que los iniciales
    hora--; // Restar una hora
    minuto = 60 - (minutoI - minutoF);
} else {
    minuto = minutoF - minutoI;
}





  c6.push(`${hora}:${minuto}:25`)
}

columnasResultados = [c1,c2,c3,c4,c5,c6]

for (let i = 0; i < columnasResultados.length; i++) {
  // Se usa let para crear un cierre sobre la variable columna
  let columna = columnasResultados[i];
  
  // Se utiliza un IIFE (Immediately Invoked Function Expression) para capturar el valor actual de columna
  // dentro de cada iteración del bucle
  (function(columna) {
      // Se utiliza setTimeout dentro del IIFE para ejecutar actualizarTabla(columna) después de 5 segundos
      setTimeout(function() {
          actualizarTabla(columna);
      }, i * 2000); // Se multiplica i por 5000 para que cada llamada a setTimeout se ejecute después de 5 segundos de la anterior
  })(columna);
}


}



function simularMaraton(atleta,distanciaTotal,velocidad){

  while(atleta.triatlon.caminata < distanciaTotal){
  let tiempo = Math.random()
  
  let distanciaParcial =  tiempo * velocidad;
  atleta.triatlon.tiempoT +=  tiempo
  atleta.triatlon.caminata += distanciaParcial
  }
  var ahora = new Date();
  var hora = ahora.getHours() + Math.floor(atleta.triatlon.tiempoT);
  var minuto = Math.floor((ahora.getMinutes() + (atleta.triatlon.tiempoT % 1).toFixed(2) * 100) / 10);
  var segundo = ahora.getSeconds();
  if (minuto >= 60) {
    hora += Math.floor(minuto / 60);
    minuto %= 60;
  }
  
    if (hora >= 23){
      hora  -= 23;
    }
  

  atleta.horasTriatlon.hfCaminata = `${hora}:${minuto}:${segundo}`
  atleta.horasTriatlon.hiNatacion = `${hora}:${minuto}:${segundo}`
 
}

function simularNatacion(atleta,distanciaTotal,velocidad){

  while(atleta.triatlon.natacion < distanciaTotal){
  let tiempo = Math.random()
  let distanciaParcial =  tiempo * velocidad;
  atleta.triatlon.tiempoT +=  tiempo
  atleta.triatlon.natacion += distanciaParcial
  }
  var ahora = new Date();
  var hora = ahora.getHours() + Math.floor(atleta.triatlon.tiempoT);
  var minuto = Math.floor((ahora.getMinutes() + (atleta.triatlon.tiempoT % 1).toFixed(2) * 100) / 10);
  var segundo = ahora.getSeconds();
  if (minuto >= 60) {
    hora += Math.floor(minuto / 60);
    minuto %= 60;
  }
  
    if (hora >= 23){
      hora  -= 23;
    }
  

  atleta.horasTriatlon.hfNatacion = `${hora}:${minuto}:${segundo}`
  atleta.horasTriatlon.hiCiclismo = `${hora}:${minuto}:${segundo}`
  
  
}

function simularCiclismo(atleta,distanciaTotal,velocidad){

  while(atleta.triatlon.ciclismo < distanciaTotal){
  let tiempo = Math.random()
  
  let distanciaParcial =  tiempo * velocidad;
  atleta.triatlon.tiempoT +=  tiempo
  atleta.triatlon.ciclismo += distanciaParcial
  }
  var ahora = new Date();
  var hora = ahora.getHours() + Math.floor(atleta.triatlon.tiempoT);
  var minuto = Math.floor((ahora.getMinutes() + (atleta.triatlon.tiempoT % 1).toFixed(2) * 100) / 10);
  var segundo = ahora.getSeconds();
 

// Convertir a números enteros
  if (minuto >= 60) {
  hora += Math.floor(minuto / 60);
  minuto %= 60;
}

  if (hora >= 23){
    hora  -= 23;
  }

  atleta.horasTriatlon.hfCiclismo = `${hora}:${minuto}:${segundo}`
  
  
}


function actualizarTabla(datos) {
  var tabla = document.getElementById("table-competition");

// Obtén una referencia al cuerpo de la tabla
var cuerpoTabla = tabla.getElementsByTagName('tbody')[0];

// Itera sobre el array de datos
for (var i = 0; i < datos.length; i++) {
    // Obtén la fila correspondiente (puedes ajustar esto según tu estructura de tabla)
    var fila = cuerpoTabla.rows[i];

    // Crea una nueva celda en la fila y agrega el dato del array
    var nuevaCelda = fila.insertCell(-1);
    nuevaCelda.textContent = datos[i];
}
  
}


function ordenarTabla() {
  const table = document.querySelector('#table-competition tbody');
  const rows = table.querySelectorAll('tr');

  const resultsTable = document.querySelector('#results tbody');
  const resultsTableHead = document.querySelector('#table-competition thead');

  const sortedRows = Array.from(rows).sort((a, b) => {
      const timeA = a.querySelector('td:nth-child(12)').textContent;
      const timeB = b.querySelector('td:nth-child(12)').textContent;

      const secondsA = timeA.split(':').reduce((total, value, index) => total + value * Math.pow(60, 2 - index), 0);
      const secondsB = timeB.split(':').reduce((total, value, index) => total + value * Math.pow(60, 2 - index), 0);

      return secondsA - secondsB;
  });

  // Clear existing rows in results table
  resultsTable.innerHTML = '';

  // Append sorted rows to results table
  sortedRows.forEach(row => resultsTable.appendChild(row.cloneNode(true)));
}
