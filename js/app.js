//getItem recupera los datos del localStorage, si no hay nada guardado carrito es un array vacio
let carrito = JSON.parse(localStorage.getItem("carritoJson")) || []

const productContainer = document.getElementById("product-container")

const verCarrito = document.getElementById("verCarrito")

const modalContainer = document.getElementById("modal-container")

const cantidadCarrito = document.getElementById("cantidadCarrito")


fetch('stock.json')
    .then((response) => response.json())
    .then((posts) => {
        posts.forEach((post) => {
            let content = document.createElement("div")
            content.className = "product-item"
            content.innerHTML = `
                    <img src="${post.img}">
                    <h3>${post.nombre}</h3>
                    <p>${post.desc}</p>
                    <span class="price">$${post.precio}</span>
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
                const repeat = carrito.some((repeatProduct) => repeatProduct.id === post.id)
                //suma un producto repetido al carrito
                repeat ? carrito.find((prod) => {
                    if (prod.id === post.id) {
                        prod.cantidad++
                    }
                }) : carrito.push({
                    id: post.id,
                    img: post.img,
                    nombre: post.nombre,
                    precio: post.precio,
                    cantidad: post.cantidad
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
    })

//localStorage del carrito
const carritoStorage = () => {
    let carritoJson = JSON.stringify(carrito)
    localStorage.setItem("carritoJson", carritoJson)
}