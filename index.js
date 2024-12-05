const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const http = require('http');


const app = express();
const post = 3400;


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'http://127.0.0.1:5500',  
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }
  });

const RoutesLogin = require('./routes/UserLogin');
const userfind = require('./routes/User');
const { handleError } = require('./error/errorHandler');


app.use(cors());
app.use(express.json()); 
app.use(cookieParser()); 


app.use( RoutesLogin); 
app.use( userfind); 


app.get('/', (req, res) => {
    res.status(200).send("Running Web Server!");
});


app.use((err, req, res, next) => {
    handleError(err, res);
});


server.listen(post, () => {
    console.log(`Server is running`);
});


io.on('connection', (socket) => {
    console.log('A user connected');


    socket.on('join', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });


    socket.on('message', (data) => {
        io.to(data.room).emit('message', data.message);
    });


    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
