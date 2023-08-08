const socket = io()

socket.on('connect', () => {
    console.log("client connected by sockets")
})

socket.emit("message","hola mundo")