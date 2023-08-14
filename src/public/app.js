const socket = io()

let username = null
if(!username){

    Swal.fire({
        title: "Bienvenido al chat",
        text: "inserta tu nombre de usuario",
        input: 'text',
        inputValidator: (value) => {

            if(!value) {
                return "el usuario es requerido"
            }
        }
    })
    .then((input) => {
        username = input.value;
        socket.emit('newuser', username)
    })
}