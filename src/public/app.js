const socket = io()

let usuario = null
if(!usuario){

    Swal.fire({
        title: "Bienvenido al chat",
        text: "inserta tu nombre de usuario",
        input: 'text',
        inputValidator: (value) => {

            if(!value) {
                return "El Usuario es Requerido"
            }
        }
    })
    .then((input) => {
        usuario = input.value;
        socket.emit('newUser', usuario)
    })
}

const message = document.getElementById('mensaje');
const btn = document.getElementById('enviar');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', ()=> {
    socket.emit('chat:mensaje', {
        usuario,
        mensaje: message.value,
    })
    message.value = '';
});


socket.on('mensajes', (data) => {

    actions.innerHTML = '';
    const chatRender = data.map ((msg) => {
        return `<p><strong>${msg.usuario}</strong>: ${msg.mensaje}</p>`
    }).join(' ')
    output.innerHTML = chatRender
});

socket.on('newUser', (usuario)=> {

    Toastify({
        text: `${usuario} se ha logeado Correctamente `,
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function() {}
    }).showToast();
})

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', usuario);
})

socket.on('chat:typing', (data)=> {
    console.log(data)
    actions.innerHTML = `<p><en>${data} esta escribiendo un mensaje...</en></p>`
})
