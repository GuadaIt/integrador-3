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

const agregarProducto = (opp, productos, carrito) => {
  do {
    if (opp === "agregar") {
      let productoEncontrado = false;
      let stringProductosEnStock = `
      ID            PRODUCTO           PRECIO 
      ${productos[0][0]}        ${productos[0][1]}       $${productos[0][2]}
      ${productos[1][0]}        ${productos[1][1]}       $${productos[1][2]}
      ${productos[2][0]}        ${productos[2][1]}       $${productos[2][2]}
      ${productos[3][0]}        ${productos[3][1]}       $${productos[3][2]}`


      let idProductoAAgregar = prompt(`Ingrese el ID del producto que desea agregar
      ${stringProductosEnStock}`);

      idProductoAAgregar = Number(idProductoAAgregar);

      for (let i = 0; i < carrito.length; i++) {
        for (let j = 0; j < carrito[i].length; j++) {
          if (idProductoAAgregar === carrito[i][j]) {
            unidadesDeProducto = prompt(`¿Cuántas unidades desea llevar?`)
            unidadesDeProducto = Number(unidadesDeProducto)

            carrito[i][4] = carrito[i][4] + unidadesDeProducto;
            alert(`Se ha agregado el producto al carrito de compras`)
          }
        }
      }

      
        for (let i = 0; i < productos.length; i++) {
          for (let j = 0; j < productos[i].length; j++) {
            if (idProductoAAgregar === productos[i][j]) {
              productoEncontrado = true;
              unidadesDeProducto = prompt(`¿Cuántas unidades desea llevar?`)
              unidadesDeProducto = Number(unidadesDeProducto)

              carrito.push(productos[i])
              alert(`Se ha agregado el producto al carrito de compras`)
              for (let i = 0; i < carrito.length; i++) {
                for (let j = 0; j < carrito[i].length; j++) {
                  if (productos[i] === carrito[i]) {
                    carrito[i][4] = unidadesDeProducto;
                  }                              
                }                
              }

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
  return carrito;
}

const eliminarProducto = (opp, carrito) => {
  do {
    if (opp === "eliminar") {
      idProducto = prompt("Ingrese el ID del producto que desea eliminar");
      for (let i = 0; i < carrito.length; i++) {
        for (let j = 0; j < carrito[i].length; j++) {
          if (idProducto == carrito[i][j]) {
            productoEncontrado = true;
            
            confirmarOperacion = prompt(`
            Producto: ${carrito[i][1]} 
            Canntidad: ${carrito[i][4]}

            ¿Desea confirmar la operación?`);

            validacionSimple(confirmarOperacion);

            if (confirmarOperacion === respuestaAfirmativa) {
              carrito = carrito.splice(0, carrito[i]);
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
  } while (repetirOperacion === respuestaAfirmativa);
  return carrito;
}

const vaciarCarrito = (opp, carrito) => {
  if (opp === "vaciar") {
    confirmarOperacion = prompt(`¿Desea confirmar la operación?`)

    validacionSimple(confirmarOperacion);

    if (confirmarOperacion === respuestaAfirmativa) {
      carrito.splice(0, carrito.length)
      return alert(`Mischief managed`)
    }
    else {
      return alert(`La operación ha sido cancelada`)
    }
  }
}

const cancelarCompra = opp => {
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

const confirmarCompra = opp => {
  if (opp === "confirmar") {
    alert(`${mostrarProductos(carritoDeCompras)}
    Cantidad de productos en carrito: ${contarTotalDeProductos(carritoDeCompras)}`)

    let respuestaCodigo = prompt(`¿Tenes un código de descuento?`)
    if (respuestaCodigo === respuestaAfirmativa) {
      let codigoIngresado = prompt(`Ingrese el código de descuento`)
      codigoIngresado = codigoIngresado.toUpperCase().trim()
      if (codigoIngresado === codigoDeDescuento) {
        alert(`Código válido`)
        alert(`Subtotal: ${totalCompraSinDescuento(carritoDeCompras)}
        Descuento: $100

        Total final: $${(totalCompraSinDescuento(carritoDeCompras) - totalDescuento(carritoDeCompras)) + (totalDescuento(carritoDeCompras) - 100)}`/*mostrar compra con detalles de cada producto*/)
        confirmarOperacion = prompt(`¿Desea confirmar la compra?`)
        validacionSimple(confirmarOperacion);

        if (confirmarOperacion === respuestaAfirmativa) {
          alert(`Compra realizada con éxito.
          Gracias, vuelva prontos`)
        }

      } else {
        alert(`Código inválido`)
      }
    } else {
      alert(mostrarCompra())
      confirmarOperacion = prompt(`¿Desea confirmar la compra?`)
      validacionSimple(confirmarOperacion)

      if (confirmarOperacion === respuestaAfirmativa) {
        alert(`Compra realizada con éxito.
        Gracias, vuelva prontos`)
      }
    }
  }
}

const totalCompraSinDescuento = carrito => {
  let totalCompraSinDescuento;
  for (let i = 0; i < carrito.length; i++) {
    for (let j = 0; j < carrito[i].length; j++) {
      totalCompraSinDescuento += carrito[i][2]      
    };    
  };
  return totalCompraSinDescuento;
}

const contarTotalDeProductos = carrito => {
  let cantidadDeProductosEnCarrito;
  for (let i = 0; i < carrito.length; i++) {
    for (let j = 0; j < carrito.length; j++) {
      cantidadDeProductosEnCarrito += carrito[i][4];      
    }    
  }
  return cantidadDeProductosEnCarrito;
}

const subtotalDeCompra = productosConDescuento => {
  let subtotalDeCarrito;
  for (let i = 0; i < productosConDescuento.length; i++) {
    for (let j = 0; j < productosConDescuento.length; j++) {
      subtotalDeCarrito += productosConDescuento[i][2]
    }
  }
  return subtotalDeCarrito;
}
const totalDescuento = carrito => {
  let productosCarritoConDescuento = [];
  for (let i = 0; i < carrito.length; i++) {
    for (let j = 0; j < carrito[i].length; j++) {
      if (carrito[i][j] === true) {
        productosCarritoConDescuento.push(carrito[i])
      }
    }
  }
  return subtotalDeCompra(productosCarritoConDescuento);
}

const mostrarProductos = carrito => {
  let listaProductosEnCarrito = ``;
  for (let i = 0; i < carrito.length; i++) {
    listaProductosEnCarrito += `
    PRODUCTO: ${carrito[i][1]}
    PRECIO: $${carrito[i][2]}
    CANTIDAD: ${carrito[i][3]}
    SUBTOTAL: $${carrito[i][2] * carrito[i][3]} `
  }
  return listaProductosEnCarrito;  
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
  confirmarCompra(validacionRespuestaMenuPrincipal(operacionARealizar));

}