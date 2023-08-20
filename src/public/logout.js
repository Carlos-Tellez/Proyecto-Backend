const salida = document.getElementById('Logout');

salida.addEventListener('submit', async (event)=> {

    event.preventDefault();
    const obj = {};

    const response = await fetch("/sesiones/logout",{
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    if(responseData.status === "success") {
        window.location.replace("/")
    }

});