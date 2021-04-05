// variables globales
let precioFinal = 0;
let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

$(`#tabla`).html(`
<div class="container">
    <div class"col-12">
            <table class="table caption-top">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id="carrito">
            </tbody >
            </table>           
    </div>
</div>
`)

//$(`#carrito`).empty()
for (const producto of carrito) {
    precioFinal = precioFinal + (producto.precio * producto.cantidad);
    $(`#carrito`).append(`  
                <tr>
                        <td></td>
                        <td scope="row"></td>
                        <td>${producto.nombre}</td>
                        <td>
                            <input id="quitar${producto.id}" type="button" value="-" class="btn"></input>
                                Cantidad: ${producto.cantidad}
                            <input id="agregar${producto.id}" type="button" value="+" class="btn"></input>
                        </td>
                        <td>${producto.precio}</td>
                        <td></td>
                        <td>
                            <input type="button" id="borrarItem${producto.id}" value="X" class="btn btn-danger"></input>
                        </td>
                </tr>
        `);
    //evento manejador de boton quitar 1 producto
    $('#borrarItem' + `${producto.id}`).on(`click`, function () {
        carrito = carrito.filter(item => {
            if (item.id !== producto.id)
                return true;
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        location.reload();
    });

    //evento manejador de boton agregar 1 producto del carrito
    $('#agregar' + `${producto.id}`).on(`click`, function () {
        carrito = carrito.map(item => {
            if (item.id === producto.id) {
                if (item.stock > 0) {
                    item.cantidad++;
                    item.stock--;
                }      
            }
            return item;
            
        });
        
        localStorage.setItem("carrito", JSON.stringify(carrito));
        location.reload();
    });

    //evento manejador de boton borrar 1 producto del carrito 
    $('#quitar' + `${producto.id}`).on(`click`, function () {
        carrito = carrito.map(item => {
            if (item.id === producto.id) {
                if (item.cantidad > 0) {
                    item.cantidad--;
                    item.stock++;
                }
            }
            return item;
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        location.reload();
    });
};

if (carrito.length > 0) {
    $("#total").append(`<h2>TOTAL: ${precioFinal}</h2>
    <button id="finalizarCompra">FINALIZAR COMPRA</button>
    `)
}
if (carrito == 0) {
    $("#tabla").empty()
    $("#mensaje").html(`
                    <h2>Todavia no ingreso ningun producto en el carrito</h2>
                    <p>Para ingresar nuevos productos ingrese a la pestaña de productos, gracias SANTA MANDARINA.</p> 
                    <hr>`);
}

//suma el total de los productos del usuario
$(`#finalizarCompra`).on(`click`, function () {
    $('#tabla').empty()
    $('#carrito').empty()
    $(`#gracias`).html(`<div>
                            <h3>¡GRACIAS POR SU COMPRA!
                                <p>Pronto recibiras tu pedido</p>
                            </h3>
                            <button>
                                <a type="button" href="../index.html">Para volver a la pagina principal presione aquí
                                    <span class="icon-point-left">
                                    </span>
                                </a>
                            </button>
                        </div>`)
    $('#total').empty()
    localStorage.removeItem("carrito", JSON.stringify(carrito));
    renderizar();
});

function renderizar() {
    $(document).ready(function () {
        $("#refrescar").click(function () {
            //Actualizamos la página
            location.reload();
        });
    });
}