const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000

//server.listen(port, ()=>{
  //console.log(`Server is listeneing on Port:` + PORT);
//});

app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html');
});

app.get('/index.js',function(req,res){
  res.sendFile(__dirname+'/public/index.js');
});
app.get('/nba.js',function(req,res){
  res.sendFile(__dirname+'/public/nba.js');
});
app.get('/anime.js',function(req,res){
  res.sendFile(__dirname+'/public/anime.js');
});

app.get('/monkey.js',function(req,res){
  res.sendFile(__dirname+'/public/monkey.js');
});
// Send Style
app.get('/style.css',function(req,res){
  //Feel free to change the contents of style.css to prettify your Web app
  res.sendFile(__dirname+'/public/style.css');
});
 

app.get('/nba', (req, res)=>{
  res.sendFile(__dirname+'/public/nba.html');
})
app.get('/anime', (req, res)=>{
  res.sendFile(__dirname+'/public/anime.html');
})
app.get('/monkey', (req, res)=>{
  res.sendFile(__dirname+'/public/monkey.html');
})

const tech = io.of('/tech');
tech.on('connection', (socket)=>{
  socket.on('join', (data) =>{
    socket.join(data.room)
    tech.in(data.room).emit('message', data.name + " Joined " + data.room + " room")
  });
  socket.on('message', (data)=> {
    tech.in(data.room).emit('message', data.name + ": " + data.message);
  });
  socket.on('image', (data)=> {
    console.log(data.image.id)
    tech.in(data.room).emit('image', data.image.thesrc + ": " + "bruhh");
    //data.image.toString('base64')
    //toString('base64')
  });
  socket.on('disconnect', (data)=>{
    console.log("User Disconnected");
    tech.in(data.room).emit('message', data.name + ' Disconnected');  
  });
});

server.listen(PORT, () => console.log(`Listening on ${ PORT }`))