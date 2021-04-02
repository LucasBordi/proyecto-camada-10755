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


const semillas = [
    {
        "id": 1,
        "nombre": "Semillas varias.",
        "marca": "Semillas Letho x 50gr.",
        "precio": 50,
        "stock": 10,
        "img": "../img/semillas-varias.jpeg",
        "descripcion": `Contamos con gran variedad de semillas: Tomate redondo, Achicoria, Tomate
                        platense, Coliflor, Cebolla de verdeo, Pimiento, Zapallo Zucchini, Albahaca, Cebolla morada,
                        Zanahoria, Berenjena, Rabanito, Cilantro.`,
        "1": "Tomate redondo",
        "2": "Achicoria",
        "3": "Toamte platense",
        "4": "Coliflor",
        "5": "Cebolla de verdeo",
        "6": "Pimiento",
        "7": "Zapallo Zucchini",
        "8": "Albahaca",
        "9": "Cebolla morada",
        "10": "Zanahoria",
        "11": "Berenjena",
        "12": "Rabanito",
        "13": "Cilantro",

    },
    {
        "id": 2,
        "nombre": "Semillas aromáticas.",
        "marca": "Semillas Letho x 50gr.",
        "precio": 55,
        "stock": 10,
        "img": "../img/semillas-aromaticas.jpeg",
        "descripcion": `Contamos con gran variedad de semillas: Albahaca verde, Albahaca Roja,
        Cebolleta, Cilantro, Eneldo, Lavanda, Manzanilla, Melisa, Menta Peperina, Orégano,
        Perejil, Romero, Ruda.`,
        "1": "Albahaca verde",
        "2": "Albahaca Roja",
        "3": "Cebolleta",
        "4": "Cilantro",
        "5": "Eneldo",
        "6": "Lavanda",
        "7": "Manzanilla",
        "8": "Melisa",
        "9": "Menta Peperina",
        "10": "Orégano",
        "11": "Perejil",
        "12": "Romero",
        "13": "Ruda",
    },
    {
        "id": 3,
        "nombre": "Semillas florales.",
        "marca": "Semillas Letho x 50gr.",
        "precio": 60,
        "stock": 20,
        "img": "../img/semillas-florales.jpeg",
        "descripcion": `Contamos con gran variedad de semillas: Capuchina, Arvejilla, , Aquilegia,
        Clavelina, Amapola, Alegria del hogar mezcla, Aleou gigante, Mix de Cactus, Bella de
        día, Conejito, Copete, Pensamiento, Lupinus.`,
        "1": "Capuchina",
        "2": "Arvejilla",
        "3": "Aquilegia",
        "4": "Clavelina",
        "5": "Amapola",
        "6": "Alegria del hogar mezcla",
        "7": "Aleou gigante",
        "8": "Mix de Cactus",
        "9": "Bella de día",
        "10": "Conejito",
        "11": "Copete",
        "12": "Pensamiento",
        "13": "Lupinus",
    }
]




//funciones
//para la seccion de plantas

for (let producto of semillas) {
    $("#semillas").append(`         
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
                    <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                        <option selected>Seleccione semilla...</option>
                        <option value="1">${producto[1]}</option>
                        <option value="2">${producto[2]}</option>
                        <option value="3">${producto[3]}</option>
                        <option value="4">${producto[4]}</option>
                        <option value="5">${producto[5]}</option>
                        <option value="6">${producto[6]}</option>
                        <option value="7">${producto[7]}</option>
                        <option value="8">${producto[8]}</option>
                        <option value="9">${producto[9]}</option>
                        <option value="10">${producto[10]}</option>
                        <option value="11">${producto[11]}</option>
                        <option value="12">${producto[12]}</option>
                        <option value="13">${producto[13]}</option>
                    </select>
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
    const producto = semillas.find(producto => producto.id === idProducto);
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