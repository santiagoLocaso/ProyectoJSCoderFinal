//getItem recupera los datos del localStorage, si no hay nada guardado carrito es un array vacio
let carrito = JSON.parse(localStorage.getItem("carritoJson")) || []

const productContainer = document.getElementById("product-container")

const verCarrito = document.getElementById("verCarrito")

const modalContainer = document.getElementById("modal-container")

const cantidadCarrito = document.getElementById("cantidadCarrito")


const getProducts = async () => {
    const response = await fetch('stock.json')
    const data = await response.json()
    data.forEach((product) => {
        let content = document.createElement("div")
        content.className = "product-item"
        content.innerHTML = `
                <img src="${product.img}">
                <h3>${product.nombre}</h3>
                <p>${product.desc}</p>
                <span class="price">$${product.precio}</span>
            `
        productContainer.append(content)

        //creacion de boton comprar
        let comprar = document.createElement("button")
        comprar.innerText = "Comprar"
        comprar.className = "comprar"

        content.append(comprar)

        //detecta click sobre el boton comprar y agrega el elemento al carrito
        comprar.addEventListener("click", () => {
            //validar cantidad de productos y si el producto existe en el carrito
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
            //suma un producto repetido al carrito
            repeat ? carrito.find((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++
                }
            }) : carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad
            })
            Toastify({
                text: 'Producto agregado al carrito!',
                duration: 3000,
                gravity: "bottom",
                style: {
                    background: '#333'
                }
            }).showToast()
            console.log(carrito)
            contadorCarrito()
            carritoStorage()
        })
    })
}

getProducts()

//localStorage del carrito
const carritoStorage = () => {
    let carritoJson = JSON.stringify(carrito)
    localStorage.setItem("carritoJson", carritoJson)
}