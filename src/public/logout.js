const salida = document.getElementById('Logout');

salida.addEventListener('submit', async (event)=> {

    event.preventDefault();

    const response = await fetch("/sesiones/logout",{
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    if(responseData.status === "success") {
        window.location.replace("/")
    }

});