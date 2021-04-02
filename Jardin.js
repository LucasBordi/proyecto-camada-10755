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

const productosJardin = [
    {
        "id": 1,
        "nombre": "Palita de acero",
        "precio": 200,
        "stock": 1,
        "img": "../img/pala-chica-huerta.jpg",
        "descripcion": "Palita de acero con recubrimiento de pintura antioxidante y mango de madera. "
    },
    {
        "id": 2,
        "nombre": "Combo pala y rastrillo",
        "precio": 400,
        "stock": 1,
        "img": "../img/combo-pala-2.jpg",
        "descripcion": " Combo: Pala y Rastrillo de acero con recubrimiento de pintura antioxidante y mango de madera."
    },
    {
        "id": 3,
        "nombre": "Maseta decorativas",
        "precio": 600,
        "stock": 2,
        "img": "../img/maceta-animado.jpg",
        "descripcion": "Maseta decorativa de cemento, tamaño 20 cm.<br><br><br><br>"
    },
    {
        "id": 4,
        "nombre": "Maseta decorativas",
        "precio": 450,
        "stock": 1,
        "img": "../img/maceta-oso.jpg",
        "descripcion": "Maseta decorativa de cemento, tamaño 20 cm.<br><br><br><br>"
    },
    {
        "id": 5,
        "nombre": "Maseta decorativas",
        "precio": 500,
        "stock": 1,
        "img": "../img/maceta-forma.jpg",
        "descripcion": "Maseta decorativa de cemento, tamaño 20 cm.<br><br><br><br>"
    },
    {
        "id": 6,
        "nombre": "Fertilizante",
        "precio": 500,
        "stock": 4,
        "img": "../img/bobotox.jpg",
        "descripcion": "Da fuerza a la tierra para una mejor cosecha.<br>Brindando nuevos nutrientes y minerales faltantes en el sector.<br><br><br><br><br><br>"
    },
];


//funciones
//para la seccion de plantas
for (let producto of productosJardin) {
    $("#jardin").append(`         
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
    });
}

function agregarCarrito(idProducto) {
    //busca en la lista el numero elegido por el usuario.
    const producto = productosJardin.find(producto => producto.id === idProducto);
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