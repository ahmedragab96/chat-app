const dotenv     = require('dotenv');
dotenv.config();

module.exports = {
  mongoURI : `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@chat-app-e4rn3.mongodb.net/${
    process.env.MONGO_DB
  }?retryWrites=true&w=majority`
}