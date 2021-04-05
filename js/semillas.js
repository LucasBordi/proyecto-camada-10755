

const semillas = [{
    "id": 6,
    "nombre": "Semillas varias.",
    "marca": "Semillas Letho x 50gr.",
    "precio": 50,
    "stock": 10,
    "img": "../img/semillas-varias.jpeg",
    "descripcion": `Contamos con gran variedad de semillas: Tomate redondo, Achicoria, Tomate
                        platense, Coliflor, Cebolla de verdeo, Pimiento, Zapallo Zucchini, Albahaca, Cebolla morada,
                        Zanahoria, Berenjena, Rabanito, Cilantro.`

},
{
    "id": 7,
    "nombre": "Semillas aromáticas.",
    "marca": "Semillas Letho x 50gr.",
    "precio": 55,
    "stock": 10,
    "img": "../img/semillas-aromaticas.jpeg",
    "descripcion": `Contamos con gran variedad de semillas: Albahaca verde, Albahaca Roja,
        Cebolleta, Cilantro, Eneldo, Lavanda, Manzanilla, Melisa, Menta Peperina, Orégano,
        Perejil, Romero, Ruda.`
},
{
    "id": 8,
    "nombre": "Semillas florales.",
    "marca": "Semillas Letho x 50gr.",
    "precio": 60,
    "stock": 20,
    "img": "../img/semillas-florales.jpeg",
    "descripcion": `Contamos con gran variedad de semillas: Capuchina, Arvejilla, , Aquilegia,
        Clavelina, Amapola, Alegria del hogar mezcla, Aleou gigante, Mix de Cactus, Bella de
        día, Conejito, Copete, Pensamiento, Lupinus.`,
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
        let producto = semillas.find(producto => producto.id === idProducto);
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

