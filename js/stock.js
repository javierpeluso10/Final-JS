let stockProductos = []

// OBTENER PRODUCTOS DE JSON
const obtenerProductos = async () => {
    const response = await fetch("data/productos.json")
    stockProductos = await response.json()
    renderizarProductos(stockProductos)
}

// SWEETALERT

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})



//EJECUCION
obtenerProductos()
