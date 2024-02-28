
const atletas = [] //Almacenara los datos siempre y cuando no se reinicie la pag

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
    asistencia:false
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
    }
    
  }

}

function agregarAtletaTabla2(atleta){
  let table = document.getElementById("table-competition");
  let fila = document.createElement("tr");
  fila.innerHTML = "<td>" + atleta.nombre + "</td><td>" + atleta.apellido + "</td><td>" + atleta.cedula + "</td><td>" + atleta.municipio + "</td><td>" + atleta.edad ;
  table.appendChild(fila);

}