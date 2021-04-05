

const productosJardin = [{
    "id": 9,
    "nombre": "Palita de acero",
    "precio": 200,
    "stock": 1,
    "img": "../img/pala-chica-huerta.jpg",
    "descripcion": "Palita de acero con recubrimiento de pintura antioxidante y mango de madera. "
},
{
    "id": 10,
    "nombre": "Combo pala y rastrillo",
    "precio": 400,
    "stock": 1,
    "img": "../img/combo-pala-2.jpg",
    "descripcion": " Combo: Pala y Rastrillo de acero con recubrimiento de pintura antioxidante y mango de madera."
},
{
    "id": 11,
    "nombre": "Maseta decorativas",
    "precio": 600,
    "stock": 2,
    "img": "../img/maceta-animado.jpg",
    "descripcion": "Maseta decorativa de cemento, tamaño 20 cm.<br><br><br><br>"
},
{
    "id": 12,
    "nombre": "Maseta decorativas",
    "precio": 450,
    "stock": 1,
    "img": "../img/maceta-oso.jpg",
    "descripcion": "Maseta decorativa de cemento, tamaño 20 cm.<br><br><br><br>"
},
{
    "id": 13,
    "nombre": "Maseta decorativas",
    "precio": 500,
    "stock": 1,
    "img": "../img/maceta-forma.jpg",
    "descripcion": "Maseta decorativa de cemento, tamaño 20 cm.<br><br><br><br>"
},
{
    "id": 14,
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
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    //busca en el carrito el producto elegido por el usuario
    let item = carrito.find(producto => producto.id === idProducto);

    //si no existe lo agrega al carrito
    if (item == undefined) {
        //busca en la lista de productos el elegido por el usuario y lo guardo en el carrito
        let producto = productosJardin.find(producto => producto.id === idProducto);
        item = {
            "id": producto.id,
            "nombre": producto.nombre,
            "precio": producto.precio,
            "stock": producto.stock,
            "cantidad": 0
        }
        carrito.push(item);
    }
    carrito = carrito.map(item => {
        if (item.id === idProducto) {
            if (item.stock > 0) {
                item.stock--;
                item.cantidad++;
            }
        }
        return item;
    });
    //si no tiene en stock muestra el mensaje
    if (item.stock === 0) {
        //notificacion de sin stock 
        $('#notificacion' + `${idProducto}`).html(`<div class="alert alert-success" role="alert"
    style='color: white;background-color: #223137;border-radius: 10px;'>
        Nos hemos quedado sin stock.
</div>`)
        //oculta el boton de agregar mas productos con animacion
        $(`#${idProducto}`).slideUp("show")
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//evento manejador de boton carrito de la barra con jquery
$(`#botonCarrito`).on(`click`, function () {
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    //si el carrito esta vacio muestra el mensaje
    if (carrito == 0) {
        $("#mostrar").html(`
                        <p>Todavia no ingreso ningun producto en el carrito</p>  
                        <hr>`);
    } else {
        mostrarCarrito(carrito);
    }
});

function mostrarCarrito(carrito) {
    //si el carrito esta vacio muestra el mensaje
    if (carrito == 0) {
        $("#mostrar").html(`
                        <p>Todavia no ingreso ningun producto en el carrito</p> 
                        <hr>`);
    }
    $(`#mostrar`).empty()
    for (const producto of carrito) {
        $(`#mostrar`).append(`
            <div id="item${producto.id}">
                <p class="card-deck">
                    <h4>${producto.nombre}</h4>
                    <h4>Precio: $${producto.precio}</h4>
                    <h4>Cantidad: ${producto.cantidad}</h4>
                </p>
            </div>`);
    };
}

