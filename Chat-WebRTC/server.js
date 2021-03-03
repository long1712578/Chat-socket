let express = require('express');
let amqp=require('amqp');
let app = express();

var rabbitMqConnection = null;
var _queue = null;
var _consumerTag = null;

let path = require('path');
app.use(express.static(__dirname + '/dist/chatApp'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

var server = require('http').createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:9000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

var clients = [];
var busyUsers = [];
var numUsers = 0;
io.on('connection', (socket) => {
    var addedUser = false;
    var queueName=socket.handshake.query.queueName;
    console.log(`socket  has connected`);

    //Connection rabbitMQ
    rabbitMqConnection = amqp.createConnection({host: 'amqps://jqltktwa:***@gerbil.rmq.cloudamqp.com/jqltktwa', reconnect: false});
    // Update our stored tag when it changes
    rabbitMqConnection.on('tag.change', function (event) {
        if (_consumerTag === event.oldConsumerTag) {
            _consumerTag = event.consumerTag;
            // Consider unsubscribing from the old tag just in case it lingers
            _queue.unsubscribe(event.oldConsumerTag);
        }
    });

     // Listen for ready event
     rabbitMqConnection.on('ready', function () {
        console.log('Connected to rabbitMQ');

        // Listen to the queue
        rabbitMqConnection.queue(queueName, {
                closeChannelOnUnsubscribe: true,
                durable: false,
                autoClose: true
            },
            function (queue) {
                console.log('Connected to ' + queueName);
                _queue = queue;

                // Bind to the exchange
                queue.bind('users.direct', queueName);

                queue.subscribe({ack: false, prefetchCount: 1}, function (message, headers, deliveryInfo, ack) {
                    console.log("Received a message from route " + deliveryInfo.routingKey);
                    socket.emit('notification', message);
                    //ack.acknowledge();
                }).addCallback(function (res) {
                    // Hold on to the consumer tag so we can unsubscribe later
                    _consumerTag = res.consumerTag;
                });
            });
    });
    //Message
    socket.on('send-message', (data) => {
        socket.broadcast.to(data.toid).emit('receive-message', data);
    });

    socket.on('add user', (username) => {
        console.log('userId: ', socket.id);
        if (addedUser) return;
        //add customer in list client.
        clients.push({
            id: socket.id,
            username: username,
            busy: false
        });
        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login-user-count', {
            numUsers: numUsers
        });
        socket.emit('logged-user', {
            username: socket.username,
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });

        setInterval(() => {
            socket.broadcast.emit('client-list', clients);
        }, 3000);
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
            if (clients.length > 0) {
                var i = 0;
                clients.forEach(a => {
                    if (a.username == socket.username) {
                        clients.splice(i, 1);
                    }
                    i++;
                });
            }
            if (busyUsers.length > 0) {
                var i = 0;
                busyUsers.forEach(a => {
                    if (a.username == socket.username) {
                        busyUsers.splice(i, 1);
                    }
                    i++;
                });
            }
            // echo globally that this client has left
            socket.broadcast.emit('user-left', socket.username);
        }
    });

   
    socket.on('video-call', (data) => {
        socket.broadcast.to(data.toid).emit('video-call-request', data);
        // setInterval(() => {
        //     socket.broadcast.to(data.toid).emit('video-call-request', data);
        // }, 3000);
    });
    socket.on('video-call-accept', (data) => {
        socket.broadcast.to(data.toid).emit('video-call-accept', data);
    });
    socket.on('video-call-reject', (data) => {
        socket.broadcast.to(data.toid).emit('video-call-reject', data);
    });
    socket.on('get-busy-user', () => {
        socket.broadcast.emit('get-busy-user', busyUsers);
    });
    socket.on('busy-user', () => {
        busyUsers.push({
            id: socket.id,
            username: socket.username
        });
        socket.broadcast.emit('get-busy-user', busyUsers);
    });
    socket.on('end-video-call', (data) => {
        if (busyUsers.length > 0) {
            var usr1 = busyUsers.find(a => a.username == socket.username);
            var index1 = busyUsers.indexOf(usr1);
            busyUsers.splice(index1, 1);

            var usr2 = busyUsers.find(a => a.username == data.toname);
            var index2 = busyUsers.indexOf(usr2);
            busyUsers.splice(index2, 1);
        }
        socket.broadcast.to(data.toid).emit('video-call-ended', data);
        socket.broadcast.emit('get-busy-user', busyUsers);
    });
    // when the caller emits 'call-request', this listens and executes
    socket.on('call-request', (data) => {
        // we tell the client to execute 'call-request'
        socket.broadcast.to(data.toid).emit('call-request', {
            username: socket.username,
            data: data
        });
    });
});
