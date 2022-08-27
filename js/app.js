
//SELECTORES

const contenedorProductos = document.querySelector('#contenedorProductos')
const contenedorCarrito = document.querySelector('#carritoContenedor')
const botonVaciar = document.querySelector('#vaciarCarrito')
const contadorCarrito = document.querySelector('#contadorCarrito')
const cantidad = document.querySelector('#cantidad')
const precioTotal = document.querySelector('#precioTotal')
const cantidadTotal = document.querySelector('#cantidadTotal')
const terminarCompra = document.querySelector("#finalizarCompra")
const searchBar = document.querySelector("#campoBusqueda")
const searchButton = document.querySelector('#botonBusqueda')



let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


//VACIAR CARRITO

botonVaciar.addEventListener('click', () => {
    carrito = []
    localStorage.clear()
    actualizarCarrito()
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
    </div>
    `
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


// ELIMINAR PRODUCTOS DEL CARRITO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item) 
    carrito.splice(indice, 1)
    actualizarCarrito()
}

// REINYECTA PRODUCTOS AL CARRITO QUE NO HAYAN SIDO ELIMINADOS
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.marca}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="botonEliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length 
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}


// FINALIZAR COMPRA

const finalizarCompra = () =>{
    if (localStorage.getItem('carrito')) {
        Swal.fire({
            title: 'Desea finalizar la compra?',
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