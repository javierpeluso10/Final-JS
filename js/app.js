//SELECTORES

const contenedorProductos = document.querySelector('#contenedorProductos')
const contenedorCarrito = document.querySelector('#carritoContenedor')
const botonVaciar = document.querySelector('#vaciarCarrito')
const contadorCarrito = document.querySelector('#contadorCarrito')
const cantidad = document.querySelector('#cantidad')
const cantidadTotal = document.querySelector('#cantidadTotal')
const terminarCompra = document.querySelector("#finalizarCompra")
const searchBar = document.querySelector("#campoBusqueda")
const searchButton = document.querySelector('#botonBusqueda')
const precioDeCuota = document.querySelector("#precioDeCuota")
const selectorDeCuotas = document.querySelector("#selectorDeCuotas")


// DECLARO UN CARRITO VACIO
let carrito = []

//CHEQUAMOS QUE EL CARRITO ESTE VACIO SINO MOSTRAMOS LO QUE TENGA GUARDADO EN STORAGE
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

//FUNCIONES

//INYECTAR PRODUCTOS EN HTML
const renderizarProductos =(todosLosProductos)=>{
    contenedorProductos.innerHTML = ""
    todosLosProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <div class="cardProducto">
    <img src=${producto.imgSrc} alt= "" class="imgProducto">
    <h3 class="productoNombre">${producto.marca}</h3>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="botonAgregar">Agregar al Carrito</button>
    </div>`
    contenedorProductos.append(div)
    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})
}

// AGREGAR PRODUCTOS AL CARRITO
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)
    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
            Toast.fire({
                icon: 'success',
                title: 'El Producto se agrego al carrito'
            })
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
        Toast.fire({
            icon: 'success',
            title: 'El Producto se agrego al carrito'
        })
    }
    actualizarCarrito() 
}


// ELIMINAR PRODUCTO DEL CARRITO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    item.cantidad = 1
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    Toast.fire({
        icon: 'success',
        title: 'Se elimino el producto del Carrito'
    })
    actualizarCarrito()
}

//VACIAR CARRITO
botonVaciar.addEventListener('click', () => {
    restablecerCantidad()
    carrito = []
    localStorage.clear()
    actualizarCarrito()
})

//RESTABLECER CANTIDAD DE PRODUCTOS CUANDO SE VACIA EL CARRITO
const restablecerCantidad = () =>{
    carrito.forEach(prod => {
        prod.cantidad = 1
    });
}

// MUESTRA CARRITO CON PRODUCTOS Y PRECIO TOTAL
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.marca}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span> </p> </input>
        <button onclick="eliminarDelCarrito(${prod.id})" class="botonEliminar"><i class="fas fa-trash-alt"></i></button>`
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    if (carrito.length === 0) {
        contadorCarrito.innerText = ""
    } else {
        contadorCarrito.innerText = ` ${carrito.length}`
    }
    const p = document.createElement('p')
    p.classList.add('precioProducto')
    p.innerHTML = `Precio Total: $<span id="precioTotal"></span>`
    contenedorCarrito.appendChild(p)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio,0)
    calcularCuota()
}

//CALCULAR CUOTAS
const calcularCuota = () => {
    const obtenerCantidadDeCuotas = parseInt(document.querySelector("#selectorDeCuotas").value)
    const obtenerValorCompraTotal = parseInt(document.querySelector('#precioTotal').textContent)
    const resultado = (obtenerValorCompraTotal/obtenerCantidadDeCuotas).toFixed(2)
    precioDeCuota.innerHTML = `${resultado}`
}

selectorDeCuotas.addEventListener("click", calcularCuota);

// FINALIZAR COMPRA
const finalizarCompra = () =>{
    if (localStorage.getItem('carrito')) {
        Swal.fire({
            title: "Desea finalizar la compra?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, finalizar compra'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Su Compra se ha realizado con Exito',
                    '',
                    'success'
                )
                carrito = []
                localStorage.clear()
                actualizarCarrito()
            }
        })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Su carrito se encuentra vacio',
            showConfirmButton: false,
            timer: 1500
        })
    }
    
}

// BUSQUEDA DE PRODUCTOS
const buscarProductos = () => {
    const query = searchBar.value.toLowerCase()
    const arrayResultados = stockProductos.filter((producto) => producto.marca.toLowerCase().includes(query))
    renderizarProductos(arrayResultados);
}

//LISTENER DEL BOTON FINALIZAR COMPRA
terminarCompra.addEventListener("click", finalizarCompra)
searchButton.addEventListener('click', buscarProductos)
searchBar.addEventListener('input', buscarProductos)