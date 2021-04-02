// variables globales
let precioFinal = 0;
let carrito = [];
let productos = [];

//crea objetos(producto)
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = 0;
        this.stock = stock;
    }
    sumarCantidad() {
        this.cantidad++;
    }
    restarStock() {
        this.stock--;
    }
}


const productosLista = [
    {
        "id": 1,
        "nombre": "Fittonia",
        "precio": 200,
        "stock": 3,
        "img": "../img/fittonia.jpg",
        "descripcion": "Planta de interior o exterior.<br>Cantidad de agua necesaria: Media.<br>Cantidad de sol requerida: Media.<br>Altura estimada de crecimiento: 50cm."
    },
    {
        "id": 2,
        "nombre": "Peperonia",
        "precio": 400,
        "stock": 1,
        "img": "../img/peperomia.jpg",
        "descripcion": "Planta de interior.<br>Cantidad de agua necesaria: Media.<br>Cantidad de sol requerida: Baja.<br>Altura estimada de crecimiento: 40cm."
    },
    {
        "id": 3,
        "nombre": "Kalanchoe",
        "precio": 600,
        "stock": 2,
        "img": "../img/kalancho.jpg",
        "descripcion": "Planta de interior o exterior.<br>Cantidad de agua necesaria: Media.<br>Cantidad de sol requerida: Baja.<br>Altura estimada de crecimiento: 60cm."
    },
    {
        "id": 4,
        "nombre": "Begonia",
        "precio": 450,
        "stock": 1,
        "img": "../img/begonia.jpg",
        "descripcion": "Planta de interior.<br>Cantidad de agua necesaria: Media.<br>Cantidad de sol requerida: Baja.<br>Altura estimada de crecimiento: 50cm."
    },
    {
        "id": 5,
        "nombre": "Orquidea",
        "precio": 500,
        "stock": 1,
        "img": "../img/orquidea.jpg",
        "descripcion": "Planta de exterior.<br>Cantidad de agua necesaria: Media.<br>Cantidad de sol requerida: No exponer.<br>Dejar en ambiente luminoso para su mejor."
    }
]




//funciones
//para la seccion de plantas

for (let producto of productosLista) {
    $("#plantas").append(`         
        <div class="card-columns">
            <img src="${producto.img}" class="img-fluid img-thumbnail" alt="${producto.nombre}">
            <div class="card-body">
                <h2 class="card-title" style="color:black" id="${producto.nombre}">
                    ${producto.nombre}
                </h2>
                <p class="card-text">
                    <p class="lead" style="font-size:20px" id="${producto.descripcion}">
                        ${producto.descripcion}
                    </p>
                    <h3>Precio: $ ${producto.precio}</h3>
                </p>
            </div>
                    <div class="card-footer">
                        <button id="${producto.id}" class="carrito" 
                            style='color: white;background-color: #223137;border-radius: 10px;'>
                            agregar al carrito
                        </button>
                    </div>
                    <div id="notificacion${producto.id}"></div>
        </div>
    <hr>`);
    //evento manejador boton
    $(`#${producto.id}`).on(`click`, function () {
        agregarCarrito(producto.id);
        window.localStorage.setItem("carrito", JSON.stringify(carrito));
    });

}

function agregarCarrito(idProducto) {
    //busca en la lista el numero elegido por el usuario.
    const producto = productosLista.find(producto => producto.id === idProducto);
    console.log(producto);
    //busca en el carrito el numero ingresado por el usuario
    let item = carrito.find(producto => producto.id === idProducto);
    //si no existe crea un nuevo producto y lo agrega al carrito
    if (item == undefined) {
        item = new Producto(producto.id, producto.nombre, producto.precio, producto.stock);
        carrito.push(item);
    }
    //si no tiene en stock muestra el mensaje
    if (item.stock === 0) {
        //notificacion de sin stock 
        $('#notificacion' + `${producto.id}`).html(`<div class="alert alert-success" role="alert"
            style='color: white;background-color: #223137;border-radius: 10px;'>
                Nos hemos quedado sin stock.
        </div>`)
        //oculta el boton de agregar mas productos con animacion
        $(`#${producto.id}`).slideUp("show")
    }
    else {
        item.restarStock();
        item.sumarCantidad();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }


}

