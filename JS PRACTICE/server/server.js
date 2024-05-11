const io = require('socket.io')(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", socket => {
    console.log("connected")

    //once two people are on the same doc, they will be able to output to each other
    socket.on('get-doc', documentId => {
        console.log("got id")
        const data = ""
        socket.join(documentId)
        console.log(documentId)
        socket.emit("load-document", data)

        socket.on('send-changes', delta => {
            console.log(delta)
            socket.broadcast.to(documentId).emit("receive-changes", delta) //broadcasts to others
        })
    })
    
    
})