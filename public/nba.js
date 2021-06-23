const room = 'nba';
const socket = io.connect('/tech');
let name = localStorage[0];
document.getElementById('n').innerHTML = name;
console.log(name);
let file;
let thesrc;
$('#message-form').submit(function(e) {
    e.preventDefault();
    if (file) {
        console.log("it file");
        const image = {
            id: "f",
            type: "file",
            src: file.name,
            body: file,
            mimeType: file.type,
            fileName: file.name
        };
        $('#f').val('');
        $('#g').val('');
        socket.emit('image', {image, room, name});
    } else {
        const message = $('#f').val();
        socket.emit('message', {message, room, name}); 
        $('#f').val('');
        
    }
    return false;
});
function selFile(event) {   
    console.log(event.target.files[0].name)
    file = event.target.files[0];
    thesrc = URL.createObjectURL(file)
}

socket.on('connect', ()=>{
    socket.emit('join', {room: room, name: name});
});

socket.on('image', (image) => {
    console.log("broo u there??");
    image = document.createElement('img');
    image.id = "imgmssg";
    image.width = 100;
    image.height = 100;
    image.src = thesrc;
    console.log(thesrc);
    //console.log(URL.createObjectURL(image));
    $('#messages').append(image);
    socket.emit('image', {image: image});
    file = "";
});

socket.on('message', (message) =>{
    $('#messages').append($('<li>').text(message))
});

socket.on('disconnect', () =>{
    socket.emit('disconnect', {name: name});
});

