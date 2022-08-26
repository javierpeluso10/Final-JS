const contenedoresCarrito = document.querySelector('.cartelContenedor')
const botonAbrir = document.querySelector('#botonCarrito')
const botonCerrar = document.querySelector('#carritoCerrar')
const modalCarrito = document.querySelector('.cartelCarrito')


botonAbrir.addEventListener('click', ()=>{
    contenedoresCarrito.classList.toggle('carritoActive') //
})
botonCerrar.addEventListener('click', ()=>{
    contenedoresCarrito.classList.toggle('carritoActive')
})

contenedoresCarrito.addEventListener('click', (event) =>{
    contenedoresCarrito.classList.toggle('carritoActive')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})