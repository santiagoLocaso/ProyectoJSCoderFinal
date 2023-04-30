//creacion de modal para mostrar el carrito con los productos elegidos por el usuario
const pintarCarrito = () => {
    //limpia el html que genero y evita repetir
    modalContainer.innerHTML = ""
    //mostrar carrito despues de cerrarlo
    modalContainer.style.display = "flex"
    //creacion header modal
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
    `
    modalContainer.append(modalHeader)

    const modalButton = document.createElement("h1")
    modalButton.innerText = "x"
    modalButton.className = "modal-header-button"

    //funcion de cerrar el carrito
    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    })

    modalHeader.append(modalButton)

    //creacion body modal y mostrar los productos del carrito
    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Total: $${producto.cantidad * producto.precio}</p>
        <span class="delete-product"> X </span>
    `
        modalContainer.append(carritoContent)

        //creacion boton para eliminar producto del carrito
        let eliminar = carritoContent.querySelector(".delete-product")
        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id)
        })
    })

    //obtener el total de la compra
    const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
    //cracion footer modal
    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `Total a pagar: $${total}`
    modalContainer.append(totalCompra)

    const finalizarCompra = document.createElement("div")
    finalizarCompra.className = "final-compra"
    finalizarCompra.innerHTML = `Finalizar compra`
    modalContainer.append(finalizarCompra)

    let final = document.querySelector(".final-compra")
    final.addEventListener("click", () => {
        window.location.href = "compra.html"
    })
}

verCarrito.addEventListener("click", pintarCarrito)


//funcion para eliminar producto
const eliminarProducto = (id) => {
    const foundId = carrito.find((producto) => producto.id === id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    })

    contadorCarrito()
    //avisa al localStorage que un producto es eliminado y este lo elimina
    carritoStorage()
    pintarCarrito()
}



//mostrar cantidad de productos dentro del carrito y almacenarlo en un localStorage
const contadorCarrito = () => {
    cantidadCarrito.style.display = "block"

    const carritoReduce = carrito.reduce((total, producto) => {
        return total + producto.cantidad
    }, 0)

    localStorage.setItem("carritoReduce", JSON.stringify(carritoReduce))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoReduce"))
}

contadorCarrito()