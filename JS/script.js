//Constructor de objeto

class Cliente {
    constructor(_id, nombre, apellido, rut, telefono, tipo, activo) {
        this._id = _id.toLowerCase()
        this.nombre = nombre.toLowerCase()
        this.apellido = apellido.toLowerCase()
        this.rut = rut.toLowerCase()
        this.telefono = telefono.toLowerCase()
        this.tipo = tipo.toLowerCase()
        this.activo = activo.toLowerCase()
    }
}

//Conexión al CrudCrud
const baseURL = "https://crudcrud.com/api/6db23bb406534f4887a4375aa3dc2559";

//Instancias de elementos html
const input_id = document.getElementById('input_id')
const inputNombre = document.getElementById('input-nombre')
const inputApellido = document.getElementById('input-apellido')
const inputRut = document.getElementById('input-rut')
const inputTelefono = document.getElementById('input-telefono')
const selectTipo = document.getElementById('select-tipo')
const chkActivo = document.getElementById('check-activo')
const el = document.getElementById('lista-clientes');

//Array de clientes
let clientes = [];

//Instancias de botones Add y Update
const btnAdd = document.getElementById('btn-add');
const btnUpdate = document.getElementById('btn-update');
document.getElementById("btn-update").style.display = "none";


//Función para traer elementos del crud y cargar los elementos a la tabla
getAllData()

async function getAllData() {

    const res = await fetch(`${baseURL}/clientes`);

    const data = await res.json();
    const result = {
            data: data,
    };
    loadData(result);
}

//Función para cargar JSON a tabla
function loadData(result){
        clientes = JSON.parse(JSON.stringify(result));
        let data = '';
       	if (clientes.data.length > 0) {
       		for (i = 0; i < clientes.data.length; i++) {
       			data += '<tr>';
       		    data += '<td>' + clientes.data[i]._id + '</td>';
                   data += '<td>' + clientes.data[i].nombre + '</td>';
                   data += '<td>' + clientes.data[i].apellido + '</td>';
                   data += '<td>' + clientes.data[i].rut + '</td>';
                   data += '<td>' + clientes.data[i].telefono + '</td>';
                   data += '<td>' + clientes.data[i].tipo + '</td>';
                   data += '<td>' + clientes.data[i].activo + '</td>';
       			data += '<td colspan="2"><center><button class="btn btn-warning" onclick="Select(' + i + ')"><span class="glyphicon glyphicon-edit"></span> Select</button> | <button class="btn btn-danger" onclick="Delete('+ i +')"><span class="glyphicon glyphicon-trash"></span> Delete</button></center></td>';
       			data += '</tr>';
       		}
    }
   el.innerHTML = data;
}

//Limpia todos los campos input
function Clean() {
	input_id.value = ''
	inputNombre.value = ''
	inputApellido.value = ''
	inputRut.value = ''
	inputTelefono.value = ''
	selectTipo.value = ''
	chkActivo.checked = false

	getAllData();

}

//Crear un nuevo cliente
async function postData() {
    const nombre = inputNombre.value
    const apellido = inputApellido.value
    const rut = inputRut.value
    const telefono = inputTelefono.value
    const tipo = selectTipo.value
    let activo
    if (chkActivo.checked == true) {
        activo = "Si"
    } else {
       activo = "No"
    }

  const postData = {
    nombre: nombre,
    apellido: apellido,
    rut: rut,
    telefono: telefono,
    tipo: tipo,
    activo: activo
  };

    const res =  fetch(`${baseURL}/clientes`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify(postData),
    });
     getAllData()
     Clean()
}



//Función eliminar
async function Delete(item) {
    let id = clientes.data[item]._id
    const res = await fetch(`${baseURL}/clientes/${id}`, { method: "DELETE" });
    document.getElementById("btn-update").style.display = "none";
    getAllData()
    }

//Función seleccionar y editar cliente
	async function Select(item) {
       let id = clientes.data[item]._id
      if (id) {
          const res = await fetch(`${baseURL}/clientes/${id}`);
          const data = await res.json();
                  const result = {
                       data: data,
               };
          let cliente = JSON.parse(JSON.stringify(result));
              input_id.value = clientes.data[0]._id
           		inputNombre.value = clientes.data[0].nombre
           		inputApellido.value = clientes.data[0].apellido
           		inputRut.value = clientes.data[0].rut
           		inputTelefono.value = clientes.data[0].telefono
           		selectTipo.value = clientes.data[0].tipo
                let activo = clientes.data[0].activo
                if(activo === "Si"){
                    chkActivo.checked = true;
                }


           		document.getElementById("btn-update").style.display = "block";
                document.getElementById("btn-add").style.display = "none";
                document.getElementById('btn-update').onclick = function() {
                            putData()
                            document.getElementById("btn-update").style.display = "none";
                            document.getElementById("btn-add").style.display = "block";
                            clean()
                }
      }
    }

//Función update
    async function putData() {

            const id = input_id.value
     		const nombre = inputNombre.value
     		const apellido = inputApellido.value
     		const rut = inputRut.value
     		const telefono = inputTelefono.value
     		const tipo = selectTipo.value
     		let activo
     		 if (chkActivo.cheked) {
                    activo = "Si"
                } else {
                   activo = "No"
                }

      const putData = {
            nombre: nombre,
            apellido: apellido,
            rut: rut,
            telefono: telefono,
            tipo: tipo,
            activo: activo
      };

        const res = await fetch(`${baseURL}/clientes/${id}`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "PUT",
          body: JSON.stringify(putData),
        });
        Clean();
    }