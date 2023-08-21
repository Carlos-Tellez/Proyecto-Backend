const resetPassword = document.getElementById("resetPassword");

resetPassword.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(resetPassword); // Aquí se captura el formulario con id="resetPassword"
    const obj = {};
    formData.forEach((value, key) => (obj[key]= value));

    try {
        const response = await fetch("/sesiones/reset-password", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        alert(data.message); // Mostrar mensaje de éxito
    } else {
        const data = await response.json();
        alert(data.error); // Mostrar mensaje de error
    }
    } catch (error) {
        console.log("Error al enviar la solicitud de restablecimiento de contraseña:", error);
        alert("Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.");
    }
});