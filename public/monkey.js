const room = 'Monkey';
const socket = io.connect('/tech');
let name = localStorage[0];
document.getElementById('n').innerHTML = name;
console.log(name);
$('#message-form').submit(function(e) {
    e.preventDefault();
    let message = $('#f').val();
    console.log(message);
    socket.emit('message', {message, room, name}); 
    $('#f').val('');
    return false;
});
socket.on('connect', ()=>{
    socket.emit('join', {room: room, name: name});
    
});
socket.on('message', (message) =>{
    $('#messages').append($('<li>').text(message));
});