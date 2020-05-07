const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const dotenv     = require('dotenv');
dotenv.config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const config = require("./config/key");

io.set('origins', '*:*');

const { Chat } = require("./models/Chat");

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/chats', require('./routes/chat'));

io.on("connection", socket => {
  socket.on("Input Chat Message", msg => {
    connect.then(db => {
      try{
        let chat = new Chat({
          message: msg.chatMessage,
          sender: msg.userId,
          type: msg.type,
        });

        chat.save((err, doc) => {
          if (err) {
            res.json({
              success: false,
              err
            })
          }

          Chat.find({"_id": doc._id})
          .populate("sender")
          .exec((err , doc) => {
            return io.emit("Output Chat Message", doc);
          })
        })

      } catch (error) {
        console.log(error);
      }
    })
  })
})


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});