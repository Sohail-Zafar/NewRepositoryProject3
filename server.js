const express = require ('express');
const connectDB = require ('./config/db')
const db = config.get('mongoURI');
const app = express();
const PostSchema = require("./models/Post");
// connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define middleware here
app.use(express.urlencoded({ extended: true }));

var databaseUrl = "artWork";
 var collections = ["urlImages"];
 mongoose.connect("mongodb://localhost/artWork", { useNewUrlParser: true });
// test script for postman
//app.get('/', (req, res) => res.send('API Running'));

// define routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.post("/api/url", function (req, res) {
  console.log("body:",req.body.url);

  PostSchema.findOneAndUpdate(
    {userId: userID},
    {$push: {imageUrls: [req.body.url]}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
        console.log("Model:",model);
    }
);
});

app.listen(PORT, () => console.log(`Server satrted on port ${PORT}`));