const resetPasswordForm = document.getElementById('resetPasswordForm');

resetPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Evento 'submit' capturado"); 
    const data = new FormData(resetPasswordForm);
    const obj = {};
    data.forEach((value, key) => (obj[key]= value));
    try {
        const response = await fetch("/sesiones/olvidocontrasena", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
        "Content-Type": "application/json",
    },
    });

    if (response.ok) {
        const data = await response.json();
        alert(data.message); // Mostrar mensaje de éxito
    } 

    } catch (error) {
        console.log("Error al enviar la solicitud de restablecimiento de contraseña:", error);
        alert("Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.");
    }
});