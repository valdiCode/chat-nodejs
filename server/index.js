//montando servidor
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});

//crear una vista estática que nos da express por defecto
app.use(express.static('client'));

//rutas
app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola mundo desde una ruta');
});

//mensaje por defecto al cliente que se conecta
//falseando que usara una BD
var messages = [{
    id: 1,
    text: 'Bienvenido al CHAT PRIVADO de Socket.io & NodeJS...',
    nickname: 'Bot_1'
}];

//abrir conexión de clientes al socket
io.on('connection', function(socket){
    console.log("El cliente con IP: "+socket.handshake.address+" se ha conectado...");

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

io.emit('messages', messages);

//asignandole un puerto de escucha
server.listen(6677, function(){
    console.log('Servidor corriendo en http://localhost:6677...');
});