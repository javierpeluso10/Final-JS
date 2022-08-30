let stockProductos = []

// OBTENER PRODUCTOS DE JSON
const obtenerProductos = async () => {
    try{ 
        const response = await fetch("data/productos.json")
        stockProductos = await response.json()
        renderizarProductos(stockProductos)
    }catch{
        Swal.fire(
            'Hubo un problema, intentarlo nuevamente mas tarde',
            '',
            'error'
        )
    }
}

// SWEETALERT

const Toast = Swal.mixin({
    toast: true,
    background: "#26798e",
    color:"#ffe3b3",
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
