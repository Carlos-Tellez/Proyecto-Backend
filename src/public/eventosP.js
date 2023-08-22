// eventosP.js
const btnsAgregar = document.querySelectorAll('.agregar-btn');

btnsAgregar.forEach((btnAgregar) => {
    btnAgregar.addEventListener('click', async () => {
        const productId = btnAgregar.dataset.productId;
        const idp = document.getElementById(`idp${productId}`).textContent;
        const idc = "649cd48c8722f190e45974da";

    try {
        // Realizar la petición POST para agregar el producto al carrito
        const response = await fetch(`/carrito/${idc}/products/${idp}`, { method: 'POST' });

        if (response.ok) {
            console.log('Producto agregado al carrito exitosamente');
            // Aquí puedes realizar alguna acción adicional si lo deseas, como mostrar un mensaje al usuario, actualizar la vista, etc.
        } else {
            console.log('Error al agregar el producto al carrito');
            // Manejo de errores en caso de que ocurra algún problema al agregar el producto al carrito
        }
        } catch (error) {
            console.error('Error:', error);
          // Manejo de errores en caso de que ocurra un error en la conexión o en la petición
        }
    });

});