let productosDisponibles = [
  [1, "Notebook Lenobo S400", 100, true],
  [2, "Celular Notorola G5", 135, false],
  [3, "Smart TV Filips 43'", 190, true],
  [4, "Sony PS 7", 215, true],
];

let respuestaAfirmativa = "si";
let respuestaNegativa = "no";
let salirDelPrograma = respuestaNegativa;
let confirmarOperacion;
let repetirOperacion = respuestaAfirmativa;
let carritoDeCompras = [];
let productoEncontrado = false;
let unidadesDeProducto;

//////////////////////// FUNCIONES /////////////////////////////
const validacionSimple = variable => variable = variable.toLowerCase().trim();

const validacionRespuestaMenuPrincipal = variable => {
  validacionSimple(variable);
  if (variable != "agregar" && variable != "mostrar" && variable != "eliminar" && variable != "vaciar" && variable != "cancelar" && variable != "confirmar") {
    return alert("La opción ingresada es inválida");
  } else {
    return variable;
  }
}

const repeat = (variable, count) => {
  for (let i = 0; i < count; i++) {
    carritoDeCompras.push(variable);
  }
  return carritoDeCompras;
}

const agregarProducto = (opp, arr1, arr2) => {
  do {
    if (opp === "agregar") {
      let productoEncontrado = false;
      let stringProductosEnStock = `
      ID            PRODUCTO           PRECIO 
      ${arr1[0][0]}        ${arr1[0][1]}       $${arr1[0][2]}
      ${arr1[2][0]}        ${arr1[2][1]}       $${arr1[2][2]}
      ${arr1[3][0]}        ${arr1[3][1]}       $${arr1[3][2]}`


      let idProductoAAgregar = prompt(`Ingrese el ID del producto que desea agregar
      ${stringProductosEnStock}`);

      idProductoAAgregar = Number(idProductoAAgregar);

      for (let i = 0; i < arr2.length; i++) {  ////nunca entra a este for y no se por que ¯\_(ツ)_/¯
        for (let j = 0; j < arr2[i][j].length; j++) {
          if (idProductoAAgregar === arr2[i][j]) {
            arr2.push(arr2[i])
            alert(`Se ha agregado el producto al carrito de compras`)
          }
        }
      }

      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1[i].length; j++) {
          if (idProductoAAgregar === arr1[i][j]) {
            productoEncontrado = true;
            let unidadesDeProducto = prompt(`¿Cuántas unidades desea llevar?`)
            unidadesDeProducto = Number(unidadesDeProducto)

            repeat(arr1[i], unidadesDeProducto)
            alert(`Se ha agregado el producto al carrito de compras`)
          }
        }
      }
      if (productoEncontrado === false) {
        alert(`El producto ingresado no existe`)
      }

      repetirOperacion = prompt(`¿Desea realizar la operación nuevamente?`);
      validacionSimple(repetirOperacion);
    }
  } while (repetirOperacion === respuestaAfirmativa);
  return arr2;
}

const eliminarProducto = (opp, arr) => {
  do {
    if (opp === "eliminar") {
      idProducto = prompt("Ingrese el ID del producto que desea eliminar");
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i][j].length; j++) {
          if (idProducto === arr[i][j]) {
            productoEncontrado = true;
            unidadesDeProducto += 1; //no sé como mostrar la cantidad de unidades del producto que hay en el carrito de compras
            confirmarOperacion = prompt(`Producto: 
            ${arr[i][1]} 
            ${unidadesDeProducto}

            ¿Desea confirmar la operación?`);
            //como le mostraria al usuario sólo algunos detalles del producto y no el array entero?
            validacionSimple(confirmarOperacion);

            if (confirmarOperacion === respuestaAfirmativa) {
              arr = arr.splice(0, arr[i]);
              alert("Mischief managed");
            }
            else {
              alert("La operación ha sido cancelada");
            }
          }
        }
      }
      if (productoEncontrado === false) {
        alert(`El producto ingresado no se encuentra en el carrito de compras`);
      }
      repetirOperacion = prompt("¿Desea repetir la operación nuevamente?");
      validacionSimple(repetirOperacion);
    }
  } while (repetirOperacion === respuestaAfirmativa)
}

