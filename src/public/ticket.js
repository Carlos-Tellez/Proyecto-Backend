document.addEventListener('DOMContentLoaded', () => {
    const comprarBtns = document.querySelectorAll('.comprar-btn');

    comprarBtns.forEach((comprarBtn) => {
        comprarBtn.addEventListener('click', async () => {
            const carritoId = comprarBtn.dataset.carritoId;
            console.log("clic");
            console.log(carritoId);
        try {
          // Realizar la petición POST para crear el ticket
            const response = await fetch(`/carrito/${carritoId}/purchase`, { method: 'POST' });

        if (response.ok) {
            console.log('Compra realizada con éxito');
            // Realizar alguna acción adicional si lo deseas, como mostrar un mensaje de éxito al usuario, redireccionar, etc.
        } else {
            console.log('Error al procesar la compra');
            // Manejo de errores en caso de que ocurra algún problema al procesar la compra
        }

        } catch (error) {
            console.error('Error:', error);
          // Manejo de errores en caso de que ocurra un error en la conexión o en la petición
        }
    });
    });
});