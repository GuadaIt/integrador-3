// 1. Guada, doy por aprobado este trabajo aunque no hayas terminado las consignas. 
// Era un trabajo muy largo y complejo, y cumpliste con creces haciendolo sola. 
// Queda demostrado por tu trabajo que comprendes con buen nivel como usar funciones, 
// parametros, return y como ponerlas en uso en un caso real: no necesito mas
// Las cosas que no funcionan, las deje comentadas, pero solo si tenes ganas de 
// hacerlo, no lo considero obligatorio. 
// Hiciste un gran trabajo. 

// 2. Cuando trato de agregar un producto, se agrega correctamente, pero al pedirme si deseo
// repetir la operacion, tira error si escribo "no". 
// Eso ocurre porque todas las funciones se ejecutan indistintamente de cual sea el valor
// de operacionARealizar, y esa variable no esta definida al momento de la declaracion de las 
// funciones. Se arregla facilmente usando el parametro "opp" que vos definiste en las funciones.

// 3. La funcion agregarProducto agrega muchas veces el mismo producto al carrito, 
// cuando la idea seria que se agregue un numero que represente la cantidad. 
// Esto va a ser necesario para hacer "confirmarCompra" mas comodamente.
// La idea seria
// 1.Fijarnos si el producto a agregar ya existe en el carrito (con un for y un if)
// 2. Si existe, en lugar de agregar un campo nuevo, agregamos a carritoDeCompras[i][3] el numero
// que representa la cantidad de veces que se quiere agregar ese producto
// 3. Si no existe, hacemos el push normal y en carritoDeCompras[i][3] ponemos la cantidad de veces



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
let codigoDeDescuento = "EXPECTOPATRONUM";
let unidadesDeProducto;

//////////////////////// FUNCIONES /////////////////////////////

// me ENCANTA como quedo esta funcion. 
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

// los nombres de estos parametros son confusos: es dificil recordar que arr1 es productosDisponibles
// y arr2 es carrito de compras. Quiza cambiarlo por productos y carrito, o algo asi?
const agregarProducto = (opp, arr1, arr2) => {
  do {
    if (opp === "agregar") {
      let productoEncontrado = false;

      // aca faltaria el producto arr1[1]
      let stringProductosEnStock = `
      ID            PRODUCTO           PRECIO 
      ${arr1[0][0]}        ${arr1[0][1]}       $${arr1[0][2]}
      ${arr1[2][0]}        ${arr1[2][1]}       $${arr1[2][2]}
      ${arr1[3][0]}        ${arr1[3][1]}       $${arr1[3][2]}`


      let idProductoAAgregar = prompt(`Ingrese el ID del producto que desea agregar
      ${stringProductosEnStock}`);

      idProductoAAgregar = Number(idProductoAAgregar);

      for (let i = 0; i < arr2.length; i++) {
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

        // el segundo for tenia un error: decia arr[i][j] cuando debia ser arr[i]
        // ya lo modifique
        // un problema mas:
          // como el id del producto es numerico, 
          // pero idProducto es un string (porque viene de un prompt)
          // nunca encuentra el producto aunque este agregado al carrito
          // se arregla sacandole la validacion estricta al siguiente if
          // (antes tenia ===, yo le puse ==)

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          if (idProducto == arr[i][j]) {
            productoEncontrado = true;
            //no sé como mostrar la cantidad de unidades del producto que hay en el carrito de compras

            // respondo aca: te faltaria agregar un campo en el carrito que represente la cantidad de veces
            // que ese producto aparecio. 
            // Por ejemplo
            // [
            //   [1, "Notebook Lenobo S400", 100, true, 4],
            // ]
            // donde "4" es la cantidad de veces que ese producto fue comprado

            confirmarOperacion = prompt(`
            Producto: ${arr[i][1]} 
            Canntidad: ${unidadesDeProducto}

            ¿Desea confirmar la operación?`);
            
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
  // cambie esto para que funcionara el programa
  // (antes decia if (operacionARealizar ===))
  // esta explicado en el punto 2 de mis observaciones
  if (opp === "vaciar") {
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
    // cambie esto para que funcionara el programa
  // (antes decia if (operacionARealizar ===))
  // esta explicado en el punto 2 de mis observaciones
  if (opp === "cancelar") {
    confirmarOperacion = prompt(`¿Desea cancelar la compra?`)

    validacionSimple(confirmarOperacion);

    if (confirmarOperacion === respuestaAfirmativa) {
      alert(`Mischief managed`)
      salirDelPrograma = respuestaAfirmativa;
    }
  }
  return salirDelPrograma;
}

const confirmarCompra = () => {
  mostrarProductos()
  contarTotalDeProductos()
  let respuestaCodigo = prompt(`¿Tenes un código de descuento?`)
  if (respuestaCodigo === respuestaAfirmativa) {
    let codigoIngresado = prompt(`Ingrese el código de descuento`)
    codigoIngresado = codigoIngresado.toUpperCase().trim()
    if (codigoIngresado === codigoDeDescuento) {
      alert(`Código válido`)
      alert(/*mostrar compra con detalles de cada producto*/)
      confirmarOperacion = prompt(`//mostrar descuento y total final
      ¿Desea confirmar la compra?`)

      if (confirmarCompra === respuestaAfirmativa) {
        alert(`Compra realizada con éxito.
        Gracias, vuelva prontos`)
      }

    } else {
      alert(`Código inválido`)
    }
  } else {
    alert(mostrarCompra())
    confirmarOperacion = prompt(/*mostrat detalle de compra*/ `¿Desea`) 
  }
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

  console.log(operacionARealizar)
  //////////////////////////////////////////// AGREGAR UN PRODUCTO //////////////////////////////////////////////
  agregarProducto(validacionRespuestaMenuPrincipal(operacionARealizar), productosDisponibles, carritoDeCompras);
  //por ésta utilización de una funcion como variable, si lo que se ingreso en el prompt es invalido retorna el 
  //alerta 2 veces

  console.log(operacionARealizar)
  //////////////////////////////////////////// MOSTRAR COMPRA //////////////////////////////////////////////

  ///////////////////////////////////////// ELIMINAR UN PRODUCTO ////////////////////////////////////////////
  
  eliminarProducto(validacionRespuestaMenuPrincipal(operacionARealizar), carritoDeCompras)
  //////////////////////////////////////////// VACIAR CARRITO ///////////////////////////////////////////////
  
  vaciarCarrito(validacionRespuestaMenuPrincipal(operacionARealizar), carritoDeCompras);
  //////////////////////////////////////////// CANCELAR COMPRA //////////////////////////////////////////////

  cancelarCompra(validacionRespuestaMenuPrincipal(operacionARealizar));
  ////////////////////////////////////////// CONFIRMAR COMPRA //////////////////////////////////////////////


}