const vaciarCarrito = (opp, arr) => {
  if (operacionARealizar === "vaciar") {
    confirmarOperacion = prompt(`¿Desea confirmar la operación?`)

    validacionSimple(confirmarOperacion);

    if (confirmarOperacion === respuestaAfirmativa) {
      arr.splice(0, arr.length)
      return alert(`Mischief managed`)
    }
    else {
      return alert(`La operación ha sido cancelada`)
    }
  }
}

const cancelarCompra = opp => {
  if (operacionARealizar === "cancelar") {
    confirmarOperacion = prompt(`¿Desea cancelar la compra?`)

    validacionSimple(confirmarOperacion);

    if (confirmarOperacion === respuestaAfirmativa) {
      alert(`Mischief managed`)
      salirDelPrograma = respuestaAfirmativa;
    }
  }
  return salirDelPrograma;
}

const contarTotalDeProductos = arr => arr.length;
const subtotalDeCompra = arr => {
  let subtotalDeCarrito;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      subtotalDeCarrito += arr[i][2]     
    }    
  }
  return subtotalDeCarrito;
} 
const totalDescuento = arr => {
  let productosCarritoConDescuento = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === true) {
        productosCarritoConDescuento.push(arr[i])
      }            
    }    
  }  
  subtotalDeCompra(productosCarritoConDescuento);
  return subtotalDeCarrito;  
}

const mostrarProductos = arr => {
  let listaProductosEnCarrito = ``;
  for (let i = 0; i < arr.length; i++) {
    listaProductosEnCarrito += `
    PRODUCTO: ${arr[i][1]}
    PRECIO: ${arr[i][2]}
    CANTIDAD: 
    SUBTOTAL: `    
  } // no se me ocurre como recorrer un array y encontrar si algun array dentro de ese se repite.  
}

////////////////////////// INICIO PROGRAMA //////////////////////////////
while (salirDelPrograma === respuestaNegativa) {
  let operacionARealizar = prompt(`Bienvenide a Ciabatta
 
 ¿Qué operación desea realizar?
 
 - [AGREGAR] un producto
 - [MOSTRAR] carrito de compras
 - [ELIMINAR] un producto de su carrito
 - [VACIAR] el carrito de compras
 - [CANCELAR] compra
 - [CONFIRMAR] compra`)

  validacionRespuestaMenuPrincipal(operacionARealizar);

  //////////////////////////////////////////// AGREGAR UN PRODUCTO //////////////////////////////////////////////
  agregarProducto(validacionRespuestaMenuPrincipal(operacionARealizar), productosDisponibles, carritoDeCompras);
  //por ésta utilización de una funcion como variable, si lo que se ingreso en el prompt es invalido retorna el 
  //alerta 2 veces
  //////////////////////////////////////////// MOSTRAR COMPRA //////////////////////////////////////////////

  ///////////////////////////////////////// ELIMINAR UN PRODUCTO ////////////////////////////////////////////
  
  eliminarProducto(validacionRespuestaMenuPrincipal(operacionARealizar), carritoDeCompras)
  //////////////////////////////////////////// VACIAR CARRITO ///////////////////////////////////////////////
  
  vaciarCarrito(validacionRespuestaMenuPrincipal(operacionARealizar), carritoDeCompras);
  //////////////////////////////////////////// CANCELAR COMPRA //////////////////////////////////////////////

  cancelarCompra(validacionRespuestaMenuPrincipal(operacionARealizar));
  ////////////////////////////////////////// CONFIRMAR COMPRA //////////////////////////////////////////////


}