//evento manejador de boton carrito de la barra con jquery
$(`#botonCarrito`).on(`click`, function () {
    if (localStorage.setItem("carrito", JSON.stringify(carrito)) === carrito) {
        for (let x = 0; x <= localStorage.length; x++) {
            carrito.push(localStorage.setItem("carrito", JSON.stringify(carrito)));
        }
    }
    //si el carrito esta vacio muestra el mensaje
    if (carrito == 0) {
        $("#mostrar").append(`
                        <p>Todavia no ingreso ningun producto en el carrito</p>  
                        <hr>`);
    }
    else {
        mostrarCarrito();
    }
});

function mostrarCarrito() {
    if (localStorage.setItem("carrito", JSON.stringify(carrito))) {
        for (let x = 0; x <= localStorage.length; x++) {
            carrito.push(localStorage.setItem("carrito", JSON.stringify(carrito)));
        }
    }
    $(`#mostrar`).empty()
    for (const producto of carrito) {
        $(`#mostrar`).append(`
            <div id="item${producto.id}">
                <p class="card-deck">
                    <h2>${producto.nombre}</h2>
                    <h4>Precio: $ ${producto.precio}</h4>
                    <h4>cantidad: ${producto.cantidad}</h4>
                </p>
                <button class="carrito" id="borrarCarrito${producto.id}">BORRAR</button>
            </div>`);
        //evento manejador de boton borrar carrito con jquery
        $('#borrarCarrito' + `${producto.id}`).on(`click`, function () {
            console.log("estoy en borrarCarrito ")
            let index = carrito.findIndex(p => p.id === producto.id);
            console.log(index)
            carrito.splice(index, 1);
            $('#item' + `${producto.id}`).remove();
            $('#notificacion' + `${producto.id}`).remove();
            // item.cantidad--;
            localStorage.removeItem("carrito", JSON.stringify(carrito));
        });
        //guarda en el storage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log(localStorage);
    };
}



//suma el total de los productos del usuario
$(`#sumarTotal`).on(`click`, function () {
    console.log("estoy en sumarTotal" + carrito.length)
    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        console.log("Nombre: " + producto.nombre + " precio: " + producto.precio + " cantidad: " + producto.cantidad);
        precioFinal = precioFinal + (producto.precio * producto.cantidad);
        console.log(precioFinal);
        console.log(carrito);
    }
    //mostra cantidad y precio total de la compra
    $("#total").append(`<h2>TOTAL: ${precioFinal}</h2>
    <button id="finalizarCompra">FINALIZAR COMPRA</button>
    `)
    $(`#sumarTotal`).remove()
    $(`#mostrar`).remove()
    //mensaje gracias por su compra
    $(`#finalizarCompra`).on(`click`, function () {
        $(`#total`).html(`<div>
                            <div>GRACIAS POR SU COMPRA!!
                                <p>Pronto recibiras tu pedido</p>
                            </div> 
                            <input type="button" id="refrescar" value="X" class="btn btn-danger"></input>
                        </div>`)
        renderizar();
    });
    // conCuantoPagas();
});



/*
//ingresa con cuanto dinero piensa pagar
function conCuantoPagas() {
    // alert("su total es" + " " + precioFinal)
    let dinero = parseInt(prompt("Con cuanto pagas?"));
    if (dinero < precioFinal) {
        alert("El monto ingresado es menor a su pedido");
        conCuantoPagas();
    }
    else if (dinero >= precioFinal) {
        let vuelto = dinero - precioFinal;
        alert("su vuelto es " + vuelto);
    }
    precioFinal = 0;
}*/

function renderizar() {
    $(document).ready(function () {
        $("#refrescar").click(function () {
            //Actualizamos la página
            location.reload();
        });
    });
}